import { fn, expect, within, userEvent } from 'storybook/test';
import Students from './components/Students';
import { ELLyGraphQLDecorator } from './decorators';
import { mockStudents } from './mocks/data';

const meta = {
  title: 'educationELLy-GraphQL/Students',
  component: Students,
  decorators: [ELLyGraphQLDecorator],
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
  args: {
    onAddStudent: fn(),
    onDelete: fn(),
  },
};

export default meta;

export const WithStudents = {
  args: { students: mockStudents },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('Sofia Hernandez')).toBeInTheDocument();
    await expect(canvas.getByText(/5 students/)).toBeInTheDocument();
  },
};

export const SearchFiltering = {
  args: { students: mockStudents },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const searchInput = canvas.getByPlaceholderText('Search students...');
    await userEvent.type(searchInput, 'Roosevelt');
    await expect(canvas.getByText(/3 students/)).toBeInTheDocument();
  },
};

export const Empty = {
  args: { students: [] },
};
