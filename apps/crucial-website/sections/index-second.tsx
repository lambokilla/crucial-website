import { useEffect, useRef, useState } from 'react';
import styles from './index-second.module.css';
import { motion, useAnimation, useInView, useScroll, useTransform } from "framer-motion";
import { useMediaQuery } from 'react-responsive';

export default function IndexSecond() {
    const isMobile = useMediaQuery({ query: `(max-width: 688px)` });
    const [scaleValues, setScaleValues] = useState([0, 0.3]);
    const [yValues, setYValues] = useState([0, 0.3, 1]);
    const targetRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (isMobile) {
            setScaleValues([0, 0.15]);
            setYValues([0, 0.15, 1]);
        } else {
            setScaleValues([0, 0.3]);
            setYValues([0, 0.3, 1]);
        }
    }, [isMobile]);

    const isInView = useInView(targetRef, { once: true });

    const mainControls = useAnimation();

    useEffect(() => {
        if (isInView) {
            mainControls.start("visible");
        }
        console.log(isInView);
    }, [isInView, mainControls]);

    const { scrollYProgress } = useScroll({
        target: targetRef,
        offset: ["end end", "end start"],
    });

    const y = useTransform(
        scrollYProgress,
        yValues,
        [300, 0, 0]
    );

    useEffect(() => {
        console.log(scrollYProgress);
    }, [scrollYProgress]);

    const scale = useTransform(scrollYProgress, scaleValues, [0.75, 1]);

    return (
        <section className={`${styles.two} ${styles.page}`}>
            <div ref={targetRef}
                // style={{ scale, y }}
                className={styles.box}
            >
                <h1 className={styles.h1White}>Welcome to Crucial Web Solutions</h1>
                <h1 className={styles.h1White}>A new way to meet your website needs</h1>
                <button className={styles.button}>Contact Us</button>
            </div>
        </section>
    )
}