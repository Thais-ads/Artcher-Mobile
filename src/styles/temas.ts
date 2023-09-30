import { extendTheme } from 'native-base'

export const TEMAS = extendTheme({
    colors: {
        gray: {
            300: '#8D8D99',
            500: '#ACB9B9',
            700: '#979A9A'
        },
        blue: {
            500: '#232D46',
            800: '#0D0F36'
        }, 
        green: {
            300: '#B9F1D6',
            500: '#69D2CD'
        },

        white:  '#FFFF',
        black:  '#000',
        cream:  '#F1F6CE',
        yellow: '#FFD600'
    },

    fontSizes: {
        xs: 12,
        sm: 14,
        md: 16,
        lg: 20,
        xl: 24,
        xxl: 26,
    }

})