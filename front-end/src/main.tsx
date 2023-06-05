import React from 'react';
import { HelmetProvider } from 'react-helmet-async';
import ReactDOM from 'react-dom/client';
import './App.css';
import App from './App.tsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { StoreProvider } from './Store.tsx';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <StoreProvider>
      <PayPalScriptProvider options={{ 'client-id': 'sb'}} deferLoading={true}>
      <HelmetProvider>
        <QueryClientProvider client={queryClient}>
          <App />
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </HelmetProvider>
      </PayPalScriptProvider>
    </StoreProvider>
  </React.StrictMode>
);
