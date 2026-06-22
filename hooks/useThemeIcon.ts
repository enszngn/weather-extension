import { useEffect } from 'react';

export function useThemeIcon() {
  useEffect(() => {
    const updateIconTheme = (e?: MediaQueryListEvent | MediaQueryList) => {
      const isLight = e ? e.matches : window.matchMedia('(prefers-color-scheme: light)').matches;
      const theme = isLight ? 'light' : 'dark';

      const path = {
        16: `/icon/${theme}-16.png`,
        32: `/icon/${theme}-32.png`,
        48: `/icon/${theme}-48.png`,
        96: `/icon/${theme}-96.png`,
        128: `/icon/${theme}-128.png`
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
