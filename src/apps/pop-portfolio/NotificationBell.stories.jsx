import { fn, expect, userEvent, within } from 'storybook/test';
import { Meta } from '@storybook/addon-docs/blocks';
import NotificationBell from './components/NotificationBell';
import { PopPortfolioDecorator } from './decorators';
import { mockNotifications } from './mocks/data';

export default {
  title: 'Pop!_Portfolio/NotificationBell',
  component: NotificationBell,
  decorators: [PopPortfolioDecorator],
  tags: ['autodocs'],
};

export const NoNotifications = {
  args: {
    notifications: [],
    unreadCount: 0,
    onMarkAsRead: fn(),
    onDelete: fn(),
    onClearAll: fn(),
  },
};

export const WithNotifications = {
  args: {
    notifications: mockNotifications,
    unreadCount: 3,
    onMarkAsRead: fn(),
    onDelete: fn(),
    onClearAll: fn(),
  },
};

export const ManyUnread = {
  args: {
    notifications: mockNotifications,
    unreadCount: 42,
    onMarkAsRead: fn(),
    onDelete: fn(),
    onClearAll: fn(),
  },
};

export const OpenAndInteract = {
  args: {
    notifications: mockNotifications,
    unreadCount: 3,
    onMarkAsRead: fn(),
    onDelete: fn(),
    onClearAll: fn(),
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const bell = canvas.getByTestId('notification-bell');
    await userEvent.click(bell);
    // Popover should now be open - click first notification
    const firstNotification = await canvas.findByTestId(`notification-${mockNotifications[0].id}`);
    await userEvent.click(firstNotification);
    await expect(args.onMarkAsRead).toHaveBeenCalledWith(mockNotifications[0].id);
  },
};
