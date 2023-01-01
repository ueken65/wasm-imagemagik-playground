/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./pages/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  mode: 'jit',
  purge: ['./**/*.{ts,tsx}'],
  darkMode: false,
  theme: {
    extend: {
      borderWidth: {
        DEFAULT: '1px',
        0: '0',
        2: '2px',
        3: '3px',
        4: '4px',
        6: '6px',
        8: '8px',
      },
      spacing: {
        '2px': '2px',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
