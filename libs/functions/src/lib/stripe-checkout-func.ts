import { GetSecretValueCommand, SecretsManagerClient } from "@aws-sdk/client-secrets-manager";
import { HttpRequestEventVariations, createHttpEventRouter } from "@iyio/common";
import { buffer } from "micro";
import Stripe from "stripe";

const debugging = true;

export const handler = createHttpEventRouter({
    cors: false,
    returnsHttpResponse: true
}, {
    POST: async (_, data: any, rawAwsEvent: HttpRequestEventVariations): Promise<any> => {
        log("in stripe-checkout func");

        log("body");
        log(data);

        log("rawAwsEvent");
        log(rawAwsEvent);

        let statusCode;

        const sig = JSON.parse(JSON.stringify(rawAwsEvent)).headers['stripe-signature'];
        log(sig);
        
        const clientSecretManager = new SecretsManagerClient({
            region: "us-east-1",
        });

        const stripePublishableKey = "stripePublishableKey";
        const stripeSecretKey = "stripeSecretKey";
        const stripeWebhookSecret = "stripeWebhookSecret";

        const stripePublishableKeyResponse = await clientSecretManager.send(
            new GetSecretValueCommand({
                SecretId: stripePublishableKey,
            })
        );
        const stripePublishableKeyAsString = stripePublishableKeyResponse.SecretString;

        const stripeSecretKeyResponse = await clientSecretManager.send(
            new GetSecretValueCommand({
                SecretId: stripeSecretKey,
            })
        );
        const stripeSecretKeyAsString = stripeSecretKeyResponse.SecretString;
        if (!stripePublishableKeyAsString || !stripeSecretKeyAsString) {
            console.error("From stripe-checkout-func: Error retrieving credentials");
            const returnBody: Result = {
                error: true,
                message: "Error on checkout"
            };
            statusCode = 200;
            return {
                statusCode,
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Headers":
                        "Accept,Content-Type,X-Amz-Date,Authorization,X-Api-Key",
                    "Access-Control-Allow-Methods":
                        "GET,POST,DELETE",
                    "Access-Control-Max-Age": 86400,
                    "Access-Control-Allow-Credentials": true,
                    Server: "Helios",
                },
                body: JSON.stringify(returnBody)
            };
        }

        const stripe = new Stripe(stripeSecretKeyAsString, {
            apiVersion: "2023-10-16"
        });

        let event;

        if (sig) {
            const stripeWebhookSecretResponse = await clientSecretManager.send(
                new GetSecretValueCommand({
                    SecretId: stripeWebhookSecret,
                })
            );
            const stripeWebhookSecretAsString = stripeWebhookSecretResponse.SecretString;
            if (!stripeWebhookSecretAsString) {
                console.error("From stripe-checkout-func: Error retrieving webhook secret");
                statusCode = 400;
                return {
                    statusCode,
                    headers: {
                        "Content-Type": "application/json",
                        "Access-Control-Allow-Headers":
                            "Accept,Content-Type,X-Amz-Date,Authorization,X-Api-Key",
                        "Access-Control-Allow-Methods":
                            "GET,POST,DELETE",
                        "Access-Control-Max-Age": 86400,
                        "Access-Control-Allow-Credentials": true,
                        Server: "Helios",
                    },
                    body: "Error retrieving webhook secret"
                };
            }
            const buf = Buffer.from(JSON.stringify(data));
            log("raw body");
            log(rawAwsEvent.body);
            try {
                event = stripe.webhooks.constructEvent(rawAwsEvent.body, sig, stripeWebhookSecretAsString);
            } catch (err: any) {
                console.error(`From stripe-checkout-func, webhook signature verification failed: ${err.message}`);
                statusCode = 400;
                return {
                    statusCode,
                    headers: {
                        "Content-Type": "application/json",
                        "Access-Control-Allow-Headers":
                            "Accept,Content-Type,X-Amz-Date,Authorization,X-Api-Key",
                        "Access-Control-Allow-Methods":
                            "GET,POST,DELETE",
                        "Access-Control-Max-Age": 86400,
                        "Access-Control-Allow-Credentials": true,
                        Server: "Helios",
                    },
                    body: `Webhook signature verification failed: ${err.message}`
                };
            }

            log("here");
            log("event");
            log(event);

            switch (event.type) {
                case 'checkout.session.completed':
                    // eslint-disable-next-line no-case-declarations
                    const session = event.data.object;
                    console.log(`Payment successful for session ID: ${session.id}`);
                    break;
            }

            statusCode = 200;
            return {
                statusCode,
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Headers":
                        "Accept,Content-Type,X-Amz-Date,Authorization,X-Api-Key",
                    "Access-Control-Allow-Methods":
                        "GET,POST,DELETE",
                    "Access-Control-Max-Age": 86400,
                    "Access-Control-Allow-Credentials": true,
                    Server: "Helios",
                }
            };
        }

        try {
            const session = await stripe.checkout.sessions.create({
                customer_email: "ben.c.scheib@gmail.com",
                billing_address_collection: "auto",
                line_items: [
                    {
                        price: "price_1O3LoJGU1GRwUkRtnf04MeKz",
                        quantity: 1
                    }
                ],
                mode: "subscription",
                automatic_tax: {enabled: true },
                success_url: "https://www.crucialwebsolutions.com/about",
                cancel_url: "https://www.crucialwebsolutions.com/contact"
            });

            const returnBody: Result = {
                error: false,
                message: "Good",
                sessionId: session.id
            };
            statusCode = 200;
            return {
                statusCode,
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Headers":
                        "Accept,Content-Type,X-Amz-Date,Authorization,X-Api-Key",
                    "Access-Control-Allow-Methods":
                        "GET,POST,DELETE",
                    "Access-Control-Max-Age": 86400,
                    "Access-Control-Allow-Credentials": true,
                    Server: "Helios",
                },
                body: JSON.stringify(returnBody)
            };
        } catch (err: any) {

            log(err);
            const returnBody: Result = {
                error: true,
                message: "Error creating checkout session"
            };
            statusCode = 200;
            return {
                statusCode,
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Headers":
                        "Accept,Content-Type,X-Amz-Date,Authorization,X-Api-Key",
                    "Access-Control-Allow-Methods":
                        "GET,POST,DELETE",
                    "Access-Control-Max-Age": 86400,
                    "Access-Control-Allow-Credentials": true,
                    Server: "Helios",
                },
                body: JSON.stringify(returnBody)
            };
        }

        const returnBody: Result = {
            error: false,
            message: "Good"
        };
        statusCode = 200;
        return {
            statusCode,
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Headers":
                    "Accept,Content-Type,X-Amz-Date,Authorization,X-Api-Key",
                "Access-Control-Allow-Methods":
                    "GET,POST,DELETE",
                "Access-Control-Max-Age": 86400,
                "Access-Control-Allow-Credentials": true,
                Server: "Helios",
            },
            body: JSON.stringify(returnBody)
        };
    }
});

const log = (message: any) => {
    if (debugging) {
        console.log(message);
    }
}

interface ImportCommand {
    method?: string;
}

interface Result {
    error: boolean;
    message: string;
    sessionId?: any;
}