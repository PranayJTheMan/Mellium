/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'zen': ['"Zen Maru Gothic"', 'ui-sans-serif', 'system-ui'],
      },
      colors: {
        zen: {
          bg: '#fafafa',        // Off-white background
          panel: '#f5f5f5',     // Light gray panels
          border: '#e0e0e0',    // Subtle borders
          text: '#2c2c2c',      // Dark gray text (not pure black)
          textLight: '#666666', // Medium gray for secondary text
          accent: '#4a90e2',    // Muted blue accent
          accentLight: '#e8f4fd', // Light blue for highlights
          overlay: 'rgba(44, 44, 44, 0.8)', // Dark overlay
          success: '#5cb85c',   // Muted green
          warning: '#f0ad4e',   // Muted orange
          error: '#d9534f',     // Muted red
        }
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      boxShadow: {
        'zen': '0 2px 8px rgba(0, 0, 0, 0.08)',
        'zen-lg': '0 4px 16px rgba(0, 0, 0, 0.12)',
      },
      borderRadius: {
        'zen': '8px',
      }
    },
  },
  plugins: [],
}
