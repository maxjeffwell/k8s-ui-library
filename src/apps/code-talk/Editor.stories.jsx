import { fn, expect, userEvent, within } from 'storybook/test';
import Editor from './components/Editor';
import { CodeTalkEditorDecorator } from './decorators';
import { mockCode } from './mocks/data';

export default {
  title: 'Code Talk/Editor',
  component: Editor,
  decorators: [CodeTalkEditorDecorator],
};

export const Empty = {
  args: {
    initialCode: '',
    connected: true,
    onCodeChange: fn(),
  },
};

export const WithCode = {
  args: {
    initialCode: mockCode,
    connected: true,
    onCodeChange: fn(),
  },
};

export const Disconnected = {
  args: {
    initialCode: mockCode,
    connected: false,
    onCodeChange: fn(),
  },
};

export const TypingIndicator = {
  args: {
    initialCode: mockCode,
    connected: true,
    typingUser: 'alice',
    roomId: 'room-1',
    onCodeChange: fn(),
  },
};

export const ReadOnly = {
  args: {
    initialCode: mockCode,
    connected: true,
    readOnly: true,
  },
};

export const Interactive = {
  args: {
    initialCode: '',
    connected: true,
    onCodeChange: fn(),
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const editor = canvas.getByTestId('code-editor');
    await userEvent.click(editor);
    await userEvent.type(editor, 'console.log("Hello, Code Talk!");');
    await expect(args.onCodeChange).toHaveBeenCalled();
  },
};
