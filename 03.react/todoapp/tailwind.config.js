/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        main: '#e67800',
        sub: '#ffedd5',
        inactive: '#ffcc89',
        white: '#fff',
        border: '#e1e2e3',
        cancel: '#808080',
        add: '#fff',
        text: '#22243b',
      },
      boxShadow: {
        custom: '0 0 0 2px var(--color-main)', // 사용자 정의 박스 쉐도우
      },
    },
  },
  plugins: [],
};
