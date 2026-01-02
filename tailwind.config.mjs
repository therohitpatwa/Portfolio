/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	daisyui: {
		themes: [
			{
				lofi: {
					...require("daisyui/src/theming/themes")["lofi"],
					"--rounded-box": "1rem",
					"--rounded-btn": "0.5rem",
					"--rounded-badge": "1.9rem",
					"base-100": "#FFFFFF",
					"--b1": "100% 0 0", // oklch value for #FFFFFF
				},
				black: {
					...require("daisyui/src/theming/themes")["black"],
					"--rounded-box": "1rem",
					"--rounded-btn": "0.5rem",
					"--rounded-badge": "1.9rem",
					"secondary": "#e5e5e5",
					"base-100": "#000000",
					"--b1": "0% 0 0", // oklch value for #000000
				}
			}
		],
	},
	theme: {
		extend: {
			fontFamily: {
				'sans': ["DM Sans", "Inter", ...defaultTheme.fontFamily.sans],
			},
		},
	},
	plugins: [require("@tailwindcss/typography"), require("daisyui")],
}
