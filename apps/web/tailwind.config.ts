import daisyui from 'daisyui'
import { withTV } from 'tailwind-variants/transformer'
import type { Config } from 'tailwindcss'

import { getIconCollections, iconsPlugin } from '@egoist/tailwindcss-icons'
import typography from '@tailwindcss/typography'

require('./cssAsPlugin')

const twConfig: Config = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './index.html'],
  darkMode: ['class', '[data-theme="dark"]'],
  safelist: [],
  theme: {
    extend: {
      fontFamily: {
        sans: 'system-ui,-apple-system,PingFang SC,"Microsoft YaHei",Segoe UI,Roboto,Helvetica,noto sans sc,hiragino sans gb,"sans-serif",Apple Color Emoji,Segoe UI Emoji,Not Color Emoji',
        serif:
          '"Noto Serif CJK SC","Noto Serif SC",var(--font-serif),"Source Han Serif SC","Source Han Serif",source-han-serif-sc,SongTi SC,SimSum,"Hiragino Sans GB",system-ui,-apple-system,Segoe UI,Roboto,Helvetica,"Microsoft YaHei","WenQuanYi Micro Hei",sans-serif',
        mono: `"OperatorMonoSSmLig Nerd Font","Cascadia Code PL","FantasqueSansMono Nerd Font","operator mono",JetBrainsMono,"Fira code Retina","Fira code","Consolas", Monaco, "Hannotate SC", monospace, -apple-system`,
      },
      screens: {
        'light-mode': { raw: '(prefers-color-scheme: light)' },
        'dark-mode': { raw: '(prefers-color-scheme: dark)' },

        'w-screen': '100vw',
        'h-screen': '100vh',
      },
      maxWidth: {
        screen: '100vw',
      },
      width: {
        screen: '100vw',
      },
      height: {
        screen: '100vh',
      },
      maxHeight: {
        screen: '100vh',
      },

      colors: {
        themed: {
          bg_opacity: 'var(--bg-opacity)',
        },
      },
    },
  },

  daisyui: {
    logs: false,
    themes: [
      {
        light: {
          'color-scheme': 'light',
          primary: '#33A6B8',
          secondary: '#A8D8B9',
          accent: '#33A6B8',
          'accent-content': '#fafafa',
          neutral: '#C7C7CC',
          'base-100': '#fff',
          'base-content': '#000',
          info: '#007AFF',
          success: '#34C759',
          warning: '#FF9500',
          error: '#FF3B30',
          '--rounded-btn': '1.9rem',
          '--tab-border': '2px',
          '--tab-radius': '.5rem',
        },
      },
      {
        dark: {
          'color-scheme': 'dark',
          primary: '#F596AA',
          secondary: '#FB966E',
          accent: '#F596AA',
          neutral: '#48484A',
          'base-100': '#1C1C1E',
          'base-content': '#FFF',
          info: '#0A84FF',
          success: '#30D158',
          warning: '#FF9F0A',
          error: '#FF453A',
          '--rounded-btn': '1.9rem',
          '--tab-border': '2px',
          '--tab-radius': '.5rem',
        },
      },
    ],
    darkTheme: 'dark',
  },

  plugins: [
    iconsPlugin({
      collections: {
        ...getIconCollections(['mingcute']),
      },
    }),

    typography,
    daisyui,

    require('tailwind-scrollbar'),
    require('@tailwindcss/container-queries'),
    require('tailwindcss-animated'),

    require('./src/styles/theme.css'),
    require('./src/styles/layer.css'),
  ],
}

export default withTV(twConfig)
