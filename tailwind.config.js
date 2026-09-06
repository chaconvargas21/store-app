module.exports = {
    prefix: '',
    purge: {
      content: [
        './src/**/*.{html,ts}',
      ]
    },
    darkMode: 'class', // or 'media' or 'class'
    theme: {
      extend: {
        fontFamily: {
          sans: ['Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
        },
        colors: {
          ink: '#111111',
          accent: '#1c1c1c',
        },
        letterSpacing: {
          widest2: '0.15em',
        },
      },
    },
    variants: {
      extend: {},
    },
    plugins: [require('@tailwindcss/forms'),require('@tailwindcss/typography')],
};