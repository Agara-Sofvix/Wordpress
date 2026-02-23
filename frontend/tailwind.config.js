/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: "class",
    theme: {
        extend: {
            colors: {
                "primary": "#135bec",
                "background-light": "#f6f6f8",
                "background-dark": "#0a0f1a",
                "charcoal": "#0d1117",
                "navy-deep": "#0f172a",
                "accent-green": "#10b981",
                "tech-blue": "#00d2ff",
                "neon-green": "#39ff14",
                "cyan-glow": "#00f2ff"
            },
            fontFamily: {
                "display": ["Manrope", "sans-serif"],
                "structure": ["Space Grotesk", "sans-serif"],
                "mono": ["Fira Code", "monospace"]
            },
            borderRadius: {
                "DEFAULT": "0.25rem",
                "lg": "0.5rem",
                "xl": "0.75rem",
                "2xl": "1rem",
                "3xl": "1.5rem",
                "full": "9999px"
            },
        },
    },
    plugins: [],
}
