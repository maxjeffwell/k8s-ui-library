import './podrick.css';

export const PodRickDecorator = (Story) => (
  <div style={{
    background: 'var(--bg-primary)',
    padding: '20px',
    minHeight: '200px',
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
    color: 'var(--text-primary)',
    WebkitFontSmoothing: 'antialiased',
  }}>
    <Story />
  </div>
);
