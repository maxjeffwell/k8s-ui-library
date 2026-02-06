import { fn, expect, within } from 'storybook/test';
import Pagination from './components/Pagination';
import { EducationELLyDecorator } from './decorators';
import { mockPaginationMultiPage } from './mocks/data';

const meta = {
  title: 'educationELLy/Pagination',
  component: Pagination,
  decorators: [EducationELLyDecorator],
  parameters: { layout: 'centered' },
  args: {
    onPageChange: fn(),
  },
};

export default meta;

export const MultiPage = {
  args: {
    currentPage: 2,
    totalPages: 3,
    totalItems: 75,
    itemsPerPage: 25,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText(/26-50 of 75/)).toBeInTheDocument();
  },
};

export const FirstPage = {
  args: {
    currentPage: 1,
    totalPages: 5,
    totalItems: 125,
    itemsPerPage: 25,
  },
};

export const LastPage = {
  args: {
    currentPage: 5,
    totalPages: 5,
    totalItems: 125,
    itemsPerPage: 25,
  },
};

export const ManyPages = {
  args: {
    currentPage: 5,
    totalPages: 10,
    totalItems: 250,
    itemsPerPage: 25,
  },
};
