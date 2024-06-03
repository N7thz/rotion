import plugin from "tailwindcss/plugin"
import animate from "tailwindcss-animate"
import typography from "@tailwindcss/typography"

/** @type {import("tailwindcss").Config} */

export const content = ["./src/**/*.tsx"]

export const theme = {
  container: {
    center: true,
    padding: "2rem",
    screens: {
      "2xl": "1400px",
    },
  },
  extend: {
    fontFamily: {
      sans: "JetBrains Mono, sans-serif",
    },
    colors: {
      rotion: {
        50: "#ebeaed",
        100: "#c1bfc7",
        200: "#a3a0ac",
        300: "#797486",
        400: "#5f596e",
        500: "#37304a",
        600: "#322c43",
        700: "#272235",
        800: "#1e1a29",
        900: "#17141f",
      },
      border: "hsl(var(--border))",
      input: "hsl(var(--input))",
      ring: "hsl(var(--ring))",
      background: "hsl(var(--background))",
      foreground: "hsl(var(--foreground))",
      primary: {
        DEFAULT: "hsl(var(--primary))",
        foreground: "hsl(var(--primary-foreground))",
      },
      secondary: {
        DEFAULT: "hsl(var(--secondary))",
        foreground: "hsl(var(--secondary-foreground))",
      },
      destructive: {
        DEFAULT: "hsl(var(--destructive))",
        foreground: "hsl(var(--destructive-foreground))",
      },
      muted: {
        DEFAULT: "hsl(var(--muted))",
        foreground: "hsl(var(--muted-foreground))",
      },
      accent: {
        DEFAULT: "hsl(var(--accent))",
        foreground: "hsl(var(--accent-foreground))",
      },
      popover: {
        DEFAULT: "hsl(var(--popover))",
        foreground: "hsl(var(--popover-foreground))",
      },
      card: {
        DEFAULT: "hsl(var(--card))",
        foreground: "hsl(var(--card-foreground))",
      },
    },
    borderRadius: {
      lg: `var(--radius)`,
      md: `calc(var(--radius) - 2px)`,
      sm: "calc(var(--radius) - 4px)",
    },
    keyframes: {
      "accordion-down": {
        from: { height: "0" },
        to: { height: "var(--radix-accordion-content-height)" },
      },
      "accordion-up": {
        from: { height: "var(--radix-accordion-content-height)" },
        to: { height: "0" },
      },
    },
    animation: {
      "accordion-down": "accordion-down 0.2s ease-out",
      "accordion-up": "accordion-up 0.2s ease-out",
    },
  },
}
export const plugins = [
  animate, 
  typography,
  plugin(({ addUtilities }) => {
    addUtilities({
      ".region-drag": {
        "-webkit-app-region": "drag"
      },
      ".region-no-drag": {
        "-webkit-app-region": "mo-drag"
      }
    })
  }) 
]
