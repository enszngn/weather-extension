import { defineConfig } from 'wxt';

// See https://wxt.dev/api/config.html
export default defineConfig({
  modules: ['@wxt-dev/module-react'],
  manifest: {
    name: 'Weather In New Tab',
    description: 'Exactly as the name implies.',
    permissions: ['storage', 'topSites', 'management'],
    icons: {
      16: 'icon/16.png',
      32: 'icon/32.png',
      48: 'icon/48.png',
      96: 'icon/96.png',
      128: 'icon/128.png',
    },
    host_permissions: [
      'https://*.internal/*',
      'https://enszngn.github.io/*',
      'https://weather-insights.eneszengin542.workers.dev/*'
    ]
  }
});

