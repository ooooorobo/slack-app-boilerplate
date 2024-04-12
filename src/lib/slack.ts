import { LogLevel, WebClient } from '@slack/web-api';

const client = new WebClient(process.env.SLACK_BOT_TOKEN, {
    logLevel: LogLevel.DEBUG,
});

export const publishMessage = async (id: string, text: string, avatar?: string) => {
    try {
        await client.chat.postMessage({
            channel: id,
            text: text,
            icon_url: avatar,
        });
    } catch (error) {
        console.error(error);
    }
};

export const publishDirectMessage = async (userId: string, text: string) => {
    try {
        const response = await client.conversations.open({ users: userId });
        const dmChannelId = response.channel.id;
        await publishMessage(dmChannelId, text);
    } catch (error) {
        console.error(error);
    }
};

type SlackMember = {
    id?: string;
    real_name?: string;
    profile?: {
        image_192?: string;
    };
    is_bot?: boolean;
};
export const fetchUserList = async (): Promise<SlackMember[]> => {
    const userList: SlackMember[] = [];
    let cursor = '';
    do {
        const response = await client.users.list({ limit: 200, ...(cursor && { cursor }) });
        cursor = response.response_metadata.next_cursor;
        userList.push(...response.members);
    } while (cursor);
    return userList;
};
