import { fn, expect, within, userEvent } from 'storybook/test';
import CreateStudent from './components/CreateStudent';
import { ELLyGraphQLFormDecorator } from './decorators';
import { mockStudents } from './mocks/data';

const meta = {
  title: 'educationELLy-GraphQL/CreateStudent',
  component: CreateStudent,
  decorators: [ELLyGraphQLFormDecorator],
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
  args: { onSubmit: fn() },
};

export default meta;

export const NewStudent = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('Create New Student')).toBeInTheDocument();
  },
};

export const EditExisting = {
  args: { initialData: mockStudents[0] },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('Update Student')).toBeInTheDocument();
    await expect(canvas.getByDisplayValue('Sofia Hernandez')).toBeInTheDocument();
  },
};

export const FillForm = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.type(canvas.getByPlaceholderText('Student full name'), 'Test Student');
    await userEvent.type(canvas.getByPlaceholderText('School name'), 'Test School');
    await userEvent.type(canvas.getByPlaceholderText('Teacher name'), 'Ms. Test');
    await userEvent.type(canvas.getByPlaceholderText('e.g., 3rd Grade'), '4th Grade');
  },
};
