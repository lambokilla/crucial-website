import styles from '@/styles/About.module.css';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';

const Footer = dynamic(() => import('./components/Footer'), { ssr: false });

export function About() {

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
					/>
                    <div className={styles.about}>
                        <p>My name is Ben Scheib and I am the founder of Crucial Web Solutions. When I was growing up, I wanted to start a business that I was passionate about and to help others in the process. I started small in high school by 
                            meeting people in Starbucks and fixing their broken iPhones. I have since moved on, learning programming, web development, and so much more. I enjoy what I do and I continue to learn more each and every day.
                        </p>
                    </div>

                </div>
                <p className={styles.goalStatement}>I&apos;m starting my company with a few key goals:</p>
                <div className={styles.center}>
                    <ul className={styles.list}>
                        <li>We will help you grow your online presence, through effective development and optional online marketing</li>
                        <li>Provide you with a free initial consultation, reasonable cost, and affordable continued support for websites of any size</li>
                        <li>We will always be easy to reach, just a simple call or text away</li>
                    </ul>
                </div>
                <div className={styles.center}>
                    <button className={styles.contactBtn}>
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