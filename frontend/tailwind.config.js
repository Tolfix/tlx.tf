module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
        keyframes: {
            wiggle: {
              "0%, 100%": { transform: "rotate(-3deg)" },
              "50%": { transform: "rotate(3deg)" }
            },
            'fade-in-down': {
                '0%': {
                    opacity: '0',
                    transform: 'translateY(-10px)'
                },
                '100%': {
                    opacity: '1',
                    transform: 'translateY(0)'
                },
            }
        },
        animation: {
            'fade-in-down': 'fade-in-down 0.5s ease-out',
            wiggle: "wiggle 1s ease-in-out"
        }
    },
  },
  plugins: [],
}
