import { fn, expect, within, userEvent } from 'storybook/test';
import EditBookmarkModal from './components/EditBookmarkModal';
import { FireBookModalDecorator } from './decorators';
import { mockBookmarks } from './mocks/data';

const meta = {
  title: 'FireBook/EditBookmarkModal',
  component: EditBookmarkModal,
  decorators: [FireBookModalDecorator],
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    onClose: fn(),
    onSave: fn(),
  },
};

export default meta;

export const Default = {
  args: {
    bookmark: mockBookmarks.allFeatures,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Verify form fields are pre-populated
    const titleInput = canvas.getByDisplayValue('MDN Web Docs - JavaScript Reference');
    await expect(titleInput).toBeInTheDocument();

    const urlInput = canvas.getByDisplayValue('https://developer.mozilla.org/en-US/docs/Web/JavaScript');
    await expect(urlInput).toBeInTheDocument();

    // Verify buttons
    await expect(canvas.getByText('Cancel')).toBeInTheDocument();
    await expect(canvas.getByText(/Save Changes/)).toBeInTheDocument();
  },
};

export const EditTitle = {
  args: {
    bookmark: mockBookmarks.basic,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Clear and type new title
    const titleInput = canvas.getByDisplayValue('Getting Started with React 19');
    await userEvent.clear(titleInput);
    await userEvent.type(titleInput, 'Updated React 19 Guide');

    await expect(titleInput).toHaveValue('Updated React 19 Guide');
  },
};

export const EmptyBookmark = {
  args: {
    bookmark: {
      id: 'new-1',
      title: '',
      url: '',
      desc: '',
      rating: 3,
      tags: [],
    },
  },
};
