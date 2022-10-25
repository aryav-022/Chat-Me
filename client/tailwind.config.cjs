/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      width: {
        "sidebar-width": "var(--sidebar-width)",
        "chat-screen-width": "var(--chat-screen-width)"
      },
      height: {
        "chat-section-height": "var(--chat-section-height)"
      }
    },
  },
  plugins: [require("daisyui")]
}
