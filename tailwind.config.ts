import typography from '@tailwindcss/typography';
import daisyui from 'daisyui';
import { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [typography, daisyui],
  daisyui: {
    themes: ['corporate', 'night'],
    darkTheme: 'night',
  },
} satisfies Config;
