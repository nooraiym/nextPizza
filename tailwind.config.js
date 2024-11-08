/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: {
            normal: "var(--color-brand-primary)",
            light: "var(--color-brand-primary-hover)",
          },
          secondary: {
            normal: "var(--color-brand-secondary)",
            light: "var(--color-brand-secondary-hover)",
          },
        },
        surface: {
          primary: "var(--color-ui-surface-primary)",
          secondary: "var(--color-ui-surface-secondary)",
          border: "var(--color-ui-border)",
        },
        text: {
          primary: "var(--color-ui-text-primary)",
          secondary: "var(--color-ui-text-secondary)",
          tertiary: "var(--color-ui-text-tertiary)",
          accent: "var(--color-ui-text-accent)",
          error: "var(--color-ui-text-error)",
        },
        input: {
          primary: "var(--color-ui-input-primary)",
          secondary: "var(--color-ui-input-secondary)",
          background: "var(--color-ui-input)",
        },
        badge: {
          bg: {
            neutral: "var(--color-ui-badge-bg-neutral)",
            success: "var(--color-ui-badge-bg-success)",
            error: "var(--color-ui-badge-bg-error)",
          },
          text: {
            neutral: "var(--color-ui-badge-text-neutral)",
            success: "var(--color-ui-badge-text-success)",
            error: "var(--color-ui-badge-text-error)",
          },
        },
      },
    },
  },
  plugins: [],
};
