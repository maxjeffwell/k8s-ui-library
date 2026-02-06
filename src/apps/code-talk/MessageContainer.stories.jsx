import { fn, expect, userEvent, within } from 'storybook/test';
import { Meta } from '@storybook/addon-docs/blocks';
import MessageContainer from './components/MessageContainer';
import { CodeTalkDecorator } from './decorators';
import { mockMessages } from './mocks/data';

export default {
  title: 'Code Talk/MessageContainer',
  component: MessageContainer,
  decorators: [CodeTalkDecorator],
  tags: ['autodocs'],
};

export const GlobalChat = {
  args: {
    messages: mockMessages,
    roomTitle: 'Global Chat',
    currentUserId: '1',
    onSendMessage: fn(),
  },
};

export const RoomChat = {
  args: {
    messages: mockMessages.slice(0, 3),
    roomTitle: 'JavaScript Help',
    currentUserId: '1',
    hasMore: true,
    onSendMessage: fn(),
    onLoadMore: fn(),
  },
};

export const EmptyChat = {
  args: {
    messages: [],
    roomTitle: 'New Room',
    onSendMessage: fn(),
  },
};

export const SendMessage = {
  args: {
    messages: mockMessages,
    roomTitle: 'Global Chat',
    currentUserId: '1',
    onSendMessage: fn(),
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByTestId('message-input');
    await userEvent.type(input, 'Hello everyone!');
    const sendBtn = canvas.getByTestId('send-btn');
    await userEvent.click(sendBtn);
    await expect(args.onSendMessage).toHaveBeenCalledWith('Hello everyone!');
  },
};
