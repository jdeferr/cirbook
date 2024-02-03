/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#F3F2EE',
        'primary-100': '#EDEFEC',
        secondary: '#DBAB5F',
        'secondary-100': 'rgba(219,171,95,.24)',
        complementary: '#655D52',
        'book-bg': '#DEDEDE',
        'book-bg-100': '#FFFFFF',
        author: '#A1A1A1'
      },
      fontFamily: {
        title: ['Quando', 'Open Sans', 'sans-serif'],
        body: ['Open Sans', 'sans-serif'],
        price: ['Roboto Condensed', 'sans-serif']
      },
      maxWidth: {
        desktop: '1200px'
      }
    }
  },
  plugins: []
}
