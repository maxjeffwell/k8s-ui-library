import React, { createContext, useContext } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { MemoryRouter } from 'react-router-dom';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#2196f3', light: '#4dabf5', dark: '#1769aa' },
    secondary: { main: '#f50057', light: '#f73378', dark: '#ab003c' },
    success: { main: '#4caf50' },
    warning: { main: '#ff9800' },
    error: { main: '#f44336' },
    background: { default: '#0a1929', paper: '#132f4c' },
    text: { primary: '#ffffff', secondary: '#b2bac2' },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h4: { fontWeight: 600 },
    h5: { fontWeight: 500 },
    h6: { fontWeight: 500 },
  },
  components: {
    MuiCard: { styleOverrides: { root: { backgroundImage: 'none' } } },
    MuiButton: { styleOverrides: { root: { textTransform: 'none' } } },
  },
});

// Mock AuthContext
const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

// Mock NotificationContext
const NotificationContext = createContext();
export const useNotifications = () => useContext(NotificationContext);

export const PopPortfolioDecorator = (Story) => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <MemoryRouter>
      <AuthContext.Provider value={{
        user: { username: 'admin', email: 'admin@pop-portfolio.dev' },
        isAuthenticated: true,
        loading: false,
        login: async () => ({ success: true }),
        logout: async () => {},
      }}>
        <div style={{ backgroundColor: '#0a1929', minHeight: '500px', padding: '20px' }}>
          <Story />
        </div>
      </AuthContext.Provider>
    </MemoryRouter>
  </ThemeProvider>
);

export const PopPortfolioLayoutDecorator = (Story) => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <MemoryRouter>
      <AuthContext.Provider value={{
        user: { username: 'admin', email: 'admin@pop-portfolio.dev' },
        isAuthenticated: true,
        loading: false,
        login: async () => ({ success: true }),
        logout: async () => {},
      }}>
        <Story />
      </AuthContext.Provider>
    </MemoryRouter>
  </ThemeProvider>
);

export { AuthContext, NotificationContext };
