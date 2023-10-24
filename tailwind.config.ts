import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.tsx'],
  theme: {
    extend: {
      fontFamily: {
        roboto: ['var(--font-roboto)'],
        inter: ['var(--font-inter)'],
      },
      colors: {
        blue_100: '#E8EEF7',
        blue_300: '#2A5EBC',
        blue_500: '#1A428A',

        gray_100: '#D5DDE9',
        gray_300: '#E3E4E7',
        gray_500: '#707070',
        gray_700: '#515C6F',
        gray_900: '#131523',

        green_500: '#2ED9C3',

        yellow_500: '#FFCD35',
        yellow_700: '#FFBA00',

        red_500: '#E74C3C',
      },
    },
  },
  plugins: [],
}
export default config
