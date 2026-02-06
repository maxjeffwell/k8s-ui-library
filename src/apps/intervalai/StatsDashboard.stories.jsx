import { Meta } from '@storybook/addon-docs/blocks';
import StatsDashboard from './components/StatsDashboard';
import { IntervalAIDecorator } from './decorators';
import { mockComparisonData, mockProgressData } from './mocks/data';

export default {
  title: 'IntervalAI/StatsDashboard',
  component: StatsDashboard,
  decorators: [IntervalAIDecorator],
  tags: ['autodocs'],
};

export const FullDashboard = {
  args: {
    comparisonData: mockComparisonData,
    progressData: mockProgressData,
  },
};

export const ComparisonOnly = {
  args: {
    comparisonData: mockComparisonData,
    progressData: null,
  },
};

export const ProgressOnly = {
  args: {
    comparisonData: null,
    progressData: mockProgressData,
  },
};
