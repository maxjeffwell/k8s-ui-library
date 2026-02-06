import { fn, expect, within, userEvent } from 'storybook/test';
import AlgoliaSearch from './components/AlgoliaSearch';
import { FireBookModalDecorator } from './decorators';
import { mockBookmarks } from './mocks/data';

const allBookmarks = Object.values(mockBookmarks);

const meta = {
  title: 'FireBook/AlgoliaSearch',
  component: AlgoliaSearch,
  decorators: [FireBookModalDecorator],
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    onDelete: fn(),
    onApplyTag: fn(),
    onEdit: fn(),
    onClose: fn(),
  },
};

export default meta;

export const NotConfigured = {
  args: {
    isConfigured: false,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('Algolia Search Not Configured')).toBeInTheDocument();
  },
};

export const WithResults = {
  args: {
    isConfigured: true,
    bookmarks: allBookmarks,
  },
};

export const SearchFiltering = {
  args: {
    isConfigured: true,
    bookmarks: allBookmarks,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Type in the search box
    const searchInput = canvas.getByPlaceholderText(/Search bookmarks/);
    await userEvent.type(searchInput, 'React');

    // Should filter results
    await expect(canvas.getByText('Getting Started with React 19')).toBeInTheDocument();
  },
};

export const NoResults = {
  args: {
    isConfigured: true,
    bookmarks: allBookmarks,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const searchInput = canvas.getByPlaceholderText(/Search bookmarks/);
    await userEvent.type(searchInput, 'zzzznonexistent');

    await expect(canvas.getByText(/No bookmarks match/)).toBeInTheDocument();
  },
};
