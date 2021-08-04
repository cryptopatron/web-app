module.exports = {
    purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
    darkMode: false, // or 'media' or 'class'
    theme: {

        extend: {

            fontFamily: {
                body: ['Poppins', 'sans-serif'],
                title: ['"Baloo Thambi 2"', 'cursive']
            },

            colors: {
                transparent: 'transparent',
                current: 'currentColor',
                primary: {
                    light: '#79d1c3',
                    DEFAULT: '#79d1c3',
                    dark: '#57827F',
                    hover:'#c6ece5'
                },
                secondary: {
                    light: '#6892D5',
                    DEFAULT: '#6892D5',
                    dark: '#3A5C90',
                },

                graywhite: {
                    100: '#f1f2f7',
                    DEFAULT: '#f1f2f7',
                    60: '#F6F6F6',
                }
            },
            screens: {
                'xxs': '360px',
            },
            boxShadow: {
                'float-900': '0px 0px 10px rgba(0, 0, 0, 0.13)',
                'float-900-hover': '0px 0px 10px rgba(0, 0, 0, 0.19)',
                'float-800': '0px 0px 10px rgba(0, 0, 0, 0.25)',
                'float-800-hover': '0px 0px 10px rgba(0, 0, 0, 0.31)',
                'float-down': '0 6px 0 #fff, 0 -1px 6px rgba(0,0,0, .25)',
                'float-down-1': '0 6px 0 #fff, 0 0px 2px rgba(0,0,0, .25)',
                'float-down-1-hover': '0 6px 0 #fff, 0 -1px 2px rgba(0,0,0, .25)',
                
            }
        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
}
