import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/shared/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        astraLightBlack: "#828282",
        astraGreyBg: "#F8F8F8",
        astraGrey: "#bdbdbd",
        astraGray: "#535353",
        astraSilver: "#E0E0E0",
        astraBlue: "#1D40C8",
        astraGreen: "#25C348",
        astraRed: "#EB3173",
        astraBorderGrey: "#F2F2F2",
        astraOffWhite: "#FAFAFA",
        astraTextGrey: "#4F4F4F",
      },
    },
  },
  plugins: [],
};
export default config;
