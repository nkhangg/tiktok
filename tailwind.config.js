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
                'black-opacity-75': 'rgba(22,24,35,.75)',
                'white-opacity-12': 'rgba(22,24,35,.12)',
            },
            backgroundColor: {
                primary: '#fe2c55',
                'black-opacity-75': 'rgba(22,24,35,.75)',
                'white-opacity-12': 'rgba(22,24,35,.12)',
            },
            borderColor: {
                primary: '#fe2c55',
                'black-opacity-75': 'rgba(22,24,35,.75)',
                'white-opacity-12': 'rgba(22,24,35,.12)',
                'white-opacity-2': 'rgba(22,24,35,.2)',
            },
            transformOrigin: {
                cb: 'center bottom;',
            },
        },
    },
    plugins: [],
};
