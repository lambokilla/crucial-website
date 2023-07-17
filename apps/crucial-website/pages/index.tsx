import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useMediaQuery } from 'react-responsive';
import styles from '@/styles/Index.module.css';
import Typed from "typed.js";

export function Index() {
    const isMobile = useMediaQuery({ query: `(max-width: 688px)` });
    const firstTargetRef = useRef<HTMLDivElement>(null);
    const secondTargetRef = useRef<HTMLDivElement>(null);
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

    useEffect(() => {
        console.log("yscroll", scrollYProgress);
    }, [scrollYProgress]);

    useEffect(() => {
        console.log("mobile", isMobile);
        let mobileTyped;
        let typed;
        if (isMobile) {
            mobileTyped = new Typed(mobileTextRef.current, {
                strings: ["custom", "affordable", "new"],
                startDelay: 300,
                typeSpeed: 200,
                backDelay: 250,
                smartBackspace: true,
                showCursor: false,
                loop: true,
            });
        } else {
            typed = new Typed(textRef.current, {
                strings: ["custom", "affordable", "new"],
                startDelay: 300,
                typeSpeed: 200,
                backDelay: 250,
                smartBackspace: true,
                showCursor: false,
                loop: true,
            });
        }
        
        return () => {
            if (isMobile) {
                mobileTyped.destroy();
            } else {
                typed.destroy();
            }
        }
    }, [isMobile]);

    return (
        // <div className="index">
            <div className={styles.container}>
                <section ref={firstTargetRef} className={`${styles.one} ${styles.page}`}>
                    <motion.div 
                        style={{scale}}
                        className={styles.textType}
                    >
                        {!isMobile &&
                            <div className={styles.desktopText}>
                                <h1 className={`${styles.text} ${styles.firstPageText}`}>
                                    Your website, made 
                                </h1>
                                <h1><span className={` ${styles.text} ${styles.firstPageDesktop}`} ref={textRef}></span></h1>
                            </div>
                        }
                        {isMobile &&
                            <div>
                                <h1 className={`${styles.text} ${styles.firstPageMobileTextOne}`}>
                                    Your website,
                                </h1>
                                <h1 className={`${styles.text} ${styles.firstPageMobileTextTwo}`}>
                                    made
                                </h1>
                                <p className={`${styles.text} ${styles.firstPageMobile}`} ref={mobileTextRef}></p>
                            </div>
                        
                        }
                    </motion.div>
                </section>
                <section ref={secondTargetRef} className={`${styles.two} ${styles.page}`}>
                    <motion.div>
                        <h1 className={styles.h1White}>Welcome to Crucial Web Solutions</h1>
                        <h1 className={styles.h1White}>A new way to meet your website needs</h1>
                    </motion.div>
                </section>
                
            </div>
        // </div>
    );
}

export default Index;
