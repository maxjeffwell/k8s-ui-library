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
    line-height: 2;
  }
`;

export const ELLyGraphQLDecorator = (Story) => (
  <ThemeProvider theme={theme}>
    <GlobalStyle />
    <div style={{ minHeight: '100vh', background: '#f5f5f5' }}>
      <Story />
    </div>
  </ThemeProvider>
);

export const ELLyGraphQLFormDecorator = (Story) => (
  <ThemeProvider theme={theme}>
    <GlobalStyle />
    <div style={{ minHeight: '100vh', background: '#f5f5f5', padding: '2rem', display: 'flex', justifyContent: 'center' }}>
      <div style={{ maxWidth: '800px', width: '100%' }}>
        <Story />
      </div>
    </div>
  </ThemeProvider>
);
