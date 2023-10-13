import styles from '@/styles/Footer.module.css';


export default function Footer() {
    return (
        <div className={styles.container}>
            <p className={styles.pText}>Crucial Web Solutions</p>
            <p className={styles.pTextContact}>Contact Us:</p>
            <a className={styles.link} href="mailto:bscheib@crucialwebsolutions.com">bscheib@crucialwebsolutions.com</a>
            <a className={styles.link} href="tel:+1513-348-7019">513-348-7019</a>
        </div>
    )
}