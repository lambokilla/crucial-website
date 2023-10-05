import styles from '@/styles/Services.module.css';
import dynamic from 'next/dynamic';
import { useRef, useState } from 'react';

const Footer = dynamic(() => import('./components/Footer'), { ssr: false });

export default function Services() {
    const [webDesignDialog, setWebDesignDialog] = useState(false);

    const webDesignRef = useRef(null);
    const webDesignContainerRef = useRef(null);

    const webDesignDialogClick = () => {
        let bool = webDesignDialog;
        bool = !bool;
        setWebDesignDialog(bool);

        if (bool) {
            webDesignContainerRef.current.classList.remove(styles.heightRemove);
            webDesignRef.current.classList.remove(styles.slideOut);
            webDesignRef.current.show();
            webDesignContainerRef.current.classList.add(styles.heightAdd);
        } else {
            webDesignRef.current.classList.add(styles.slideOut);
            webDesignContainerRef.current.classList.add(styles.heightRemove);
            webDesignContainerRef.current.classList.remove(styles.heightAdd);
            setTimeout(() => {
                webDesignRef.current.close();
            }, 1000);
        }
    }

    return (
        <div className={styles.container}>
            <section className={styles.page}>
                <h1 className={styles.h1Text}>Services</h1>
                <div className={styles.box}>
                    <p className={styles.pText}>We offer a variety of services to help get your business on the web and to help market it.</p>
                </div>
                <div className={styles.flexAuto}>
                    <div className={styles.flexColumn}>
                        <h2 className={styles.h2Text}>Website Development and SEO</h2>
                        <div className={styles.boxOutline} onClick={webDesignDialogClick}>
                            <h2 className={styles.boxOutlineText}>Website Design</h2>
                            <div ref={webDesignContainerRef} className={styles.dialogBox}>
                                <dialog ref={webDesignRef} className={styles.webDesignDialog}>
                                    <p className={styles.dialogText}>Some text that is sort of long. The quick brown fox jumped over the lazy dog.</p>
                                </dialog>
                            </div>
                        </div>
                    </div>
                </div>
                
            </section>
            <Footer />
        </div>
    )
}