import { fn, expect, within } from 'storybook/test';
import StudentList from './components/StudentList';
import { EducationELLyDecorator } from './decorators';
import { mockStudents } from './mocks/data';

const meta = {
  title: 'educationELLy/StudentList',
  component: StudentList,
  decorators: [EducationELLyDecorator],
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
  args: {
    onEdit: fn(),
    onDelete: fn(),
  },
};

export default meta;

export const WithStudents = {
  args: { students: mockStudents },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('Maria Garcia')).toBeInTheDocument();
    await expect(canvas.getByText(/6 students/)).toBeInTheDocument();
  },
};

export const Empty = {
  args: { students: [] },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText(/No students found/)).toBeInTheDocument();
  },
};

export const Loading = {
  args: { students: [], loading: true },
};
