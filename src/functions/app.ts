import { App, AwsLambdaReceiver } from '@slack/bolt';
import { AwsHandler } from '@slack/bolt/dist/receivers/AwsLambdaReceiver';
import { messageHandlers } from '../handlers/message';
import { commandHandlers } from '../handlers/command';
import { viewHandlers } from '../handlers/view';

const awsLambdaReceiver = new AwsLambdaReceiver({
  signingSecret: process.env.SLACK_SIGNING_SECRET,
});

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  receiver: awsLambdaReceiver,
});

messageHandlers.forEach(([event, handlers]) => {
  app.message(event, ...handlers);
});

commandHandlers.forEach(([event, handlers]) => {
  app.command(event, ...handlers);
});

viewHandlers.forEach(([event, handlers]) => {
  app.view(event, ...handlers);
});

const handler: AwsHandler = async (event, context, callback) => {
  const handler = await awsLambdaReceiver.start();
  return handler(event, context, callback);
};

module.exports = { handler };
