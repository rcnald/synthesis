/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors:{
        'primary':{
          '600':'var(--color-primary-600)',
          '100':'var(--color-primary-100)',
        },
        'background':{
          '900':'var(--theme-color-background-900)',
          '800':'var(--theme-color-background-800)',
          '700':'var(--theme-color-background-700)',
        },
        'text':{
          '500':'var(--theme-color-text-500)',
          '300':'var(--theme-color-text-300)',
          '100':'var(--theme-color-text-100)',
        },
        'button':{
          '900':'var(--theme-color-button-900)',
          '500':'var(--theme-color-button-500)',
          '100':'var(--theme-color-button-100)',
        },
      },
      fontFamily:{
        'main':'var(--ff-main)',
      }
    },
  },
  plugins: [],
}
