import { expect, within } from 'storybook/test';
import Footer from './components/Footer';
import { BookmarkedDecorator } from './decorators';

const meta = {
  title: 'Bookmarked/Footer',
  component: Footer,
  decorators: [BookmarkedDecorator],
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;

export const Default = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText(/Copyright/)).toBeInTheDocument();
    await expect(canvas.getByText(/Bookmarked 2026/)).toBeInTheDocument();
  },
};
