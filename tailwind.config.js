/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");

// ค่าการกำหนดค่าของ Tailwind CSS เริ่มต้น
const tailwindCSSConfig = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/react-tailwindcss-datepicker/dist/index.esm.js",
  ],
  theme: {
    extend: {},
  },
  plugins: [require("@tailwindcss/forms")({})],
};

// ค่าการกำหนดค่าใหม่ที่ใช้งาน Material Tailwind
const materialTailwindConfig = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/react-tailwindcss-datepicker/dist/index.esm.js",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};

// รวมการกำหนดค่า Tailwind CSS และ Material Tailwind
const mergedConfig = {
  ...tailwindCSSConfig,
  ...withMT(materialTailwindConfig),
};

module.exports = mergedConfig;
