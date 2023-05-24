import React from 'react';
import { createRoot } from 'react-dom/client';
import Popup from './Popup';

export function insertPopup() {
  console.log('insertPopup', document);
  const root = document.createElement('div');
  root.id = 'crx-root';
  document.body.append(root);
  const shadowRoot = root.attachShadow({ mode: 'open' });
  const host = document.createElement('div');
  shadowRoot.appendChild(host);

  // createRoot(host).render(
  //   <React.StrictMode>
  //     <Popup />
  //   </React.StrictMode>
  // );
}
