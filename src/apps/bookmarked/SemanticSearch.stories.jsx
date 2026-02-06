import { fn, expect, within, userEvent } from 'storybook/test';
import SemanticSearch from './components/SemanticSearch';
import { BookmarkedDarkDecorator } from './decorators';
import { mockSemanticResults } from './mocks/data';

const meta = {
  title: 'Bookmarked/SemanticSearch',
  component: SemanticSearch,
  decorators: [BookmarkedDarkDecorator],
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    onResultSelect: fn(),
  },
};

export default meta;

export const Default = {
  args: {
    mockResults: mockSemanticResults,
  },
};

export const WithResults = {
  args: {
    mockResults: mockSemanticResults,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const searchInput = canvas.getByPlaceholderText(/Search by meaning/);
    await userEvent.type(searchInput, 'React hooks');

    // Submit the search
    const searchBtn = canvas.getByText(/Search/);
    await userEvent.click(searchBtn);

    // Wait for results to appear (mock has 500ms delay)
    await new Promise(resolve => setTimeout(resolve, 700));

    await expect(canvas.getByText(/semantically similar/)).toBeInTheDocument();
  },
};

export const WithError = {
  args: {
    mockResults: null,
    mockError: 'AI service unavailable. Embeddings may not be configured.',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await userEvent.type(canvas.getByPlaceholderText(/Search by meaning/), 'test query');
    await userEvent.click(canvas.getByText(/Search/));

    await new Promise(resolve => setTimeout(resolve, 700));

    await expect(canvas.getByText(/AI service unavailable/)).toBeInTheDocument();
  },
};

export const NoResults = {
  args: {
    mockResults: [],
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await userEvent.type(canvas.getByPlaceholderText(/Search by meaning/), 'something obscure');
    await userEvent.click(canvas.getByText(/Search/));

    await new Promise(resolve => setTimeout(resolve, 700));

    await expect(canvas.getByText(/No similar bookmarks found/)).toBeInTheDocument();
  },
};
