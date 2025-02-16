import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-geist-sans)", ...fontFamily.sans],
      },
      animation: {
        "bounce-once": "bounce 0.5s ease-in-out 1",
        pulse: "pulse 1s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "slide-left": "slide-left 0.5s ease-out forwards",
        "slide-right": "slide-right 0.5s ease-out forwards",
        clash: "clash 0.3s ease-in-out forwards",
      },
      keyframes: {
        "slide-left": {
          "0%": { transform: "translateX(100%)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
        "slide-right": {
          "0%": { transform: "translateX(-100%)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
        clash: {
          "0%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.2)" },
          "100%": { transform: "scale(1)" },
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
