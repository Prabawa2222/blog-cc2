import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        DmMonoLight: ["var(--font-dmmono-light)"],
        DmMonoMedium: ["var(--font-dmmono-medium)"],
        DmMonoRegular: ["var(--font-dmmono-regular)"],
        InterRegular: ["var(--font-inter-regular)"],
        InterSemiBold: ["var(--font-inter-semibold)"],
        InterBold: ["var(--font-inter-bold)"],
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: "#1a73e8",
        black: "#161B21",
        accent: "#34b7f1",
      },
    },
  },
  plugins: [],
} satisfies Config;
