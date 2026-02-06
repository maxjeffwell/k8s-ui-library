import { fn } from 'storybook/test';
import MetricsCharts from './components/MetricsCharts';
import { TenantFlowDarkDecorator } from './decorators';
import { mockMetricsData, mockTimeSeries } from './mocks/data';

const meta = {
  title: 'TenantFlow/MetricsCharts',
  component: MetricsCharts,
  decorators: [TenantFlowDarkDecorator],
  parameters: {
    layout: 'fullscreen',
    backgrounds: { default: 'Dark' },
  },
  argTypes: {
    tenantName: { control: 'text' },
    loading: { control: 'boolean' },
    error: { control: 'text' },
  },
  args: {
    tenantName: 'tenant-educationelly',
    onRefresh: fn(),
    onRetry: fn(),
  },
};

export default meta;

/**
 * Full metrics dashboard with all summary cards, CPU/memory time-series
 * charts, pod status doughnut, and network I/O bar chart.
 */
export const WithFullMetrics = {
  args: {
    metrics: mockMetricsData.full,
    timeSeries: mockTimeSeries.full,
  },
};

/**
 * Degraded metrics showing high latency, error rates, and failing pods.
 * The error rate card highlights in red to indicate issues.
 */
export const DegradedMetrics = {
  args: {
    metrics: mockMetricsData.degraded,
    timeSeries: mockTimeSeries.full,
  },
};

/** Loading state displayed while metrics are being fetched. */
export const LoadingState = {
  args: {
    loading: true,
    metrics: null,
    timeSeries: null,
  },
};

/** Error state shown when the metrics API fails, with a Retry button. */
export const ErrorState = {
  args: {
    loading: false,
    error: 'Failed to load metrics. The Prometheus endpoint at /api/v1/query returned HTTP 503. Please check that the monitoring stack is deployed and accessible.',
    metrics: null,
    timeSeries: null,
  },
};

/**
 * Metrics with summary cards only, no time-series data available.
 * Charts section is empty but summary cards render normally.
 */
export const SummaryOnly = {
  args: {
    metrics: mockMetricsData.full,
    timeSeries: null,
  },
};

/** No metrics available at all -- shows the empty state message. */
export const NoMetrics = {
  args: {
    loading: false,
    metrics: null,
    timeSeries: null,
  },
};
