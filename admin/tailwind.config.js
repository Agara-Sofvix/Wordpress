/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
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
                "cyan-glow": "#00f2ff",
                admin: {
                    sidebar: '#0f172a',
                    content: '#f8fafc',
                    accent: '#3b82f6',
                }
            }
        },
    },
    plugins: [],
}
