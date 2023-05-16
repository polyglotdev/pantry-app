/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js}"
  ],
  theme: {
    extend: {
      fontFamily: {
      sans: ['Source Sans Pro', 'ui-sans-serif', 'system-ui'],
      exo: ['Exo 2', 'ui-sans-serif', 'system-ui'],
    },
  },
  // colors: {
  //   transparent: 'transparent',
  //   current: 'currentColor',
  //   white: '#ffffff',
  //   blue:'#c1dbe3ff',
  //   night: '"#131515ff"',
  //   jet: '#2b2c28ff',
  //   appleGreen: '#7e9c07ff',
  //   darkGreen: '#0f2e29ff',
  
  // },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}


}