import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  rippleui: {
    removeThemes: ["dark"],
		themes: [
			{
				themeName: "light",
				colorScheme: "light",
        prefersColorScheme: true,
				colors: {
					primary: "#235264",
					backgroundPrimary: "#964643",
				},
			},
		],
	},
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [require("rippleui")],
} satisfies Config;
