import React from 'react';
import { ThemeProvider, createGlobalStyle } from 'styled-components';
import 'semantic-ui-css/semantic.min.css';

const theme = {
  orange: '#fb9438',
  blue: '#2873b4',
  green: '#86c64e',
  white: '#f5f5f5',
};

const GlobalStyle = createGlobalStyle`
  html {
    box-sizing: border-box;
    font-size: 14px;
  }
  body {
    font-family: 'Roboto', sans-serif;
    min-height: 100vh;
    padding-bottom: 50px;
  }
`;

export const EducationELLyDecorator = (Story) => (
  <ThemeProvider theme={theme}>
    <GlobalStyle />
    <div style={{ minHeight: '100vh', background: '#f5f5f5' }}>
      <Story />
    </div>
  </ThemeProvider>
);

export const EducationELLyDarkDecorator = (Story) => (
  <ThemeProvider theme={theme}>
    <GlobalStyle />
    <div style={{ minHeight: '100vh', background: '#2873b4', padding: '2rem' }}>
      <Story />
    </div>
  </ThemeProvider>
);
