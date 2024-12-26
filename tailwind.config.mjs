/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {fontFamily: {
			inter: ['Inter', 'sans-serif'],
		  },},
		  screens: {
			sm: '640px', // Small devices
			md: '768px', // Medium devices
			lg: '1024px', // Large devices
			xl: '1280px',
		  },
	},
	plugins: [],
}
