import { defineConfig } from 'wxt';

// See https://wxt.dev/api/config.html
export default defineConfig({
  modules: ['@wxt-dev/module-react'],
  manifest: {
    permissions: ['storage'],
    host_permissions: [
      'https://*.internal/*',
      'https://enszngn.github.io/*',
      'https://weather-insights.eneszengin542.workers.dev/*'
    ]
  }
});
