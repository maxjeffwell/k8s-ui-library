import React from 'react';
import { ThemeProvider } from '@emotion/react';

const theme = {
  colors: {
    primary: '#393939',
    secondary: '#343436',
    tertiary: '#FF4834',
    black: '#000000',
    white: '#ffffff'
  },
  fonts: {
    primary: 'ITCAvantGardeStd-Demi, monospace',
    secondary: 'HelveticaNeueLTStd-Roman, sans-serif',
    quaternary: 'HelveticaNeueLTStd-BdCn, sans-serif',
    quinary: 'GaramondPremrPro-MedDisp, serif'
  },
};

export const BookmarkedDecorator = (Story) => (
  <ThemeProvider theme={theme}>
    <div style={{ background: '#fbf579', minHeight: '100vh' }}>
      <Story />
    </div>
  </ThemeProvider>
);

export const BookmarkedDarkDecorator = (Story) => (
  <ThemeProvider theme={theme}>
    <div style={{ background: '#393939', minHeight: '100vh', padding: '2rem' }}>
      <Story />
    </div>
  </ThemeProvider>
);

export const BookmarkedFormDecorator = (Story) => (
  <ThemeProvider theme={theme}>
    <div style={{ background: '#343436', minHeight: '100vh', padding: '2rem', display: 'flex', justifyContent: 'center' }}>
      <div style={{ maxWidth: '600px', width: '100%' }}>
        <Story />
      </div>
    </div>
  </ThemeProvider>
);
