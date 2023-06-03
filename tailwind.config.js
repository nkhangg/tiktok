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
                'white-opacity-34': 'rgba(22,24,35,.34)',
                'white-opacity-75': 'rgba(22,24,35,.75)',
                'white-opacity-90': 'rgba(22,24,35,.90)',
                'white-opacity-35': 'rgba(22,24,35,.35)',
                'white-opacity-03': 'rgba(22,35,0.03)',
                'white-opacity-50': 'rgba(22,24,35,0.5)',
                'white-opacity': 'rgb(22, 24, 35)',
                error: 'rgb(255,76,58)',
                sucess: 'rgb(11,224,155)',
            },
            backgroundColor: {
                primary: '#fe2c55',
                'black-opacity-75': 'rgba(22,24,35,.75)',
                'white-opacity-12': 'rgba(22,24,35,.12)',
                'white-opacity-2': 'rgba(22,24,35,.2)',
                'white-opacity-06': 'rgba(22,24,35,.06)',
                'white-opacity-08': 'rgba(22,24,35,.08)',
                'white-opacity-03': 'rgba(22,24,35,.03)',
                'white-opacity': 'rgb(22, 24, 35)',
                'white-upload': 'rgb(248, 248, 248)',
            },
            borderColor: {
                primary: '#fe2c55',
                'black-opacity-75': 'rgba(22,24,35,.75)',
                'white-opacity-12': 'rgba(22,24,35,.12)',
                'white-opacity-2': 'rgba(22,24,35,.2)',
                'white-opacity-06': 'rgba(22,24,35,.06)',
                'white-opacity': 'rgb(22, 24, 35)',
                error: 'rgb(255,76,58)',
                sucess: 'rgb(11,224,155)',
            },

            transformOrigin: {
                cb: 'center bottom;',
            },
            width: {
                120: '120px',
                'nav-profile': '232px',
                nav: '356px',
            },
            fontSize: {
                16: '16px',
            },
            minHeight: {
                70: '70vh',
            },
            caretColor: {
                primary: '#fe2c55',
            },
        },
    },
    plugins: [],
};
