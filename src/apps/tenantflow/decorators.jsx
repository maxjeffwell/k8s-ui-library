import './tenantflow.css';

export const TenantFlowDecorator = (Story) => (
  <div
    className="tenantflow-scope"
    style={{
      background: '#f5f5f5',
      padding: '20px',
      minHeight: '200px',
      fontFamily: "system-ui, Avenir, Helvetica, Arial, sans-serif",
      color: '#213547',
      lineHeight: 1.5,
      WebkitFontSmoothing: 'antialiased',
      MozOsxFontSmoothing: 'grayscale',
    }}
  >
    <Story />
  </div>
);

export const TenantFlowDarkDecorator = (Story) => (
  <div
    className="tenantflow-scope"
    style={{
      background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
      padding: '20px',
      minHeight: '200px',
      fontFamily: "system-ui, Avenir, Helvetica, Arial, sans-serif",
      color: '#e5e7eb',
      lineHeight: 1.5,
      WebkitFontSmoothing: 'antialiased',
      MozOsxFontSmoothing: 'grayscale',
    }}
  >
    <Story />
  </div>
);
