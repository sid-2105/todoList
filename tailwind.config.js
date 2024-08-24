module.exports = {
  corePlugins: {
    preflight: true, // Disable Tailwind's Preflight if you want full control
  },
  content: ['./src/**/*.{html,js,jsx,ts,tsx}'], // Adjust this to your file paths
  theme: {
    extend: {},
  },
  plugins: [
    function({ addBase }) {
      addBase({
        '*': {
          margin: '0',
          padding: '0',
          boxSizing: 'border-box',
        },
      });
    },
  ],
};


