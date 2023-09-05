import styles from '@/styles/Index.module.css';
import dynamic from "next/dynamic";

const IndexFirst = dynamic(() => import('../sections/index-first'));
const IndexSecond = dynamic(() => import('../sections/index-second'));

export function Index() {

    return (
        // <div className="index">
            <div className={styles.container}>
                <IndexFirst />
                <IndexSecond />
                <section className={styles.page}>
                    <h1>hey there</h1>
                </section>
                
            </div>
        // </div>
    );
}

export default Index;
