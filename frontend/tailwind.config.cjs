/**
 * Tailwind CSS configuration (manual created because the Tailwind CLI is not available
 * via `npx` in this environment). This config targets the project's HTML and React
 * source files so Tailwind can tree-shake unused styles.
 */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx,vue}'
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
