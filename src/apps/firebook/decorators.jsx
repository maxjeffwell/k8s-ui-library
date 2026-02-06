import React from 'react';
import './firebook.css';

export const FireBookDecorator = (Story) => (
  <div
    className="firebook-scope"
    style={{
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      minHeight: '100vh',
      padding: '2rem',
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    }}
  >
    <Story />
  </div>
);

export const FireBookCardDecorator = (Story) => (
  <div
    className="firebook-scope"
    style={{
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      minHeight: '100vh',
      padding: '2rem',
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      maxWidth: '480px',
      margin: '0 auto',
    }}
  >
    <Story />
  </div>
);

export const FireBookModalDecorator = (Story) => (
  <div
    className="firebook-scope"
    style={{
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      minHeight: '100vh',
    }}
  >
    <Story />
  </div>
);
