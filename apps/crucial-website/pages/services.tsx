import styles from '@/styles/Services.module.css';
import dynamic from 'next/dynamic';

const Footer = dynamic(() => import('./components/Footer'), { ssr: false });

export default function Services() {

    return (
        <div className={styles.container}>
            <section className={styles.page}></section>
            <Footer />
        </div>
    )
}