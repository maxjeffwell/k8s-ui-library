import React from 'react';
import { Global, css, ThemeProvider } from '@emotion/react';

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

const globalStyles = css`
  @font-face {
    font-family: ITCAvantGardeStd-Demi;
    src: url('/fonts/bookmarked/ITCAvantGardeStd-Demi.otf') format('opentype');
    font-weight: normal;
    font-style: normal;
  }
  @font-face {
    font-family: HelveticaNeueLTStd-Roman;
    src: url('/fonts/bookmarked/HelveticaNeueLTStd-Roman.otf') format('opentype');
    font-weight: normal;
    font-style: normal;
  }
  @font-face {
    font-family: HelveticaNeueLTStd-BdCn;
    src: url('/fonts/bookmarked/HelveticaNeueLTStd-BdCn.otf') format('opentype');
    font-weight: bold;
    font-style: normal;
  }
  @font-face {
    font-family: GaramondPremrPro-MedDisp;
    src: url('/fonts/bookmarked/GaramondPremrPro-MedDisp.otf') format('opentype');
    font-weight: bold;
    font-style: normal;
  }
  html {
    box-sizing: border-box;
    font-size: clamp(12px, 2.5vw, 16px);
    color: #272727;
  }
  *, *:before, *:after {
    box-sizing: inherit;
  }
  body {
    padding: 0;
    margin: 0;
    font-size: 1.5rem;
    line-height: 2;
  }
`;

export const BookmarkedDecorator = (Story) => (
  <ThemeProvider theme={theme}>
    <Global styles={globalStyles} />
    <div style={{ background: '#fbf579', minHeight: '100vh' }}>
      <Story />
    </div>
  </ThemeProvider>
);

export const BookmarkedDarkDecorator = (Story) => (
  <ThemeProvider theme={theme}>
    <Global styles={globalStyles} />
    <div style={{ background: '#393939', minHeight: '100vh', padding: '2rem' }}>
      <Story />
    </div>
  </ThemeProvider>
);

export const BookmarkedFormDecorator = (Story) => (
  <ThemeProvider theme={theme}>
    <Global styles={globalStyles} />
    <div style={{ background: '#343436', minHeight: '100vh', padding: '2rem', display: 'flex', justifyContent: 'center' }}>
      <div style={{ maxWidth: '600px', width: '100%' }}>
        <Story />
      </div>
    </div>
  </ThemeProvider>
);
