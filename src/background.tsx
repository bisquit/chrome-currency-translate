import { createRoot } from 'react-dom/client';
import { insertPopup } from './insertPopup';
import React from 'react';
import Popup from './Popup';

chrome.runtime.onInstalled.addListener(() => {
  console.log('onInstalled');
  chrome.contextMenus.create(
    {
      title: 'Translate selected money',
      id: 'translate_selected_money',
      contexts: ['all'],
    },
    () => {
      if (chrome.runtime.lastError) {
        console.log('Got expected error: ' + chrome.runtime.lastError.message);
      }
    }
  );
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  switch (info.menuItemId) {
    case 'translate_selected_money':
      console.log('translate clicked', tab);
      if (tab && tab.id) {
        // chrome.scripting.executeScript({
        //   target: { tabId: tab.id },
        //   // files: ['src/content.tsx'],
        //   // func: insertPopup,
        //   // func: function () {
        //   //   console.log('func');
        //   //   insertPopup(document);
        //   //   // const root = document.createElement('div');
        //   //   // root.id = 'crx-root';
        //   //   // document.body.append(root);
        //   // },
        //   func: () => {
        //     console.log('insertPopup', document);
        //     const root = document.createElement('div');
        //     root.id = 'crx-root';
        //     document.body.append(root);
        //     const shadowRoot = root.attachShadow({ mode: 'open' });
        //     const host = document.createElement('div');
        //     shadowRoot.appendChild(host);
        //     createRoot(host).render(<Popup />);
        //   },
        // });
      }
      break;
  }
});
