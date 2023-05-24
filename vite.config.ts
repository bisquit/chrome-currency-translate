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
  icons: {
    '16': 'assets/icon.png',
    '48': 'assets/icon.png',
    '128': 'assets/icon.png',
  },
});

export default defineConfig({
  plugins: [react(), UnoCSS(), crx({ manifest })],
});
