import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./ui/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'inter': ['Inter', 'sans-serif'],
      },
      scale: {
        '150': '1.5',
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      borderRadius: {
        'strict-top': "14px 14px 0 0",
      },
      scrollbar: {
        thumb: {
          'rounded-full': 'rounded-full',
          'bg-gray-900': 'bg-gray-900',
        },
        track: {
          'rounded-full': 'rounded-full',
          'bg-gray-100': 'bg-gray-100',
        },
        transitionDuration: {
          '2000': '2000ms',  // Adds a 2000ms duration
          '3000': '3000ms'   // Adds a 3000ms duration
        }
      },
    },
  },
  
  plugins: [
    require('tailwind-scrollbar'),
  ],
};
export default config;
