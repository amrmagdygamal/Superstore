import React from 'react';
import { HelmetProvider } from 'react-helmet-async';
import ReactDOM from 'react-dom/client';
import './App.css';
import App from './App.tsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import { Provider } from 'react-redux';
import { store } from './app/store.tsx';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <PayPalScriptProvider options={{ 'client-id': 'sb'}} deferLoading={true}>
      <HelmetProvider>
        <QueryClientProvider client={queryClient}>
          <App />
          
        </QueryClientProvider>
      </HelmetProvider>
      </PayPalScriptProvider>
    </Provider>
  </React.StrictMode>
);
