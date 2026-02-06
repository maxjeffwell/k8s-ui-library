import LoadingSpinner from './components/LoadingSpinner';
import { EducationELLyDecorator } from './decorators';

const meta = {
  title: 'educationELLy/LoadingSpinner',
  component: LoadingSpinner,
  decorators: [EducationELLyDecorator],
  parameters: { layout: 'fullscreen' },
};

export default meta;

export const Default = {
  args: {},
  decorators: [(Story) => <div style={{ height: '300px', position: 'relative' }}><Story /></div>],
};

export const CustomMessage = {
  args: { message: 'Loading students...' },
  decorators: [(Story) => <div style={{ height: '300px', position: 'relative' }}><Story /></div>],
};
