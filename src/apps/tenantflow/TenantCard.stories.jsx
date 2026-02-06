import { fn, expect, userEvent, within } from 'storybook/test';
import TenantCard from './components/TenantCard';
import { TenantFlowDecorator } from './decorators';
import {
  mockTenants,
  mockTenantDetails,
  mockTenantMetrics,
} from './mocks/data';

const meta = {
  title: 'TenantFlow/TenantCard',
  component: TenantCard,
  decorators: [TenantFlowDecorator],
  parameters: {
    layout: 'padded',
    backgrounds: { default: 'Dark' },
  },
  argTypes: {
    tenant: { control: 'object' },
    isExpanded: { control: 'boolean' },
    loading: { control: 'boolean' },
    details: { control: 'object' },
    metrics: { control: 'object' },
  },
  args: {
    onToggle: fn(),
    onDeleted: fn(),
    onRefresh: fn(),
    onEnableDatabase: fn(),
  },
};

export default meta;

/** Collapsed card showing tenant summary with Active status. */
export const Collapsed = {
  args: {
    tenant: mockTenants.active,
    isExpanded: false,
  },
};

/** Expanded card with full deployment details, ingresses, database, services, and metrics. */
export const ExpandedWithDetails = {
  args: {
    tenant: mockTenants.active,
    isExpanded: true,
    details: mockTenantDetails.withDeployments,
    metrics: mockTenantMetrics.healthy,
  },
};

/** Expanded card with running deployments and mixed pod statuses. */
export const WithDeploymentsRunning = {
  args: {
    tenant: mockTenants.pending,
    isExpanded: true,
    details: mockTenantDetails.withDatabaseError,
    metrics: mockTenantMetrics.mixed,
  },
};

/** Expanded card with a configured and connected database. */
export const WithDatabaseEnabled = {
  args: {
    tenant: mockTenants.active,
    isExpanded: true,
    details: mockTenantDetails.withDeployments,
    metrics: mockTenantMetrics.healthy,
  },
};

/** Expanded card in loading state while fetching tenant details. */
export const Loading = {
  args: {
    tenant: mockTenants.active,
    isExpanded: true,
    loading: true,
  },
};

/** Collapsed card with Pending status. */
export const PendingStatus = {
  args: {
    tenant: mockTenants.pending,
    isExpanded: false,
  },
};

/** Collapsed card with Failed status. */
export const FailedStatus = {
  args: {
    tenant: mockTenants.failed,
    isExpanded: false,
  },
};

/** Expanded card with no deployments, showing the empty state. */
export const NoDeployments = {
  args: {
    tenant: mockTenants.noDeployments,
    isExpanded: true,
    details: mockTenantDetails.empty,
    metrics: null,
  },
};

/** Expanded card showing database not configured, with Enable Database button. */
export const DatabaseNotConfigured = {
  args: {
    tenant: mockTenants.newTenant,
    isExpanded: true,
    details: mockTenantDetails.noDatabase,
    metrics: mockTenantMetrics.healthy,
  },
};

/**
 * Interaction test: clicking the header triggers onToggle,
 * simulating expanding the card.
 */
export const ToggleInteraction = {
  args: {
    tenant: mockTenants.active,
    isExpanded: false,
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);

    // Find the tenant name heading and click its parent header
    const heading = canvas.getByText('tenant-educationelly');
    await expect(heading).toBeInTheDocument();

    // Click the header area to toggle expansion
    await userEvent.click(heading);
    await expect(args.onToggle).toHaveBeenCalledOnce();
  },
};

/**
 * Interaction test: clicking Delete Tenant triggers onDeleted callback.
 */
export const DeleteInteraction = {
  args: {
    tenant: mockTenants.active,
    isExpanded: true,
    details: mockTenantDetails.withDeployments,
    metrics: mockTenantMetrics.healthy,
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);

    const deleteButton = canvas.getByRole('button', { name: /delete tenant/i });
    await expect(deleteButton).toBeInTheDocument();

    await userEvent.click(deleteButton);
    await expect(args.onDeleted).toHaveBeenCalledOnce();
  },
};
