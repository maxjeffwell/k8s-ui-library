import { fn, expect, userEvent, within } from 'storybook/test';
import Navigation from './components/Navigation';
import { TenantFlowDecorator } from './decorators';

const meta = {
  title: 'TenantFlow/Navigation',
  component: Navigation,
  decorators: [
    // Override the default light decorator with a minimal wrapper
    // since Navigation has its own gradient background
    (Story) => (
      <div style={{ fontFamily: "system-ui, Avenir, Helvetica, Arial, sans-serif" }}>
        <Story />
      </div>
    ),
  ],
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    backgrounds: { default: 'Dark' },
  },
  argTypes: {
    activePage: {
      control: 'select',
      options: ['dashboard', 'analytics'],
    },
  },
  args: {
    onNavigate: fn(),
  },
};

export default meta;

/** Navigation with Dashboard tab active. */
export const DashboardActive = {
  args: {
    activePage: 'dashboard',
  },
};

/** Navigation with Analytics tab active. */
export const AnalyticsActive = {
  args: {
    activePage: 'analytics',
  },
};

/**
 * Interaction test: clicking the Analytics link calls onNavigate
 * with 'analytics' as the argument.
 */
export const NavigationInteraction = {
  args: {
    activePage: 'dashboard',
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);

    const analyticsLink = canvas.getByText('Analytics');
    await expect(analyticsLink).toBeInTheDocument();

    await userEvent.click(analyticsLink);
    await expect(args.onNavigate).toHaveBeenCalledWith('analytics');
  },
};
