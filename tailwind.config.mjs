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
					"base-100": "#FFF8E7",
					"--b1": "98.5% 0.02 85", // oklch value for #FFF8E7
				},
				black: {
					...require("daisyui/src/theming/themes")["black"],
					"--rounded-box": "1rem",
					"--rounded-btn": "0.5rem",
					"--rounded-badge": "1.9rem",
					"secondary": "#e5e5e5",
					"base-100": "#0e0f11",
					"--b1": "7.5% 0.005 265", // oklch value for #0e0f11
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
