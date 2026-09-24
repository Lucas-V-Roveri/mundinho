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
        pixel: "steps(4, end)",
        "pixel-soft": "steps(6, end)",
      },
      boxShadow: {
        pixel: "5px 5px 0 var(--color-night-950)",
        "pixel-sm": "3px 3px 0 var(--color-night-950)",
        inset:
          "inset 2px 2px 0 var(--pixel-highlight), inset -2px -2px 0 var(--pixel-lowlight)",
      },
    },
  },
};
