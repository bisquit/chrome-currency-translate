import { crx, defineManifest } from '@crxjs/vite-plugin';
import react from '@vitejs/plugin-react';
import UnoCSS from 'unocss/vite';
import { defineConfig } from 'vite';

const manifest = defineManifest({
  manifest_version: 3,
  name: 'Currency Translate',
  version: '0.0.0',
  action: {
    default_popup: 'index.html',
  },
  permissions: ['contextMenus', 'activeTab', 'scripting'],
  background: {
    service_worker: 'src/background.tsx',
    type: 'module',
  },
  content_scripts: [
    {
      js: ['src/content-script.tsx'],
      matches: ['https://*/*'],
    },
  ],
  icons: {
    '16': 'assets/icon.128x128.png',
    '48': 'assets/icon.128x128.png',
    '128': 'assets/icon.128x128.png',
  },
});

export default defineConfig({
  plugins: [react(), UnoCSS(), crx({ manifest })],
});
