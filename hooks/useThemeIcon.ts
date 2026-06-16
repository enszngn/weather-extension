import { useEffect } from 'react';

export function useThemeIcon() {
  useEffect(() => {
    const updateIconTheme = (e?: MediaQueryListEvent | MediaQueryList) => {
      const isLight = e ? e.matches : window.matchMedia('(prefers-color-scheme: light)').matches;
      const path = isLight ? {
        16: '/icon_light/16.png',
        32: '/icon_light/32.png',
        48: '/icon_light/48.png',
        96: '/icon_light/96.png',
        128: '/icon_light/128.png'
      } : {
        16: '/icon/16.png',
        32: '/icon/32.png',
        48: '/icon/48.png',
        96: '/icon/96.png',
        128: '/icon/128.png'
      };
      
      // Update action icon
      if (typeof browser !== 'undefined' && browser.action) {
        browser.action.setIcon({ path }).catch(console.error);
      }
    };

    const mediaQuery = window.matchMedia('(prefers-color-scheme: light)');
    updateIconTheme(mediaQuery);

    const listener = (e: MediaQueryListEvent) => updateIconTheme(e);
    mediaQuery.addEventListener('change', listener);
    return () => mediaQuery.removeEventListener('change', listener);
  }, []);
}
