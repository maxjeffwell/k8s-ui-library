import { fn } from 'storybook/test';
import RoomGrid from './components/RoomGrid';
import { CodeTalkGridDecorator } from './decorators';
import { mockMessages, mockCode } from './mocks/data';

export default {
  title: 'Code Talk/RoomGrid',
  component: RoomGrid,
  decorators: [CodeTalkGridDecorator],
};

export const Default = {
  args: {
    messages: mockMessages,
    code: mockCode,
    roomTitle: 'Code Room',
    currentUserId: '1',
    onSendMessage: fn(),
    onCodeChange: fn(),
  },
};

export const WithTypingUser = {
  args: {
    messages: mockMessages,
    code: mockCode,
    roomTitle: 'Pair Programming',
    currentUserId: '1',
    typingUser: 'alice',
    onSendMessage: fn(),
    onCodeChange: fn(),
  },
};

export const EmptyRoom = {
  args: {
    messages: [],
    code: '',
    roomTitle: 'New Session',
    currentUserId: '1',
    onSendMessage: fn(),
    onCodeChange: fn(),
  },
};
