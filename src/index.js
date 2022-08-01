import * as React from 'react';
import { createRoot } from 'react-dom/client';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { AuthProvider } from './context/AuthProvider';
import RouteList from './routes';
import theme from './theme';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);


root.render(
  <ThemeProvider theme={theme}>
      <CssBaseline />
      <RouteList />
  </ThemeProvider>
);
