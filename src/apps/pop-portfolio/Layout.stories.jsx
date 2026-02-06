import { fn, expect, userEvent, within } from 'storybook/test';
import { Meta } from '@storybook/addon-docs/blocks';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Layout from './components/Layout';
import { PopPortfolioLayoutDecorator } from './decorators';
import { mockNavItems, mockExternalApps, mockNotifications } from './mocks/data';

export default {
  title: 'Pop!_Portfolio/Layout',
  component: Layout,
  decorators: [PopPortfolioLayoutDecorator],
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
};

const DashboardContent = () => (
  <Box>
    <Typography variant="h4" gutterBottom>Dashboard</Typography>
    <Typography color="text.secondary">
      Welcome to the Pop!_Portfolio Kubernetes Dashboard. Monitor your cluster resources,
      deployments, and AI-powered analytics.
    </Typography>
  </Box>
);

export const Default = {
  args: {
    navItems: mockNavItems,
    externalApps: mockExternalApps,
    activePath: '/',
    connectionStatus: 'connected',
    notifications: mockNotifications,
    unreadCount: 3,
    onNavigate: fn(),
    onLogout: fn(),
    onNotificationAction: fn(),
    children: <DashboardContent />,
  },
};

export const DisconnectedState = {
  args: {
    ...Default.args,
    connectionStatus: 'disconnected',
    children: <DashboardContent />,
    onNavigate: fn(),
    onLogout: fn(),
    onNotificationAction: fn(),
  },
};

export const PodsPage = {
  args: {
    ...Default.args,
    activePath: '/pods',
    children: (
      <Box>
        <Typography variant="h4" gutterBottom>Pods</Typography>
        <Typography color="text.secondary">Viewing pod resources in the cluster.</Typography>
      </Box>
    ),
    onNavigate: fn(),
    onLogout: fn(),
    onNotificationAction: fn(),
  },
};

export const NavigateToPage = {
  args: {
    ...Default.args,
    children: <DashboardContent />,
    onNavigate: fn(),
    onLogout: fn(),
    onNotificationAction: fn(),
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const podsNav = canvas.getByTestId('nav-pods');
    await userEvent.click(podsNav);
    await expect(args.onNavigate).toHaveBeenCalledWith('/pods');
  },
};
