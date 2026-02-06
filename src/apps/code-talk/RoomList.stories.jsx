import { fn, expect, userEvent, within } from 'storybook/test';
import { Meta } from '@storybook/addon-docs/blocks';
import RoomList from './components/RoomList';
import { CodeTalkDecorator } from './decorators';
import { mockRooms } from './mocks/data';

export default {
  title: 'Code Talk/RoomList',
  component: RoomList,
  decorators: [CodeTalkDecorator],
};

export const Default = {
  args: {
    rooms: mockRooms,
    onRoomSelect: fn(),
    onRoomDelete: fn(),
  },
};

export const WithActiveRoom = {
  args: {
    rooms: mockRooms,
    activeRoomId: mockRooms[0].id,
    onRoomSelect: fn(),
    onRoomDelete: fn(),
  },
};

export const Empty = {
  args: {
    rooms: [],
    onRoomSelect: fn(),
  },
};

export const SelectRoom = {
  args: {
    rooms: mockRooms,
    onRoomSelect: fn(),
    onRoomDelete: fn(),
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const firstRoom = canvas.getByTestId(`room-${mockRooms[0].id}`);
    await userEvent.click(firstRoom);
    await expect(args.onRoomSelect).toHaveBeenCalledWith(mockRooms[0].id);
  },
};
