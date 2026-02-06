import { fn, expect, userEvent, within } from 'storybook/test';
import { Meta } from '@storybook/addon-docs/blocks';
import LearningPage from './components/LearningPage';
import { IntervalAIFullDecorator } from './decorators';
import { mockQuestion, mockStats, mockMLInfo, mockFeedback } from './mocks/data';

export default {
  title: 'IntervalAI/LearningPage',
  component: LearningPage,
  decorators: [IntervalAIFullDecorator],
};

export const QuestionState = {
  args: {
    question: mockQuestion,
    stats: mockStats,
    mlInfo: mockMLInfo,
    feedback: null,
    onSubmitAnswer: fn(),
    onNextQuestion: fn(),
  },
};

export const CorrectFeedback = {
  args: {
    question: mockQuestion,
    stats: mockStats,
    mlInfo: mockMLInfo,
    feedback: mockFeedback,
    onSubmitAnswer: fn(),
    onNextQuestion: fn(),
  },
};

export const IncorrectFeedback = {
  args: {
    question: mockQuestion,
    stats: { ...mockStats, currentStreak: 0 },
    mlInfo: mockMLInfo,
    feedback: { ...mockFeedback, correct: false, sm2Interval: 1, mlInterval: 2, mlConfidence: 0.45 },
    onSubmitAnswer: fn(),
    onNextQuestion: fn(),
  },
};

export const SubmitAnswer = {
  args: {
    question: mockQuestion,
    stats: mockStats,
    mlInfo: mockMLInfo,
    feedback: null,
    onSubmitAnswer: fn(),
    onNextQuestion: fn(),
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByTestId('answer-input');
    await userEvent.type(input, 'O(log n)');
    const submitBtn = canvas.getByTestId('submit-answer');
    await userEvent.click(submitBtn);
    await expect(args.onSubmitAnswer).toHaveBeenCalledWith('O(log n)');
  },
};
