import { fn, expect, within, userEvent } from 'storybook/test';
import ChatBubble from './components/ChatBubble';
import { EducationELLyDecorator } from './decorators';
import { mockChatMessages } from './mocks/data';

const meta = {
  title: 'educationELLy/ChatBubble',
  component: ChatBubble,
  decorators: [EducationELLyDecorator],
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
    const chatBtn = canvas.getByText('💬');
    await userEvent.click(chatBtn);
    await expect(canvas.getByText(/AI teaching assistant/)).toBeInTheDocument();
  },
};

export const WithMessages = {
  args: { initialMessages: mockChatMessages },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByText('💬'));
    await expect(canvas.getByText(/Beginning level ELL students/)).toBeInTheDocument();
  },
};
