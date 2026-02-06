import WorkflowCard from './components/WorkflowCard';
import { PodRickDecorator } from './decorators';
import { mockWorkflows } from './mocks/data';

const meta = {
  title: 'PodRick/WorkflowCard',
  component: WorkflowCard,
  decorators: [PodRickDecorator],
  parameters: {
    layout: 'centered',
    backgrounds: { default: 'Dark' },
  },
};

export default meta;

export const BuildDeploy = {
  args: {
    workflow: mockWorkflows.buildDeploy,
  },
};

export const TestSuite = {
  args: {
    workflow: mockWorkflows.test,
  },
};

export const Disabled = {
  args: {
    workflow: mockWorkflows.disabled,
  },
};
