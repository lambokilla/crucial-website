import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Typed from "typed.js";

export function Index() {
    const mobileTextRef = useRef(null);
    const textRef = useRef(null);


    function IsMobile() {
		const [size, setSize] = useState([0, 0]);
		useLayoutEffect(() => {
		  function updateSize() {
			setSize([window.innerWidth, window.innerHeight]);
		  }
		  window.addEventListener('resize', updateSize);
		  updateSize();
		  return () => window.removeEventListener('resize', updateSize);
		}, []);
		if (size[0] >= 640) {
			return false;
		} else {
			return true;
		}
	}		

	const mobile = IsMobile();

    useEffect(() => {
        console.log("mobile", mobile);
        let mobileTyped;
        let typed;
        if (mobile) {
            mobileTyped = new Typed(mobileTextRef.current, {
                strings: ["custom", "affordable", "new"],
                startDelay: 300,
                typeSpeed: 200,
                backDelay: 250,
                smartBackspace: true,
                showCursor: true,
                loop: true,
            });
        } else {
            typed = new Typed(textRef.current, {
                strings: ["custom", "affordable", "new"],
                startDelay: 300,
                typeSpeed: 200,
                backDelay: 250,
                smartBackspace: true,
                showCursor: true,
                loop: true,
            });
        }
        
        return () => {
            if (mobile) {
                mobileTyped.destroy();
            } else {
                typed.destroy();
            }
        }
    });

    return (
        <div className="index">
            <div className="container">
                <section className="one page">
                    <div className="text-type">
                        <h1 className="text first-page-text">
                            Your website, made <span className="text" ref={textRef}></span>
                        </h1>
                        <p className="text first-page-second" ref={mobileTextRef}></p>
                    </div>
                </section>
                
            </div>
            <style jsx>{`

        body::-webkit-scrollbar {
            display:none;
        }

        .page {
            height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
            scroll-snap-align: start;
        }

        .container {
            scroll-snap-type: y mandatory;
            overflow-y: scroll;
            height: 100vh;
            -webkit-overflow-scrolling: touch;
            overflow: overlay;
        }

        .container::-webkit-scrollbar-track-piece:start {
            background: transparent;
            margin-top: 4.5rem;
        }

        .container::-webkit-scrollbar {
            display: block;
            width: 10px;
            background: transparent;
        }
          
        .container::-webkit-scrollbar-thumb {
            background-color: #bababa;
            border-radius: 15px;
        } 


        .index {
            font-family: 'Source Sans Pro', sans-serif;
            font-weight: lighter;
            height: 100vh;
        }

        .one {
            padding: 0;
            margin: 0;
            display:flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            background-color: #2b323c;
            overflow-x: hidden;
            position: relative;
        }

        .text {
            font-weight: 300;
            color: #4070F4;
            font-size: 3rem;
        }

        .first-page-text {
            text-align: center;
            color: #fff;
            position: absolute;
            top: -125px;
        }

        .first-page-second {
            position: absolute;
            top: 25px;
        }

        .first-page-text span {
            display: none;
        }

        .text-type {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            position: absolute;
            width: 390px;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);

        }

        @media (min-width: 32rem) {
            .first-page-text {
                top: -75px;
            }

            .first-page-second {
                top: 10px;
            }

            .text-type {
                width: 100vw;
            }
        }

        @media (min-width: 40rem) {
            .first-page-text {
                left: 0;
            }

            .first-page-text span {
                display: inline;
            }

            .first-page-second {
                display: none;
            }

            .text-type {
                width: 620px;
                flex-direction: row;
            }
        }

        @media (min-width: 40rem) {
            @media(min-height: 31rem) {
                .container::-webkit-scrollbar-track-piece:start {
                    background: transparent;
                    margin-top: 3.5rem;
                }

                .container::-webkit-scrollbar-thumb {
                    border: .25px solid #7f7f7f;
                } 
            }
        }
      `}</style>
        </div>
    );
}

export default Index;
