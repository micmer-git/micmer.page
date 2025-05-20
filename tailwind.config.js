module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#0B5ED7",
          50: "#E5F0FF",
          100: "#B8D3FF",
          200: "#8AB7FF",
          300: "#5C9BFF",
          400: "#2E7EFF",
          500: "#0062FF",
          600: "#0053E0",
          700: "#0044B2",
          800: "#003684",
          900: "#002857"
        }
      }
    }
  },
  plugins: []
};
