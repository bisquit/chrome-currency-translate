import daisyui from 'daisyui';
import { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [daisyui],
  daisyui: {
    themes: ['corporate', 'night'],
    darkTheme: 'night',
  },
} satisfies Config;
