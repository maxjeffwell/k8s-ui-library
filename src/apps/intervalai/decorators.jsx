import React from 'react';

export const IntervalAIDecorator = (Story) => (
  <div style={{
    backgroundColor: '#0a0e27',
    color: '#00ff41',
    fontFamily: "'Courier New', 'Fira Code', monospace",
    minHeight: '500px',
    padding: '20px',
  }}>
    <Story />
  </div>
);

export const IntervalAIFullDecorator = (Story) => (
  <div style={{
    backgroundColor: '#0a0e27',
    color: '#00ff41',
    fontFamily: "'Courier New', 'Fira Code', monospace",
    minHeight: '700px',
    padding: '0',
  }}>
    <Story />
  </div>
);
