/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{html,js,tsx}'],
    theme: {
        extend: {
            keyframes: {
                loading: {
                    '100%': { transform: 'rotate(360deg)' },
                },
            },
            animation: {
                wiggle: 'loading 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite',
            },
            boxShadow: {
                primary: 'rgb(0 0 0 / 12%) 0px 4px 16px',
            },
            textColor: {
                primary: '#fe2c55',
            },
            backgroundColor: {
                primary: '#fe2c55',
            },
            borderColor: {
                primary: '#fe2c55',
            },
            transformOrigin: {
                cb: 'center bottom;',
            },
        },
    },
    plugins: [],
};
