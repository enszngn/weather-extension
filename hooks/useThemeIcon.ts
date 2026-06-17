import { useEffect } from 'react';

export function useThemeIcon() {
  useEffect(() => {
    const updateIconTheme = (_e?: MediaQueryListEvent | MediaQueryList) => {
      const path = {
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
