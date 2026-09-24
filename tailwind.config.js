/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      fontFamily: {
        display: ["var(--font-press-start-2p)", "monospace"],
        label: ["var(--font-vt323)", "monospace"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      transitionTimingFunction: {
        pixel: "steps(3, end)",
        "pixel-soft": "steps(6, end)",
      },
      boxShadow: {
        pixel: "4px 4px 0 var(--color-night-950)",
        "pixel-sm": "2px 2px 0 var(--color-night-950)",
        inset: "inset 2px 2px 0 rgba(255,255,255,.12), inset -2px -2px 0 rgba(0,0,0,.24)",
      },
    },
  },
};
