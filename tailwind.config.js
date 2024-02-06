/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#FDFDFC',
          100: '#FDFDFC',
          200: '#FBFAF9',
          300: '#F9F8F6',
          400: '#F4F4F0',
          500: '#F3F2EE',
          600: '#CAC6B4',
          700: '#A49D7E',
          800: '#726B50',
          900: '#393528',
          950: '#1B1913'
        },
        secondary: {
          50: '#FBF6EE',
          100: '#F8EEDE',
          200: '#F1DEC1',
          300: '#E9CD9F',
          400: '#E2BC7E',
          500: '#DBAB5F',
          600: '#CC8F2E',
          700: '#9A6C23',
          800: '#684917',
          900: '#32230B',
          950: '#191206'
        },
        complementary: '#655D52',
        'book-bg': '#DEDEDE',
        'book-bg-100': '#FFFFFF',
        author: '#A1A1A1'
      },
      fontFamily: {
        title: ['Quando', 'Open Sans', 'sans-serif'],
        body: ['Open Sans', 'sans-serif'],
        price: ['Roboto Condensed', 'sans-serif'],
        button: ['Roboto Condensed', 'sans-serif']
      },
      maxWidth: {
        desktop: '1200px'
      }
    }
  },
  plugins: []
}
