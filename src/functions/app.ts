import {App, AwsLambdaReceiver} from "@slack/bolt";
import {AwsHandler} from "@slack/bolt/dist/receivers/AwsLambdaReceiver";

const awsLambdaReceiver = new AwsLambdaReceiver({
    signingSecret: process.env.SIGNING_SECRET,
});

const app = new App({
    token: process.env.SLACK_BOT_TOKEN,
    receiver: awsLambdaReceiver,
});

const handler: AwsHandler = async (event, context, callback) => {
    const handler = await awsLambdaReceiver.start();
    return handler(event, context, callback);
};

module.exports = { handler };
