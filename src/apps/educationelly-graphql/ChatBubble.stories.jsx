import { fn, expect, within, userEvent } from 'storybook/test';
import ChatBubble from './components/ChatBubble';
import { ELLyGraphQLDecorator } from './decorators';
import { mockChatMessages } from './mocks/data';

const meta = {
  title: 'educationELLy-GraphQL/ChatBubble',
  component: ChatBubble,
  decorators: [ELLyGraphQLDecorator],
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
};

export default meta;

export const Closed = {
  args: {},
};

export const OpenEmpty = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByText('💬'));
    await expect(canvas.getByText(/GraphQL-powered AI assistant/)).toBeInTheDocument();
  },
};

export const WithConversation = {
  args: { initialMessages: mockChatMessages },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByText('💬'));
    await expect(canvas.getByText(/reclassification progress/)).toBeInTheDocument();
  },
};
