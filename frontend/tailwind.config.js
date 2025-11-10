/** @type {import('tailwindcss').Config} */
module.exports = {
  // IMPORTANT: This tells Tailwind where to look for your classes (in src/core/domain, src/adapters/ui, etc.)
  content: [
    // This pattern scans all files with .js, .jsx, .ts, or .tsx extensions 
    // inside the 'src' folder
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}