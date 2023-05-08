import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App.tsx';
import './index.css';
import axios from 'axios';



axios.defaults.baseURL = process.env.NODE_ENV === 'development' ? 'http://localhost:4000' : '/'


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
 