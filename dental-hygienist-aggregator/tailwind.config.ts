import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'background': '#F8F9FA',
        'text-primary': '#212529',
        'primary': '#0D6EFD',
        'secondary': '#20C997',
        'border': '#DEE2E6',
        'white': '#FFFFFF',
      },
    },
  },
  plugins: [],
}
export default config
