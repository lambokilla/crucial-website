import styles from '@/styles/About.module.css';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

const Footer = dynamic(() => import('./components/Footer'), { ssr: false });

export function About() {
    const [imageOpacity, setImageOpacity] = useState("0");
    const [opacity, setOpacity] = useState("0");

    const imageRef = useRef(null);
    const descriptionRef = useRef(null);
    const aboutRef = useRef(null);
    const goalRef = useRef(null);
    const btnRef = useRef(null);

    function useIsVisible(ref) {
        const [isIntersecting, setIntersecting] = useState(false);
      
        useEffect(() => {
          const observer = new IntersectionObserver(([entry]) =>
            setIntersecting(entry.isIntersecting)
          );
      
          observer.observe(ref.current);
          return () => {
            observer.disconnect();
          };
        }, [ref]);
      
        return isIntersecting;
    }

    const isImageVisible = useIsVisible(imageRef);
    const isDescriptionVisible = useIsVisible(descriptionRef);
    const isGoalVisible = useIsVisible(goalRef);
    const isAboutVisible = useIsVisible(aboutRef);
    const isBtnVisible = useIsVisible(btnRef);

    useEffect(() => {
        if (isAboutVisible) {
            aboutRef.current.classList.add(styles.fadeIn);
            setOpacity("1");
        }
        if (isGoalVisible) {
            goalRef.current.classList.add(styles.fadeIn);
        }
        if (isDescriptionVisible) {
            descriptionRef.current.classList.add(styles.fadeIn);
        }
        if (isBtnVisible) {
            btnRef.current.classList.add(styles.fadeIn);
        }
        if (isImageVisible) {
            imageRef.current.classList.add(styles.visible);
        }
    }, [isAboutVisible, isBtnVisible, isDescriptionVisible, isImageVisible, isGoalVisible]);

    useEffect(() => {
        setTimeout(() => {
            setImageOpacity("1");
        }, 2500);
    });

    return (
        <div className={styles.container}>
            <section className={styles.page}>
                <h1 className={styles.h1Text}>About Crucial Web Solutions</h1>
                <div className={styles.flexAuto}>
                    <Image
						src="https://crucialwebsitestack-imagebucket6194e37c-105gw6s2x4ta3.s3.us-east-1.amazonaws.com/logoC.svg"
						alt="logo"
						height={300}
						width={300}
                        className={styles.image}
                        ref={imageRef}
                        style={{ opacity: imageOpacity}}
					/>
                    <div ref={descriptionRef} className={styles.about}>
                        <p>My name is Ben Scheib and I am the founder of Crucial Web Solutions. When I was growing up, I wanted to start a business that I was passionate about and to help others in the process. I started small in high school by 
                            meeting people in Starbucks and fixing their broken iPhones. I have since moved on, learning programming, web development, and so much more. I enjoy what I do and I continue to learn more each and every day.
                        </p>
                    </div>

                </div>
                <p style={{opacity: opacity}} ref={goalRef} className={styles.goalStatement}>I&apos;m starting my company with a few key goals:</p>
                <div style={{opacity: opacity}} ref={aboutRef} className={styles.center}>
                    <ul className={styles.list}>
                        <li>We will help you grow your online presence, through effective development and optional online marketing</li>
                        <li>Provide you with a free initial consultation, reasonable cost, and affordable continued support for websites of any size</li>
                        <li>We will always be easy to reach, just a simple call or text away</li>
                    </ul>
                </div>
                <div className={styles.center}>
                    <button ref={btnRef} className={styles.contactBtn}>
                        <Link href="/contact" style={{ textDecoration: 'none' }}>
                            <p className={styles.contactBtnText}>Contact Us</p>
                        </Link>
                    </button>
                </div>
            </section>
            <Footer />
        </div>
    )
}

export default About;