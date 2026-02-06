import { fn, expect, within } from 'storybook/test';
import Header from './components/Header';
import { EducationELLyDecorator } from './decorators';

const meta = {
  title: 'educationELLy/Header',
  component: Header,
  decorators: [EducationELLyDecorator],
  parameters: { layout: 'fullscreen' },
  args: { onNavigate: fn() },
};

export default meta;

export const Authenticated = {
  args: { isAuthenticated: true },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('educationELLy')).toBeInTheDocument();
    await expect(canvas.getByText('Dashboard')).toBeInTheDocument();
    await expect(canvas.getByText('Student List')).toBeInTheDocument();
    await expect(canvas.getByText('Log Out')).toBeInTheDocument();
  },
};

export const Unauthenticated = {
  args: { isAuthenticated: false },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('Register')).toBeInTheDocument();
    await expect(canvas.getByText('Log In')).toBeInTheDocument();
  },
};
