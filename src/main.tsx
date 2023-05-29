import './tailwind.css';

import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App.tsx';
import { getConfigWithDefault } from './utils/chrome/config.ts';

const config = await getConfigWithDefault();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App config={config} />
  </React.StrictMode>
);
