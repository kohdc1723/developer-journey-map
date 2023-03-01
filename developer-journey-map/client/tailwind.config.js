/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./src/**/*.{js,jsx,ts,tsx}",
	],
	theme: {
		extend: {
			colors: {
			  'rev-green': '#91C859',
			  'rev-darkgreen': '#63883D',
			  'rev-black': '#2E352F',
			  'rev-white': '#F8F8F8',
			},
		  }
	},
	plugins: [],
}