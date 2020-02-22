module.exports = {
  theme: {
    fontFamily: {
      sans: 'BasisGrotesquePro, sans-serif',
    },
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',    // sub
      base: '1rem',      // body mobile
      lg: '1.125rem',    // body 
      xl: '1.25rem',     // paragraph mobile
      '2xl': '1.5rem',   // paragraph / h3 mobile
      '2xl': '1.875rem', // h3 / h2 mobile
      '3xl': '2.125rem', // h1 mobile
      '4xl': '2.6875rem',// h2
      '5xl': '3.75rem'   // h1
    },
    extend: {
      colors: {
        white: '#F9F9F9',
        black: '#0D0D0D',
        void: '#000000',
        grey: '#9E9E9E'
      },
      screens: {
        'fw': '100rem'
      },
      spacing: {
        '1/24': '4.16667%',
        '1/12': '8.33333%',
        '3/24': '12.5%',
        '2/12': '16.66667%',
        '3/12': '25%',
        '4/12': '33.33333%',
        '9/24': '37.5%',
        '5/12': '41.66667%',
        '6/12': '50%',
        '7/12': '58.33333%',
        '8/12': '66.66667%',
        '9/12': '75%',
        '10/12': '83.33333%',
        '11/12': '91.66667%',
        'full': '100%',
        '18': '4.5rem',
      }
    }
  },
  variants: {},
  plugins: []
}
