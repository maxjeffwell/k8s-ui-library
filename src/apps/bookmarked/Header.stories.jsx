import { fn, expect, within } from 'storybook/test';
import Header from './components/Header';
import { BookmarkedDecorator } from './decorators';

const meta = {
  title: 'Bookmarked/Header',
  component: Header,
  decorators: [BookmarkedDecorator],
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    onLogout: fn(),
    onNavigate: fn(),
  },
};

export default meta;

export const Authenticated = {
  args: {
    isAuthenticated: true,
    currentPath: '/bookmarks',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('Bookmarked')).toBeInTheDocument();
    await expect(canvas.getByText('Home')).toBeInTheDocument();
    await expect(canvas.getByText('Logout')).toBeInTheDocument();
  },
};

export const AuthenticatedHome = {
  args: {
    isAuthenticated: true,
    currentPath: '/',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('My Bookmarks')).toBeInTheDocument();
  },
};

export const Unauthenticated = {
  args: {
    isAuthenticated: false,
    currentPath: '/',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('Sign In')).toBeInTheDocument();
  },
};

export const LoginPage = {
  args: {
    isAuthenticated: false,
    currentPath: '/login',
  },
};
