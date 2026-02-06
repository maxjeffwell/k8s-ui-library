import { fn, expect, userEvent, within } from 'storybook/test';
import DeploymentControls from './components/DeploymentControls';
import { TenantFlowDecorator } from './decorators';

const meta = {
  title: 'TenantFlow/DeploymentControls',
  component: DeploymentControls,
  decorators: [TenantFlowDecorator],
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    backgrounds: { default: 'Dark' },
  },
  argTypes: {
    tenantName: { control: 'text' },
    lockedAppType: {
      control: 'select',
      options: [
        undefined,
        'educationelly',
        'educationelly-graphql',
        'code-talk',
        'bookmarked',
        'intervalai',
      ],
    },
  },
  args: {
    tenantName: 'tenant-educationelly',
    onDeploy: fn(),
  },
};

export default meta;

/** Default state with all application types available for selection. */
export const Default = {
  args: {
    tenantName: 'tenant-new',
  },
};

/** App type is locked to a specific tenant configuration. The select dropdown is disabled. */
export const WithLockedAppType = {
  args: {
    tenantName: 'tenant-educationelly',
    lockedAppType: 'educationelly-graphql',
  },
};

/** Locked to Code Talk configuration, showing PostgreSQL + Redis database label. */
export const LockedCodeTalk = {
  args: {
    tenantName: 'tenant-codetalk',
    lockedAppType: 'code-talk',
  },
};

/** Locked to Bookmarked configuration, showing Neon DB database label. */
export const LockedBookmarked = {
  args: {
    tenantName: 'tenant-bookmarked',
    lockedAppType: 'bookmarked',
  },
};

/**
 * Interaction test: fills out the form and clicks Deploy Application.
 * Verifies the onDeploy callback is invoked.
 */
export const DeployInteraction = {
  args: {
    tenantName: 'tenant-demo',
    onDeploy: fn(async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }),
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);

    // Verify the deploy button exists
    const deployButton = canvas.getByRole('button', { name: /deploy application/i });
    await expect(deployButton).toBeInTheDocument();
    await expect(deployButton).not.toBeDisabled();

    // Click deploy (the form fields already have defaults populated)
    await userEvent.click(deployButton);
    await expect(args.onDeploy).toHaveBeenCalledOnce();
  },
};

/**
 * Simulates a deploy failure by having onDeploy throw an error.
 * The error message should appear in the component.
 */
export const DeployError = {
  args: {
    tenantName: 'tenant-failing',
    onDeploy: fn(async () => {
      throw new Error('Deployment failed: insufficient resources. CPU limit exceeded for namespace tenant-failing.');
    }),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const deployButton = canvas.getByRole('button', { name: /deploy application/i });
    await userEvent.click(deployButton);

    // Wait for the error message to appear
    const errorMessage = await canvas.findByText(/deployment failed/i);
    await expect(errorMessage).toBeInTheDocument();
  },
};
