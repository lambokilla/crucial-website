import styles from './index-first.module.css';
import Typed from "typed.js";
import { motion, useAnimation, useInView, useScroll, useTransform } from "framer-motion";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useMediaQuery } from 'react-responsive';

export default function IndexFirst() {
    const isMobile = useMediaQuery({ query: `(max-width: 688px)` });
    const ref = useRef<HTMLDivElement>(null);
    const mobileTextRef = useRef(null);
    const textRef = useRef(null);

    const isInView = useInView(ref, { once: true });

    const mainControls = useAnimation();

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["end end", "end start"],
    });

    useEffect(() => {
        if (isInView) {
            mainControls.start("visible");
        }
    }, [isInView]);

    const scale = useTransform(scrollYProgress, [0, 1], [1, 2]);
    const y = useTransform(
        scrollYProgress,
        [0, .5, 1],
        ["0%", "-50%", "-75%"]
    );

    useEffect(() => {
        console.log("yscroll", scrollYProgress);
    }, [scrollYProgress]);

    // useEffect(() => {
    //     console.log("mobile", isMobile);
    //     let mobileTyped;
    //     let typed;
    //     if (isMobile) {
    //         setTimeout(() => {
    //             mobileTyped = new Typed(mobileTextRef.current, {
    //                 strings: ["custom", "affordable", "dynamic"],
    //                 startDelay: 300,
    //                 typeSpeed: 200,
    //                 backDelay: 250,
    //                 smartBackspace: true,
    //                 showCursor: false,
    //                 loop: true,
    //             });
    //         }, 400);
    //     } else {
    //         setTimeout(() => {
    //             typed = new Typed(textRef.current, {
    //                 strings: ["custom", "affordable", "dynamic"],
    //                 startDelay: 300,
    //                 typeSpeed: 200,
    //                 backDelay: 250,
    //                 smartBackspace: true,
    //                 showCursor: false,
    //                 loop: true,
    //             });
    //         }, 400);
    //     }

    //     return () => {
    //         if (isMobile) {
    //             mobileTyped.destroy();
    //         } else {
    //             typed.destroy();
    //         }
    //     }
    // }, [isMobile]);
    return (
        <section ref={ref} className={`${styles.one} ${styles.page}`}>
            <div className={styles.textType}>
                <div className={styles.containter}>
                    <h1 className={styles.h1Text}>Website Design and Online Marketing</h1>
                    <div className={styles.box}>
                        <p className={styles.pText}>We make custom websites suited for your businesses needs. We help market your site to grow your businesses online presence.</p>
                    </div>

                </div>
            </div>
        </section>

    );
}

