/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                ovicare: {
                    dark: '#092f26',
                    primary: '#d9fe54',
                    text: '#e7e7e7',
                    accent: '#c5ff4a',
                }
            },
            fontFamily: {
                jakarta: ['"Plus Jakarta Sans"', 'sans-serif'],
            },
            borderRadius: {
                '3xl': '30px',
                '2xl': '23px',
            }
        },
    },
    plugins: [],
}
