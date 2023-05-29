import { crx, defineManifest } from '@crxjs/vite-plugin';
import react from '@vitejs/plugin-react';
import { $ } from 'execa';
import { defineConfig } from 'vite';

const { stdout: versionStr } = $.sync`npm pkg get version`;
const version = JSON.parse(versionStr);

const manifest = defineManifest({
  manifest_version: 3,
  name: 'Currency Translate',
  version: version,
  description: 'Translate money to the specific currency',
  action: {
    default_popup: 'index.html',
  },
  permissions: ['activeTab', 'storage'],
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
  plugins: [react(), crx({ manifest })],
  build: {
    target: 'esnext',
  },
});
