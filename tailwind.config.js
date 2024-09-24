module.exports = {
  darkMode: 'class', // Enables dark mode
  content: [
    './src/**/*.{js,jsx,ts,tsx}',  // Adjust this path based on your project structure
    './public/index.html',
  ],
  theme: {
    extend: {
      colors : {
        primary : "",
        secondary : "#DB4444",
        authBg : "#CBE4E8"
      }
    },
  },
  plugins: [],
};
