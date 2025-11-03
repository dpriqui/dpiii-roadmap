import type { Config } from 'tailwindcss';
const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  safelist: [
    'bg-gradient-to-r',
    'from-green-500','to-emerald-500',
    'from-sky-500','to-indigo-500',
    'from-indigo-500','to-purple-500',
    'from-purple-500','to-pink-500',
    'from-rose-500','to-amber-500'
  ],
  theme: { extend: {} },
  plugins: []
};
export default config;
