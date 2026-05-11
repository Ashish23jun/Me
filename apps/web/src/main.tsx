import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { injectGlobalStyles } from '@/lib/globalStyles';
import App from './App';

injectGlobalStyles();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
