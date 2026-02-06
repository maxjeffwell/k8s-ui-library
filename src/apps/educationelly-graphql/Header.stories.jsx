import { fn, expect, within } from 'storybook/test';
import Header from './components/Header';
import { ELLyGraphQLDecorator } from './decorators';
import { mockSession } from './mocks/data';

const meta = {
  title: 'educationELLy-GraphQL/Header',
  component: Header,
  decorators: [ELLyGraphQLDecorator],
  parameters: { layout: 'fullscreen' },
  args: { onNavigate: fn() },
};

export default meta;

export const Authenticated = {
  args: { session: mockSession },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('Dashboard')).toBeInTheDocument();
    await expect(canvas.getByText('Student List')).toBeInTheDocument();
  },
};

export const Unauthenticated = {
  args: { session: null },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('Register')).toBeInTheDocument();
  },
};
