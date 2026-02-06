import { expect, within } from 'storybook/test';
import PipelineTimeline from './components/PipelineTimeline';
import { PodRickDecorator } from './decorators';
import { mockPipelineRuns } from './mocks/data';

const meta = {
  title: 'PodRick/PipelineTimeline',
  component: PipelineTimeline,
  decorators: [PodRickDecorator],
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    backgrounds: { default: 'Dark' },
  },
};

export default meta;

export const WithRuns = {
  args: {
    runs: mockPipelineRuns,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(canvas.getByText('Build and Deploy FireBook')).toBeInTheDocument();
    await expect(canvas.getByText('Build and Deploy Bookmarked')).toBeInTheDocument();

    const successBadge = canvas.getByText('success');
    await expect(successBadge).toBeInTheDocument();

    const failureBadge = canvas.getByText('failure');
    await expect(failureBadge).toBeInTheDocument();
  },
};

export const Empty = {
  args: {
    runs: [],
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('No pipeline runs found')).toBeInTheDocument();
  },
};

export const SingleSuccess = {
  args: {
    runs: [mockPipelineRuns[0]],
  },
};

export const InProgress = {
  args: {
    runs: [mockPipelineRuns[1]],
  },
};
