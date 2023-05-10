import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import styles from '@/styles/Index.module.css';
import Typed from "typed.js";

// const { className, styles } = css.resolve`
//     div {
//         display: flex;
//         flex-direction: column;
//         align-items: center;
//         justify-content: center;
//         position: absolute;
//         width: 390px;
//         top: 50%;
//         left: 50%;
//         transform: translate(-50%, -50%);
//     }
// `;

export function Index() {
    const firstTargetRef = useRef<HTMLDivElement>(null);
    const mobileTextRef = useRef(null);
    const textRef = useRef(null);

    const { scrollYProgress } = useScroll({
        target: firstTargetRef,
        offset: ["end end", "end start"],
    });

    const scale = useTransform(scrollYProgress, [0, 0.7], [1, 2]);
    const y = useTransform(
        scrollYProgress,
        [0, .5, 1],
        ["50%", "25%", "0%"]
    );

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
        console.log("yscroll", scrollYProgress);
    }, [scrollYProgress]);

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
        // <div className="index">
            <div className={styles.container}>
                <section ref={firstTargetRef} className={`${styles.one} ${styles.page}`}>
                    <motion.div 
                        style={{scale}}
                        className={styles.textType}
                    >
                        <div className={styles.desktopText}>
                            <h1 className={`${styles.text} ${styles.firstPageText}`}>
                                Your website, made 
                            </h1>
                            <h1><span className={styles.text} ref={textRef}></span></h1>
                        </div>
                        <p className={`${styles.text} ${styles.firstPageSecond}`} ref={mobileTextRef}></p>
                    </motion.div>
                </section>
                <section className={`${styles.two} ${styles.page}`}>
                    <h1 className={styles.h1White}>Welcome to Crucial Web Solutions</h1>
                    <h1 className={styles.h1White}>A new way to meet your website needs</h1>
                </section>
                
            </div>
        // </div>
    );
}

export default Index;
