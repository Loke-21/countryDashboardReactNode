import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}"  // Add this line if your files are in src directory
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};

export default config;
