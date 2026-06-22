import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/app/**/*.{ts,tsx}',
    './src/components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        wiki: {
          link: '#0645ad',
          text: '#202122',
          muted: '#54595d',
          border: '#a2a9b1',
          bg: '#f8f9fa',
          infobox: '#eaecf0',
        },
      },
    },
  },
  plugins: [],
}

export default config
