import styles from '@/styles/Checkout.module.css';
import { httpClient } from '@iyio/common';
import { loadStripe } from "@stripe/stripe-js";
import dynamic from 'next/dynamic';
import { useEffect } from 'react';

const Footer = dynamic(() => import('./components/Footer'), { ssr: false });

const stripePromise = loadStripe(process.env.NX_PUBLIC_STRIPE_PUBLISHABLE_KEY);

export function Checkout() {

    const getCheckout = async () => {
        const response = await httpClient().postAsync("https://rvmcycsydbodgzncjn2e5zfjsq0ghjyq.lambda-url.us-east-1.on.aws/", {method: "get"});

        console.log(response);
    }

    const handleCheckout = async () => {
        try {
            const stripe = await stripePromise;
            const response: any = await httpClient().postAsync("https://rvmcycsydbodgzncjn2e5zfjsq0ghjyq.lambda-url.us-east-1.on.aws/", {method: "getSessionId"});
            console.log(response);
            const { sessionId } = await response;
            const { error } = await stripe.redirectToCheckout({
                sessionId,
            });

            if (error) {
                console.log("Error at checkout");
            }
        } catch (err: any) {
            console.log("Error in creating checkout session: ", err);
        }
    }

    useEffect(() => {
        console.log(process.env.NX_PUBLIC_STRIPE_PUBLISHABLE_KEY);
    });

    return (
        <div className={styles.container}>
            <section className={styles.page}>
                <h1 className={styles.h1Text}>Checkout</h1>
                <button onClick={handleCheckout}>Buy Now</button>
            </section>
            <Footer />
            
        </div>
    );
}

export default Checkout;
