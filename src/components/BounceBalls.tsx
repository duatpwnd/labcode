import { useEffect, useRef } from "react";
const BounceBalls = ({ bg }) => {
    let simulateTimer: null | number = null;
    const bgRef = useRef<HTMLCanvasElement>(null);
    const debounce = (func) => {
        let timer;
        return (event) => {
            if (timer) clearTimeout(timer);
            timer = setTimeout(func, 100, event);
        };
    };
    class CustomPQ {
        arr: { [key: string]: any } | null[]
        N: number
        constructor() {
            this.arr = [];
            this.N = 0;
        }
        greater = (ev1: { [key: string]: any }, ev2: { [key: string]: any }) => {
            return ev1.time > ev2.time && ev1.time > 0;
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
        backgroundColor: string
        x: number
        y: number
        velocityX: number
        velocityY: number
        radius: number
        mass: number
        count: number
        constructor(
            backgroundColor,
            x = 100,
            y = 100,
            velocityX = 10,
            velocityY = 10,
            radius = window.innerWidth < 479 ? window.innerWidth / 7 : window.innerWidth / 15,
        ) {
            this.x = Math.random() * window.innerWidth;
            this.y = Math.random() * bg.current.clientHeight;
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
            ctx.globalCompositeOperation = 'difference';
            ctx.shadowOffsetX = -(this.radius - 10);
            ctx.shadowOffsetY = this.radius - 10;
            ctx.shadowColor = "rgba(0,0,0,0.05)";
            ctx.shadowBlur = 1;
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
            if (bg.current != null) {
                if (this.velocityY > 0)
                    return (
                        (bg.current.clientHeight - this.y - this.radius) /
                        this.velocityY
                    );
                else if (this.velocityY < 0)
                    return (this.radius - this.y) / this.velocityY;
                return Infinity;
            }
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

    class Event {
        time: number;
        a: { [key: string]: any }
        b: { [key: string]: any }
        countA: number;
        countB: number;
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
        c: HTMLCanvasElement
        ctx: { [key: string]: any }
        balls: { [key: string]: any }[]
        t: number;
        hz: number;
        pq: { [key: string]: any }
        SCREEN_WIDTH !: number;
        SCREEN_HEIGHT !: number;
        constructor() {
            this.c = bgRef.current as HTMLCanvasElement;
            this.ctx = (this.c.getContext("2d") as { [key: string]: any });
            this.balls = [];
            this.t = 0;
            this.hz = 1; //frequency
            this.pq = new CustomPQ();
            window.addEventListener(
                "resize",
                this.windowResizeHandler.bind(this)
            );
            this.windowResizeHandler();

        }

        //todo: doesn't really belong to this class, but meh
        windowResizeHandler() {
            if (bgRef.current != null) {

                console.log("windowResizeHandler resize")
                this.SCREEN_WIDTH = window.innerWidth;
                this.SCREEN_HEIGHT = bg.current.clientHeight;
                this.c.width = this.SCREEN_WIDTH;
                this.c.height = this.SCREEN_HEIGHT;
                const grd = this.ctx.createRadialGradient(
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
            }
            if (simulateTimer != null) {
                window.clearInterval(simulateTimer);
            }
            simulateTimer = window.setInterval(step, 10);
        }
        init() {
            this.balls = [];
            this.start();
        }
        addBounceBall() {
            let numBalls
            if (window.innerWidth < 480) {
                numBalls = ["#F2D568", "#73D27D", "#EA43CF"];
            } else {
                numBalls = ["#F2D568", "#73D27D", "#EA43CF", "#B3E052", "#F2A268"];
            }
            for (let i = 0; i < numBalls.length; ++i) {
                this.balls[i] = new Ball(numBalls[i]);
            }
        }
        start() {
            this.addBounceBall();
            this.simulate();
        }
    }
    useEffect(() => {
        new CollisionSystem().start();
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) == false) {
            window.addEventListener(
                "resize",
                debounce(() => {
                    if (bgRef.current != null) {
                        new CollisionSystem().init();
                    }
                })
            );
        }
    }, []);
    return <canvas id="main" ref={bgRef}></canvas>;
};
export default BounceBalls;