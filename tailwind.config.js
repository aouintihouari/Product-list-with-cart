// tailwind.config.js
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "custom-red": "#C73B0F",
        "custom-rose-900": "#260F08",
        "custom-rose-500": "#87635A",
        "custom-rose-400": "#AD8A85",
        "custom-rose-300": "#CAAFA7",
        "custom-rose-100": "#F5EEEC",
        "custom-rose-50": "#FCF8F6",
        "custom-green": "#1EA575",
      },
      spacing: {
        1100: "88px",
        500: "40px",
        400: "32px",
        300: "24px",
        200: "16px",
        150: "12px",
        100: "8px",
        50: "4px",
      },
      fontFamily: {
        redhat: ['"Red Hat Text"', "sans-serif"],
      },
      fontSize: {
        "preset-1": ["40px", { lineHeight: "1.2", letterSpacing: "0px" }],
        "preset-2": ["24px", { lineHeight: "1.25", letterSpacing: "0px" }],
        "preset-3": ["16px", { lineHeight: "1.5", letterSpacing: "0px" }],
        "preset-4": ["14px", { lineHeight: "1.5", letterSpacing: "0px" }],
      },
      fontWeight: {
        bold: "700",
        "semi-bold": "600",
        regular: "400",
      },
    },
  },
  plugins: [],
};
