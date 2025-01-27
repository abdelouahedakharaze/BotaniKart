module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'], 
  theme: {
    extend: {
      colors: {
        olive: {
          50: '#f6f7f4',
          100: '#e3e5dd',
          200: '#c5cabc',
          300: '#a7af9b',
          400: '#89947a',
          500: '#6b7959',
          600: '#4d5e38',
          700: '#3f4d2e',
          800: '#313c24',
          900: '#232b1a',
        },
        'dark-green': 'rgb(0, 64, 32)',
        'medium-green': 'rgb(90, 145, 60)',
        'light-green': 'rgb(188, 214, 112)',
        'tan': 'rgb(236, 227, 192)',
        'dark-brown': 'rgb(98, 64, 32)',
      },
    },
  },
  plugins: [],
};
