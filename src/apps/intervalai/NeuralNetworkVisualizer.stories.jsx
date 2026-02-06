import { Meta } from '@storybook/addon-docs/blocks';
import NeuralNetworkVisualizer from './components/NeuralNetworkVisualizer';
import { IntervalAIDecorator } from './decorators';
import { mockActivations, mockFeatureNames } from './mocks/data';

export default {
  title: 'IntervalAI/NeuralNetworkVisualizer',
  component: NeuralNetworkVisualizer,
  decorators: [IntervalAIDecorator],
  tags: ['autodocs'],
};

export const Default = {
  args: {
    activations: mockActivations,
    featureNames: mockFeatureNames,
  },
};

export const HighActivation = {
  args: {
    activations: [
      Array.from({ length: 51 }, () => [0.9 + Math.random() * 0.1]),
      Array.from({ length: 32 }, () => [0.7 + Math.random() * 0.3]),
      Array.from({ length: 16 }, () => [0.8 + Math.random() * 0.2]),
      [[0.95]],
    ],
    featureNames: mockFeatureNames,
  },
};

export const LowActivation = {
  args: {
    activations: [
      Array.from({ length: 51 }, () => [-0.8 + Math.random() * 0.3]),
      Array.from({ length: 32 }, () => [-0.5 + Math.random() * 0.4]),
      Array.from({ length: 16 }, () => [-0.3 + Math.random() * 0.3]),
      [[0.12]],
    ],
    featureNames: mockFeatureNames,
  },
};
