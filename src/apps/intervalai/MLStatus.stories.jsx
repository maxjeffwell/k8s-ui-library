import { Meta } from '@storybook/addon-docs/blocks';
import MLStatus from './components/MLStatus';
import { IntervalAIDecorator } from './decorators';
import { mockMLInfo, mockMLInfoWebGL, mockMLInfoLoading } from './mocks/data';

export default {
  title: 'IntervalAI/MLStatus',
  component: MLStatus,
  decorators: [IntervalAIDecorator],
};

export const WebGPU = {
  args: { mlInfo: mockMLInfo },
};

export const WebGL = {
  args: { mlInfo: mockMLInfoWebGL },
};

export const Loading = {
  args: { mlInfo: mockMLInfoLoading },
};
