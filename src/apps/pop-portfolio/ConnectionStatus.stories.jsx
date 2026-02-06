import { Meta } from '@storybook/addon-docs/blocks';
import ConnectionStatus from './components/ConnectionStatus';
import { PopPortfolioDecorator } from './decorators';

export default {
  title: 'Pop!_Portfolio/ConnectionStatus',
  component: ConnectionStatus,
  decorators: [PopPortfolioDecorator],
  tags: ['autodocs'],
};

export const Connected = {
  args: { status: 'connected' },
};

export const Connecting = {
  args: { status: 'connecting' },
};

export const Disconnected = {
  args: { status: 'disconnected' },
};

export const Reconnecting = {
  args: { status: 'reconnecting' },
};
