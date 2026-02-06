import React from 'react';
import { fn, expect, within, userEvent } from 'storybook/test';
import ErrorBoundary from './components/ErrorBoundary';
import { FireBookDecorator } from './decorators';

// Component that throws an error
function BuggyComponent({ shouldThrow = true }) {
  if (shouldThrow) {
    throw new Error('Something went wrong in BuggyComponent!');
  }
  return (
    <div className="card">
      <h3 className="text-xl font-bold text-gray-900 mb-2">Everything is fine!</h3>
      <p className="text-gray-600">This component rendered successfully.</p>
    </div>
  );
}

const meta = {
  title: 'FireBook/ErrorBoundary',
  component: ErrorBoundary,
  decorators: [FireBookDecorator],
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;

export const CaughtError = {
  render: () => (
    <ErrorBoundary showDetails={true}>
      <BuggyComponent shouldThrow={true} />
    </ErrorBoundary>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('Something went wrong')).toBeInTheDocument();
    await expect(canvas.getByText('Try Again')).toBeInTheDocument();
    await expect(canvas.getByText('Reload Page')).toBeInTheDocument();
  },
};

export const WithTechnicalDetails = {
  render: () => (
    <ErrorBoundary showDetails={true}>
      <BuggyComponent shouldThrow={true} />
    </ErrorBoundary>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Expand technical details
    const detailsToggle = canvas.getByText('Technical details');
    await userEvent.click(detailsToggle);

    // Should show error message
    await expect(canvas.getByText(/BuggyComponent/)).toBeInTheDocument();
  },
};

export const CustomFallback = {
  render: () => (
    <ErrorBoundary
      fallback={
        <div className="card text-center py-12">
          <span className="text-4xl block mb-4">🔧</span>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Custom Error Page</h3>
          <p className="text-gray-600">This is a custom fallback UI.</p>
        </div>
      }
    >
      <BuggyComponent shouldThrow={true} />
    </ErrorBoundary>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('Custom Error Page')).toBeInTheDocument();
  },
};

export const NoError = {
  render: () => (
    <ErrorBoundary showDetails={true}>
      <BuggyComponent shouldThrow={false} />
    </ErrorBoundary>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('Everything is fine!')).toBeInTheDocument();
  },
};
