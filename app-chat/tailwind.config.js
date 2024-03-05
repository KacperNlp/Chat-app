/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          100: "#409EFF",
          200: "#3a8cde",
          300: "#1E68D7",
        },
        fontColor: {
          100: "#1E1E1E",
        },
      },
    },
  },
  plugins: [],
};
