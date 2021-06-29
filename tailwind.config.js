module.exports = {
    purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
    darkMode: false, // or 'media' or 'class'
    theme: {

        extend: {

            fontFamily:{
                body: ['Poppins', 'sans-serif']
            },

            colors: {
                transparent: 'transparent',
                current: 'currentColor',
                primary: {
                    light: '#79d1c3',
                    DEFAULT: '#79d1c3',
                    dark: '#57827F',
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
            }
        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
}
