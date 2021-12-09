import { useEffect, useRef, useState } from "react"
import "./Main.scoped.scss"
export default function Main() {
    const canvasRef = useRef<HTMLDivElement | null>(null);
    const Ball = {
        create: function (color, dx, dy) {
            const newBall = Object.create(this);
            newBall.dx = dx;
            newBall.dy = dy;
            newBall.width = 350;
            newBall.height = 350;
            newBall.element = document.createElement('div');
            newBall.element.style.backgroundColor = color;
            newBall.element.style.width = newBall.width + 'px';
            newBall.element.style.height = newBall.height + 'px';
            newBall.element.className += ' ball';
            newBall.width = parseInt(newBall.element.style.width);
            newBall.height = parseInt(newBall.element.style.height);
            (canvasRef.current as unknown as HTMLDivElement).appendChild(newBall.element);
            return newBall;
        },
        moveTo: function (x, y) {
            const thisObj = this as { [key: string]: any };
            const el = thisObj.element
            el.style.left = x + 'px';
            el.style.top = y + 'px';
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
            }, 1000 / 60);
        }
    };
    useEffect(() => {
        const ballArr = [Ball.create("#F2A268", 4, 3), Ball.create("#73D27D", 2, 2), Ball.create("#EA43CF", 5, 8), Ball.create("#F2D568", 6, 5), Ball.create("#B3E052", 9, 2)]
        ballArr.forEach((el, index) => {
            el.draw(70, 0);
        })
    }, [])
    return (
        <div className="bg" ref={canvasRef} >
            <div className="center-area">
                <h2 className="h2-title">
                    비 가시성 랩 코드<br />다양한 정보를 한눈에,
                </h2>
                <h3 className="h3-title">
                    새로운 데이터 구축 기술
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