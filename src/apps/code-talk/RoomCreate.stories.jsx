import { fn, expect, userEvent, within } from 'storybook/test';
import RoomCreate from './components/RoomCreate';
import { CodeTalkDecorator } from './decorators';

export default {
  title: 'Code Talk/RoomCreate',
  component: RoomCreate,
  decorators: [CodeTalkDecorator],
};

export const Default = {
  args: {
    onCreate: fn(),
  },
};

export const WithError = {
  args: {
    onCreate: fn(),
    error: 'Room title already exists. Please choose a different name.',
  },
};

export const CreateRoom = {
  args: {
    onCreate: fn(),
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByTestId('room-title-input');
    const button = canvas.getByTestId('create-room-btn');
    await userEvent.type(input, 'My New Room');
    await userEvent.click(button);
    await expect(args.onCreate).toHaveBeenCalledWith('My New Room');
  },
};
