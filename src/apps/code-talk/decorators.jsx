import React from 'react';
import { ThemeProvider, createGlobalStyle } from 'styled-components';

const theme = {
  green: '#30d403',
  black: '#393939',
  white: '#EDEDED'
};

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    font-family: 'Courier New', monospace;
    background-color: ${props => props.theme.black};
    color: ${props => props.theme.green};
  }
  *, *::before, *::after {
    box-sizing: border-box;
  }
`;

export const CodeTalkDecorator = (Story) => (
  <ThemeProvider theme={theme}>
    <GlobalStyle />
    <div style={{ padding: '20px', backgroundColor: '#393939', minHeight: '400px' }}>
      <Story />
    </div>
  </ThemeProvider>
);

export const CodeTalkEditorDecorator = (Story) => (
  <ThemeProvider theme={theme}>
    <GlobalStyle />
    <div style={{ padding: '20px', backgroundColor: '#393939', minHeight: '600px', maxWidth: '900px' }}>
      <Story />
    </div>
  </ThemeProvider>
);

export const CodeTalkGridDecorator = (Story) => (
  <ThemeProvider theme={theme}>
    <GlobalStyle />
    <div style={{ padding: '0', backgroundColor: '#393939', minHeight: '600px' }}>
      <Story />
    </div>
  </ThemeProvider>
);
