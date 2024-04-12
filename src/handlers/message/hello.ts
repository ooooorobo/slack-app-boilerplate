import { GenericMessageEvent } from '@slack/bolt';
import { HandlerGroup, MessageEventMiddleware } from '../type';

const helloHandler: MessageEventMiddleware = async ({ message, say }) => {
  await say({
    blocks: [
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `Hey there <@${(message as GenericMessageEvent).user}>!`,
        },
        accessory: {
          type: 'button',
          text: {
            type: 'plain_text',
            text: 'Click Me',
          },
          action_id: 'button_click',
        },
      },
    ],
    text: `Hey there <@${(message as GenericMessageEvent).user}>!`,
  });
};

export const helloMessageHandlerGroup = ['hello', [helloHandler]] satisfies HandlerGroup;
