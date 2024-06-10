import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/client/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#CCD5AE",
        secondary: "#FEFAE0",
        tertiary: "#FAEDCD",
      },
    },
  },
  plugins: [],
};
export default config;
