import { Middleware, SlackEventMiddlewareArgs, SlackViewMiddlewareArgs } from '@slack/bolt';
import { SlackCommandMiddlewareArgs } from '@slack/bolt/dist/types/command';

export type HandlerGroup<T = string> = [T, Middleware<any>[]];

export type MessageEventMiddleware = Middleware<SlackEventMiddlewareArgs<'message'>>;
export type CommandEventMiddleware = Middleware<SlackCommandMiddlewareArgs>;
export type ViewEventMiddleware = Middleware<SlackViewMiddlewareArgs>;
