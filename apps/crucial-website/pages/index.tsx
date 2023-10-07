import styles from '@/styles/Index.module.css';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import path from 'path';

path.resolve('./next.config.js');

const Footer = dynamic(() => import('./components/Footer'), { ssr: false });

export function Index() {
    const isMobile = useMediaQuery({ query: `(max-width: 410px)` });
    const isLessThan550 = useMediaQuery({ query: `(max-width: 550px)` });
    const isTextMultiline = useMediaQuery({ query: `(max-width: 780px)` });
    const [titleText, setTitleText] = useState("");
    const [word] = useState("Website Design and Online Marketing");
    let charIndex = 0;
    const [dimensions, setDimensions] = useState({
        height: "180px",
        width: "350px"
    })

    const title = useRef(null);

    useEffect(() => {
        if (isMobile) {
            setDimensions({
                height: "180px",
                width: "350px"
            });
        } else if (isLessThan550 && !isMobile) {
            setDimensions({
                height: "110px",
                width: "400px"
            });
        } else if (!isLessThan550 && isTextMultiline) {
            setDimensions({
                height: "110px",
                width: "550px"
            });
        } else {
            setDimensions({
                height: "80px",
                width: "auto"
            })
        }
    }, [isMobile, isLessThan550, isTextMultiline]);

    const typeEffect = useCallback(() => {
        const currentWord = word;
        const currentChar = currentWord.substring(0, charIndex);
        setTitleText(currentChar);

        if (charIndex < currentWord.length) {
            charIndex++;
            setTimeout(typeEffect, 70);
        }
    }, [charIndex, word]);

    useEffect(() => {
        typeEffect();
    }, [typeEffect]);

    return (
        <div className={styles.container}>
            <section className={styles.page}>
                <div className={styles.flex}>
                    <div className={styles.title}>
                        <h1 ref={title} className={styles.h1Text} style={{ height: dimensions.height, width: dimensions.width }}>{titleText}</h1>
                        <h1 className={styles.typeIndicator}></h1>
                        
                    </div>
                    <div className={styles.box}>
                        <p className={styles.pText}>We make custom websites suited for your business&apos;s needs and help market your site to grow your business&apos;s online presence.</p>
                    </div>
                </div>
                <div className={styles.flexEnd}>
                    <button className={styles.contactBtn}>
                        <Link href="/contact#" style={{ textDecoration: 'none' }}>
                            <p className={styles.contactBtnText}>Contact Us</p>
                        </Link>
                    </button>
                </div>
            </section>
            <Footer />
            
        </div>
    );
}

export default Index;
