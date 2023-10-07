import styles from '@/styles/Services.module.css';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

const Footer = dynamic(() => import('./components/Footer'), { ssr: false });

export default function Services() {
    const [webDesignDialog, setWebDesignDialog] = useState(false);
    const [seoDialog, setSeoDialog] = useState(false);
    const [onlineMarketingDialog, setOnlineMarketingDialog] = useState(false);
    const [emailListDialog, setEmailListDialog] = useState(false);

    const webDesignRef = useRef(null);
    const webDesignContainerRef = useRef(null);
    const webDesignPlusRef = useRef(null);
    const seoRef = useRef(null);
    const seoContainerRef = useRef(null);
    const seoPlusRef = useRef(null);
    const onlineMarketingRef = useRef(null);
    const onlineMarketingContainerRef = useRef(null);
    const onlineMarketingPlusRef = useRef(null);
    const emailListRef = useRef(null);
    const emailListContainerRef = useRef(null);
    const emailListPlusRef = useRef(null);
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

    const isBtnVisible = useIsVisible(btnRef);

    useEffect(() => {
        if (isBtnVisible) {
            btnRef.current.classList.add(styles.fadeIn);
        }
    }, [isBtnVisible]);

    const webDesignDialogClick = () => {
        let bool = webDesignDialog;
        bool = !bool;
        setWebDesignDialog(bool);

        webDesignPlusRef.current.classList.toggle(styles.opened);

        if (bool) {
            webDesignContainerRef.current.classList.remove(styles.heightRemove120);
            webDesignRef.current.classList.remove(styles.slideOut120);
            webDesignRef.current.show();
            webDesignContainerRef.current.classList.add(styles.heightAdd120);
        } else {
            webDesignRef.current.classList.add(styles.slideOut120);
            webDesignContainerRef.current.classList.add(styles.heightRemove120);
            webDesignContainerRef.current.classList.remove(styles.heightAdd120);
            setTimeout(() => {
                webDesignRef.current.close();
            }, 1000);
        }
    }

    const seoDialogClick = () => {
        let bool = seoDialog;
        bool = !bool;
        setSeoDialog(bool);

        seoPlusRef.current.classList.toggle(styles.opened);

        if (bool) {
            seoContainerRef.current.classList.remove(styles.heightRemove200);
            seoRef.current.classList.remove(styles.slideOut200);
            seoRef.current.show();
            seoContainerRef.current.classList.add(styles.heightAdd200);
        } else {
            seoRef.current.classList.add(styles.slideOut200);
            seoContainerRef.current.classList.add(styles.heightRemove200);
            seoContainerRef.current.classList.remove(styles.heightAdd200);
            setTimeout(() => {
                seoRef.current.close();
            }, 1000);
        }
    }

    const onlineMarketingClick = () => {
        let bool = onlineMarketingDialog;
        bool = !bool;
        setOnlineMarketingDialog(bool);

        onlineMarketingPlusRef.current.classList.toggle(styles.opened);

        if (bool) {
            onlineMarketingContainerRef.current.classList.remove(styles.heightRemove150);
            onlineMarketingRef.current.classList.remove(styles.slideOut150);
            onlineMarketingRef.current.show();
            onlineMarketingContainerRef.current.classList.add(styles.heightAdd150);
        } else {
            onlineMarketingRef.current.classList.add(styles.slideOut150);
            onlineMarketingContainerRef.current.classList.add(styles.heightRemove150);
            onlineMarketingContainerRef.current.classList.remove(styles.heightAdd150);
            setTimeout(() => {
                onlineMarketingRef.current.close();
            }, 1000);
        }
    }

    const emailListClick = () => {
        let bool = emailListDialog;
        bool = !bool;
        setEmailListDialog(bool);

        emailListPlusRef.current.classList.toggle(styles.opened);

        if (bool) {
            emailListContainerRef.current.classList.remove(styles.heightRemove200);
            emailListRef.current.classList.remove(styles.slideOut200);
            emailListRef.current.show();
            emailListContainerRef.current.classList.add(styles.heightAdd200);
        } else {
            emailListRef.current.classList.add(styles.slideOut200);
            emailListContainerRef.current.classList.add(styles.heightRemove200);
            emailListContainerRef.current.classList.remove(styles.heightAdd200);
            setTimeout(() => {
                emailListRef.current.close();
            }, 1000);
        }
    }

    return (
        <div className={styles.container}>
            <section className={styles.page}>
                <h1 className={styles.h1Text}>Services</h1>
                <div className={styles.box}>
                    <p className={styles.pText}>We offer a variety of services to help get your business online and to help market it.</p>
                </div>
                <div className={styles.flexAuto}>
                    <div className={styles.flexColumn}>   
                        <h2 className={styles.h2Text}>Website Development and SEO</h2>
                        <div className={styles.boxOutline} onClick={webDesignDialogClick}>
                            <div className={styles.flexRow}>
                                <h2 className={styles.boxOutlineText}>Website Design</h2>
                                <div ref={webDesignPlusRef} className={`${styles.plusMinus} ${styles.closed}`}>
                                    <div className={styles.horizontal}></div>
                                    <div className={styles.vertical}></div>
                                </div>
                            </div>
                            <div ref={webDesignContainerRef} className={styles.dialogBox}>
                                <dialog ref={webDesignRef} className={styles.webDesignDialog}>
                                    <p className={styles.dialogText}>We can cater to all your web design needs. From a simple home page to 
                                    a sophisticated eCommerce site, we can do it.
                                    </p>
                                </dialog>
                            </div>
                        </div>
                        <div className={styles.boxOutline} onClick={seoDialogClick}>
                            <div className={styles.flexRow}>
                                <h2 className={styles.boxOutlineText}>Search Engine Optmization</h2>
                                <div ref={seoPlusRef} className={`${styles.plusMinus} ${styles.closed}`}>
                                    <div className={styles.horizontal}></div>
                                    <div className={styles.vertical}></div>
                                </div>
                            </div>
                            <div ref={seoContainerRef} className={styles.dialogBox}>
                                <dialog ref={seoRef} className={styles.seoDialog}>
                                    <p className={styles.dialogText}>Getting your business to show up in online searches is important. We specialize 
                                    in getting your website to show up every time. We can also help manage marketing your business to show up 
                                    under different search conditions.
                                    </p>
                                </dialog>
                            </div>
                        </div>
                    </div>
                    <div className={styles.flexColumn}>
                        <h2 className={styles.h2Text}>Marketing</h2>
                        <div className={styles.boxOutline} onClick={onlineMarketingClick}>
                            <div className={styles.flexRow}>
                                <h2 className={styles.boxOutlineText}>Online Marketing</h2>
                                <div ref={onlineMarketingPlusRef} className={`${styles.plusMinus} ${styles.closed}`}>
                                    <div className={styles.horizontal}></div>
                                    <div className={styles.vertical}></div>
                                </div>
                            </div>
                            <div ref={onlineMarketingContainerRef} className={styles.dialogBox}>
                                <dialog ref={onlineMarketingRef} className={styles.onlineMarketingDialog}>
                                    <p className={styles.dialogText}>In this digital age, online marketing is a crucial way to get your business 
                                    seen by many people. We deal with all aspects of marketing your business online.
                                    </p>
                                </dialog>
                            </div>
                        </div>
                        <div className={styles.boxOutline} onClick={emailListClick}>
                            <div className={styles.flexRow}>
                                <h2 className={styles.boxOutlineText}>Email Lists</h2>
                                <div ref={emailListPlusRef} className={`${styles.plusMinus} ${styles.closed}`}>
                                    <div className={styles.horizontal}></div>
                                    <div className={styles.vertical}></div>
                                </div>
                            </div>
                            <div ref={emailListContainerRef} className={styles.dialogBox}>
                                <dialog ref={emailListRef} className={styles.emailListDialog}>
                                    <p className={styles.dialogText}>Creating an email list or a newsletter is a great way to keep your customers 
                                    engaged and to keep them informed of any new promotions or products your business may have.
                                    </p>
                                </dialog>
                            </div>
                        </div>
                    </div>
                </div>
                <button ref={btnRef} className={styles.contactBtn}>
                    <Link href="/contact" style={{ textDecoration: 'none' }}>
                        <p className={styles.contactBtnText}>Contact Us</p>
                    </Link>
                </button>
            </section>
            <Footer />
        </div>
    )
}