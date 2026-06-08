/** @type {import('prettier').Config} */
const config = {
  // Default style (double quotes, semicolons) matches the existing codebase.
  plugins: ["prettier-plugin-tailwindcss"],
  // Tailwind v4: point the class-sorting plugin at the stylesheet that imports Tailwind.
  tailwindStylesheet: "./src/app/globals.css",
};

export default config;
