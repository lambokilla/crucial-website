import { createHttpEventRouter } from "@iyio/common";
import { SNSClient, PublishCommand } from "@aws-sdk/client-sns";


const debugging = true;

export const handler = createHttpEventRouter({
    cors: false,
}, {
    POST: async (_, data?: ImportCommand): Promise<Result> => {
        log("in contact func");

        log(data);

        const message = `Name: ${data?.name}\nCompany Name: ${data?.companyName}\nPhone: ${data?.phone}\nEmail: ${data?.email}\nDescription: ${data?.description}`;

        log("message");
        log(message);

        const client = new SNSClient();

        const response = await client.send(new PublishCommand({
            TopicArn: "arn:aws:sns:us-east-1:429545868060:CrucialWebsiteStack-contactTopicCEC21DC8-5OcX7q2J6oMG",
            Subject: "New Message from Website",
            Message: message
        }));

        log(response);

        return {
            error: false,
            message: "Sent!"
        };
    }
});

const log = (message: any) => {
    if (debugging) {
        console.log(message);
    }
}

interface ImportCommand {
    method: string;
    name: string;
    companyName?: string;
    email: string;
    phone?: string;
    description: string;
}

interface Result {
    error: boolean;
    message: string;
}