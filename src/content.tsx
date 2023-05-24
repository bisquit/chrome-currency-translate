import React from 'react';
import ReactDOM from 'react-dom';
import Popup from './Popup';

const root = document.createElement('div');
root.id = 'crx-root';
document.body.append(root);

const shadowRoot = root.attachShadow({ mode: 'open' });

const host = document.createElement('div');

shadowRoot.appendChild(host);

// const link = document.createElement('link');
// link.rel = 'stylesheet';
// link.href = 'https://cdn.jsdelivr.net/npm/@picocss/pico@1/css/pico.min.css';

// shadowRoot.appendChild(link);

ReactDOM.render(
  <React.StrictMode>
    <Popup />
  </React.StrictMode>,
  host
);
