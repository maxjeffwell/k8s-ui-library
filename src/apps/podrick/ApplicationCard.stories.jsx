import { fn, expect, userEvent, within } from 'storybook/test';
import ApplicationCard from './components/ApplicationCard';
import { PodRickDecorator } from './decorators';
import { mockApplications } from './mocks/data';

const meta = {
  title: 'PodRick/ApplicationCard',
  component: ApplicationCard,
  decorators: [PodRickDecorator],
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    backgrounds: { default: 'Dark' },
  },
  argTypes: {
    app: { control: 'object' },
  },
  args: {
    onSync: fn(),
  },
};

export default meta;

export const Healthy = {
  args: {
    app: mockApplications.healthy,
  },
};

export const Degraded = {
  args: {
    app: mockApplications.degraded,
  },
};

export const Progressing = {
  args: {
    app: mockApplications.progressing,
  },
};

export const Unknown = {
  args: {
    app: mockApplications.unknown,
  },
};

export const NoGitHub = {
  args: {
    app: mockApplications.noGithub,
  },
};

export const SyncInteraction = {
  args: {
    app: mockApplications.healthy,
    onSync: fn(async () => {
      await new Promise((resolve) => setTimeout(resolve, 1500));
    }),
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);

    const syncButton = canvas.getByRole('button', { name: /sync/i });
    await expect(syncButton).toBeInTheDocument();
    await expect(syncButton).not.toBeDisabled();

    await userEvent.click(syncButton);
    await expect(args.onSync).toHaveBeenCalledOnce();
  },
};
