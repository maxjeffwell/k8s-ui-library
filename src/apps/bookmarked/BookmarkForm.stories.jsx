import { fn, expect, within, userEvent } from 'storybook/test';
import BookmarkForm from './components/BookmarkForm';
import { BookmarkedFormDecorator } from './decorators';
import { mockBookmarks } from './mocks/data';

const meta = {
  title: 'Bookmarked/BookmarkForm',
  component: BookmarkForm,
  decorators: [BookmarkedFormDecorator],
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    onSubmit: fn(),
  },
};

export default meta;

export const CreateNew = {
  args: {
    currentBookmark: {},
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('Create Bookmark')).toBeInTheDocument();
    await expect(canvas.getByPlaceholderText('Title')).toBeInTheDocument();
  },
};

export const EditExisting = {
  args: {
    currentBookmark: mockBookmarks[0],
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('Edit Bookmark')).toBeInTheDocument();
    await expect(canvas.getByDisplayValue('React Hooks Documentation')).toBeInTheDocument();
  },
};

export const FillAndSubmit = {
  args: {
    currentBookmark: {},
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const titleInput = canvas.getByPlaceholderText('Title');
    await userEvent.type(titleInput, 'My New Bookmark');

    const urlInput = canvas.getByPlaceholderText('http(s)://');
    await userEvent.type(urlInput, 'https://example.com');

    const descInput = canvas.getByPlaceholderText('Description');
    await userEvent.type(descInput, 'A great resource for learning');

    await expect(titleInput).toHaveValue('My New Bookmark');
    await expect(urlInput).toHaveValue('https://example.com');
  },
};
