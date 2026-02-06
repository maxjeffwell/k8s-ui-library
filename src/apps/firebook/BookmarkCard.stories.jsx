import { fn, expect, within, userEvent } from 'storybook/test';
import BookmarkCard from './components/BookmarkCard';
import { FireBookCardDecorator } from './decorators';
import { mockBookmarks } from './mocks/data';

const meta = {
  title: 'FireBook/BookmarkCard',
  component: BookmarkCard,
  decorators: [FireBookCardDecorator],
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    onDelete: fn(),
    onApplyTag: fn(),
    onEdit: fn(),
    onShowSimilar: fn(),
  },
};

export default meta;

export const Basic = {
  args: {
    bookmark: mockBookmarks.basic,
  },
};

export const WithScreenshot = {
  args: {
    bookmark: mockBookmarks.withScreenshot,
  },
};

export const WithAITags = {
  args: {
    bookmark: mockBookmarks.withAITags,
  },
};

export const WithErrors = {
  args: {
    bookmark: mockBookmarks.withErrors,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Click to expand error details
    const showDetailsBtn = canvas.getByText(/Show details/);
    await expect(showDetailsBtn).toBeInTheDocument();
    await userEvent.click(showDetailsBtn);

    // Verify error messages are visible
    await expect(canvas.getByText(/Metadata error:/)).toBeInTheDocument();
    await expect(canvas.getByText(/Screenshot error:/)).toBeInTheDocument();

    // Verify retry buttons exist
    await expect(canvas.getByText(/Retry Metadata/)).toBeInTheDocument();
    await expect(canvas.getByText(/Retry Screenshot/)).toBeInTheDocument();
    await expect(canvas.getByText(/Retry All/)).toBeInTheDocument();
  },
};

export const WithURLError = {
  args: {
    bookmark: mockBookmarks.withURLError,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Expand details
    await userEvent.click(canvas.getByText(/Show details/));

    // Should show URL issue warning
    await expect(canvas.getByText(/URL Issue Detected/)).toBeInTheDocument();
    await expect(canvas.getByText(/Edit URL/)).toBeInTheDocument();
  },
};

export const AllFeatures = {
  args: {
    bookmark: mockBookmarks.allFeatures,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Verify all feature indicators
    await expect(canvas.getByText('Metadata')).toBeInTheDocument();
    await expect(canvas.getByText('Screenshot')).toBeInTheDocument();
    await expect(canvas.getByText('AI Tagged')).toBeInTheDocument();
    await expect(canvas.getByText('AI Enhanced')).toBeInTheDocument();
    await expect(canvas.getByText('Embedded')).toBeInTheDocument();

    // Should show "Find Similar" button since it has embedding
    await expect(canvas.getByText(/Find Similar/)).toBeInTheDocument();
  },
};

export const ReadyToEnhance = {
  args: {
    bookmark: mockBookmarks.readyToEnhance,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Should show "Enhance with AI" button
    await expect(canvas.getByText(/Enhance with AI/)).toBeInTheDocument();

    // Should show "Generate Embedding" since no embedding yet
    await expect(canvas.getByText(/Generate Embedding/)).toBeInTheDocument();
  },
};

export const WithAIEnhanceError = {
  args: {
    bookmark: mockBookmarks.withAIEnhanceError,
  },
};
