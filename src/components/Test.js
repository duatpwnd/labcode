import { useEffect, useRef } from "react";
import "./Test.scss";
const Test = () => {
  const requestAnimation =
    window.requestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.msRequestAnimationFrame;
  window.requestAnimationFrame = requestAnimation;
  class CustomPQ {
    constructor() {
      this.arr = [];
      this.N = 0;
    }

    greater = (ev1, ev2) => {
      return ev1.time > ev2.time > 0;
    };

    swap = (idx1, idx2) => {
      let temp = this.arr[idx1];
      this.arr[idx1] = this.arr[idx2];
      this.arr[idx2] = temp;
    };

    swim = (k) => {
      while (k > 1 && this.greater(this.arr[Math.floor(k / 2)], this.arr[k])) {
        this.swap(k, Math.floor(k / 2));
        k = Math.floor(k / 2);
      }
    };

    sink = (k) => {
      while (2 * k <= this.N) {
        let j = 2 * k;
        if (j < this.N && this.greater(this.arr[j], this.arr[j + 1])) ++j;
        if (!this.greater(this.arr[k], this.arr[j])) break;
        this.swap(k, j);
        k = j;
      }
    };

    insert = (val) => {
      this.arr[++this.N] = val;
      this.swim(this.N);
    };

    getMin = () => {
      //if(this.N == 0) throw "Empty PQ Error";
      this.swap(1, this.N);
      let min = this.arr[this.N--];
      this.sink(1);
      this.arr[this.N + 1] = null;
      return min;
    };

    isEmpty = () => {
      return this.N === 0;
    };
  }

  class Ball {
    constructor(
      backgroundColor,
      x = 100,
      y = 100,
      velocityX = 10,
      velocityY = 10,
      radius = window.innerWidth / 15
    ) {
      this.x = Math.random() * window.innerWidth;
      this.y = Math.random() * document.querySelector(".bg").clientHeight;
      this.velocityX = Math.random() * 5;
      this.velocityY = Math.random() * 5;
      this.radius = radius;
      this.backgroundColor = backgroundColor;
      this.mass = 0.5;
      this.count = 0;
    }

    getCount() {
      return this.count;
    }

    draw(ctx) {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, 360);
      ctx.fill();
      ctx.shadowOffsetX = -(this.radius - 10);
      ctx.shadowOffsetY = this.radius - 10;
      ctx.shadowBlur = 6;
      ctx.shadowColor = "rgba(0,0,255,0.1)";
      ctx.fillStyle = this.backgroundColor;
    }
    move(time) {
      this.x += this.velocityX * time;
      this.y += this.velocityY * time;
      Math.floor(this.x);
      Math.floor(this.y);
    }

    timeToHit(that) {
      if (this === that) return Infinity;
      let dx = that.x - this.x;
      let dy = that.y - this.y;
      let dvx = that.velocityX - this.velocityX;
      let dvy = that.velocityY - this.velocityY;
      let dvdr = dx * dvx + dy * dvy;
      if (dvdr > 0) return Infinity;
      let dvdv = dvx * dvx + dvy * dvy;
      let drdr = dx * dx + dy * dy;
      let sigma = this.radius + that.radius;
      let d = dvdr * dvdr - dvdv * (drdr - sigma * sigma);
      if (d < 0) return Infinity;
      return -(dvdr + Math.sqrt(d)) / dvdv;
    }

    timeToHitVerticallWall() {
      if (this.velocityX > 0)
        return (window.innerWidth - this.x - this.radius) / this.velocityX;
      else if (this.velocityX < 0)
        return (this.radius - this.x) / this.velocityX;
      else return Infinity;
    }

    timeToHitHorizontalWall() {
      if (this.velocityY > 0)
        return (
          (document.querySelector(".bg").clientHeight - this.y - this.radius) /
          this.velocityY
        );
      else if (this.velocityY < 0)
        return (this.radius - this.y) / this.velocityY;
      return Infinity;
    }

    bounceOff(that) {
      let dx = that.x - this.x;
      let dy = that.y - this.y;
      let dvx = that.velocityX - this.velocityX;
      let dvy = that.velocityY - this.velocityY;
      let dvdr = dx * dvx + dy * dvy;
      let dist = this.radius + that.radius;
      let J =
        (2 * this.mass * that.mass * dvdr) / ((this.mass + that.mass) * dist);
      let Jx = (J * dx) / dist;
      let Jy = (J * dy) / dist;
      this.velocityX += Jx / this.mass;
      this.velocityY += Jy / this.mass;
      that.velocityX -= Jx / that.mass;
      that.velocityY -= Jy / that.mass;
      ++this.count;
      ++that.count;
    }

    bounceOffVerticalWall() {
      this.velocityX = -this.velocityX;
      ++this.count;
    }
    bounceOffHorizontalWall() {
      this.velocityY = -this.velocityY;
      ++this.count;
    }
  }

  class BigBall extends Ball {
    constructor() {
      super();
      this.radius = 24;
      this.mass = 3;
    }
  }

  class Event {
    constructor(time, a, b) {
      this.time = time;
      this.a = a;
      this.b = b;
      if (a != null) this.countA = a.getCount();
      else this.countA = -1;
      if (b != null) this.countB = b.getCount();
      else this.countB = -1;
    }

    isValid() {
      if (this.a != null && this.a.getCount() != this.countA) return false;
      if (this.b != null && this.b.getCount() != this.countB) return false;
      return true;
    }

    getA() {
      return this.a;
    }

    getB() {
      return this.b;
    }

    getTime() {
      return this.time;
    }
  }

  class CollisionSystem {
    constructor() {
      this.c = document.getElementById("main");
      this.ctx = this.c.getContext("2d");
      this.balls = [];
      this.t = 0;
      this.hz = 1; //frequency
      this.pq = new CustomPQ();
      window.addEventListener(
        "resize",
        this.windowResizeHandler.bind(this),
        false
      );
      this.windowResizeHandler();
    }

    //todo: doesn't really belong to this class, but meh
    windowResizeHandler() {
      this.SCREEN_WIDTH = window.innerWidth;
      this.SCREEN_HEIGHT = document.querySelector(".bg").clientHeight;
      this.c.width = this.SCREEN_WIDTH;
      this.c.height = this.SCREEN_HEIGHT;
      var grd = this.ctx.createRadialGradient(
        0,
        0,
        this.SCREEN_WIDTH * 1.3,
        0,
        0,
        0
      );
      grd.addColorStop(0, "#F2A268");
      this.ctx.fillStyle = grd;
    }

    redraw() {
      let k = 0;
      this.ctx.clearRect(0, 0, this.SCREEN_WIDTH, this.SCREEN_HEIGHT);

      this.balls.forEach((ball) => {
        ball.draw(this.ctx);
      });

      this.pq.insert(new Event(this.t + 1 / this.hz, null, null));
    }

    predict(a) {
      if (a == null) return;
      this.balls.forEach((ball) => {
        let dt = a.timeToHit(ball);
        if (dt !== Infinity) this.pq.insert(new Event(this.t + dt, a, ball));
      });

      let dtX = a.timeToHitVerticallWall();
      let dtY = a.timeToHitHorizontalWall();
      if (dtX !== Infinity) this.pq.insert(new Event(this.t + dtX, a, null));
      if (dtY !== Infinity) this.pq.insert(new Event(this.t + dtY, null, a));
    }
    simulate() {
      let me = this;
      for (let i = 0; i < this.balls.length; ++i) {
        this.predict(this.balls[i]);
      }
      this.pq.insert(new Event(0, null, null));

      function step() {
        let ev = me.pq.getMin();
        if (ev.isValid()) {
          let a = ev.getA();
          let b = ev.getB();

          me.balls.forEach((ball) => {
            ball.move(ev.getTime() - me.t);
          });

          me.t = ev.getTime();
          if (a != null && b != null) a.bounceOff(b);
          else if (a != null && b == null) a.bounceOffVerticalWall();
          else if (a == null && b != null) b.bounceOffHorizontalWall();
          else if (a == null && b == null) me.redraw();
          me.predict(a);
          me.predict(b);
        }
        window.setTimeout(step, 0);
      }
      window.setTimeout(step, 0);
    }

    start() {
      let numBalls = ["#73D27D", "#EA43CF", "#F2D568", "#B3E052", "#F2A268"];
      for (let i = 0; i < numBalls.length; ++i) {
        this.balls[i] = new Ball(numBalls[i]);
      }
      this.simulate();
    }
  }
  useEffect(() => {
    new CollisionSystem().start();
  }, []);
  return <canvas id="main"></canvas>;
};
export default Test;
