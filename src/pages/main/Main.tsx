import { useEffect, useRef, useState } from "react"
import Typewriter from 'typewriter-effect';
import "./Main.scoped.scss"
import { useTranslation } from 'react-i18next';
import { debounce } from "lodash"
const AnimatedTypingComponent = () => {
    const { t, i18n } = useTranslation();
    const [arr, arrSet] = useState<string[]>([]);
    useEffect(() => {
        arrSet(t('changeTitle').split(","));
    }, [i18n.language])
    return (
        <h2 className="h2-title">
            <Typewriter
                options={{
                    delay: 85,
                    deleteSpeed: 1,
                    strings: arr,
                    autoStart: true,
                    loop: true,
                }}
            />
        </h2>
    )
};
export default function Main() {
    const canvasRef = useRef<HTMLDivElement | null>(null);
    const { t } = useTranslation();

    const Ball = {
        create: function (color, dx, dy, name, width) {
            const newBall = Object.create(this);
            newBall.dx = dx;
            newBall.dy = dy;
            newBall.name = name;
            newBall.radius = 500;
            newBall.width = 350;
            newBall.height = 350;
            newBall.element = document.createElement('div');
            newBall.element.style.backgroundColor = color;
            newBall.element.style.width = width + 'px';
            newBall.element.style.height = width + 'px';
            newBall.element.style.boxShadow = `-${window.innerWidth / 20}px ${window.innerWidth / 20}px 0px rgba(0, 0, 0, 0.05)`
            newBall.element.className += ' ball';
            newBall.width = parseInt(newBall.element.style.width);
            newBall.height = parseInt(newBall.element.style.height);
            (canvasRef.current as unknown as HTMLDivElement).appendChild(newBall.element);
            return newBall;
        },
        delete: function () {
            document.querySelectorAll(".ball").forEach((el, index) => {
                el.remove();
            })
            Ball.create("#F2A268", 4, 3, "a", window.innerWidth / 8).draw(window.innerWidth / 10, 0);
            Ball.create("#73D27D", 5, 2, "b", window.innerWidth / 8).draw(0, 0);
            Ball.create("#EA43CF", 5, 8, "c", window.innerWidth / 8).draw(window.innerWidth / 3, 0);
            Ball.create("#F2D568", 6, 5, "d", window.innerWidth / 8).draw(0, 0);
            Ball.create("#B3E052", 9, 2, "e", window.innerWidth / 8).draw(window.innerWidth / 5, 0);

        },
        moveTo: function (x, y) {
            const thisObj = this as { [key: string]: any };
            const el = thisObj.element
            if (thisObj.name == 'a') {
                el.style.left = x + 'px';
                el.style.top = y + 'px';
            }
            if (thisObj.name == "b") {
                el.style.right = x + 'px';
                el.style.top = y + 'px';
            }
            if (thisObj.name == "c") {

                el.style.left = x + 'px';
                el.style.bottom = y + 'px';
            }
            if (thisObj.name == "d") {
                el.style.right = x + 'px';
                el.style.bottom = y + 'px';
            }
            if (thisObj.name == "e") {
                el.style.right = x + 'px';
                el.style.top = y + 'px';


            }
        },
        changeDirectionIfNecessary: function (x, y) {
            const ball = this as { [key: string]: any };
            const canvasWidth = (canvasRef.current as unknown as HTMLDivElement).clientWidth;
            const canvasHeight = (canvasRef.current as unknown as HTMLDivElement).clientHeight;
            if (x < 0 || x > canvasWidth - ball.width) {
                ball.dx = -ball.dx;
            }
            if (y < 0 || y > canvasHeight - ball.height) {
                ball.dy = -ball.dy;
            }
        },

        draw: function (x, y) {
            this.moveTo(x, y);
            const ball = this as { [key: string]: any };
            setTimeout(() => {
                ball.changeDirectionIfNecessary(x, y);
                ball.draw(x + ball.dx, y + ball.dy);
                // let dx = another_ball.position.x - this.position.x, dy = another_ball.position.y - this.position.y
                // let distance = Math.sqrt(dx*dx + dy*dy)
                // if(distance < this.radius + another_ball.radius){
                //   console.log("부딪힘")
                //   let tmp = this.velocity
                //   this.velocity = another_ball.velocity
                //   another_ball.velocity = tmp
                // }
            }, 1000 / 60);
        }
    };
    useEffect(() => {
        Ball.create("#F2A268", 4, 3, "a", window.innerWidth / 8).draw(window.innerWidth / 10, 0);
        Ball.create("#73D27D", 5, 2, "b", window.innerWidth / 8).draw(0, 0);
        Ball.create("#EA43CF", 5, 8, "c", window.innerWidth / 8).draw(window.innerWidth / 3, 0);
        Ball.create("#F2D568", 6, 5, "d", window.innerWidth / 8).draw(0, 0);
        Ball.create("#B3E052", 9, 2, "e", window.innerWidth / 8).draw(window.innerWidth / 5, 0);
        window.addEventListener('resize', function () {
            // your custom logic
            Ball.delete();
        });

    }, [])
    return (
        <div className="bg" ref={canvasRef} >
            <div className="center-area">
                <h2 className="h2-title">
                    {t('fixedTitle')}
                </h2>
                <AnimatedTypingComponent />
                <h3 className="h3-title">
                    {t('explain')}
                </h3>
                <div className="btn-wrap">
                    <button onClick={() => window.open('https://apps.apple.com/kr/app/lab-code-scanner/id1597455005?app=itunes&ign-mpt=uo%3D4', '_blank')}
                        className="btn apple-download-btn"></button>
                    <button onClick={() => window.open('https://play.google.com/store/apps/details?id=com.snaptag.labCode', '_blank')} className="btn google-download-btn"></button>
                </div>
            </div>
        </div>
    )
}