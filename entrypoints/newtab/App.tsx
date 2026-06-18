import { useEffect, useState } from 'react';
import './App.css';
import { TopSites } from '../../components/TopSites/TopSites';
import { ReviewBubble } from '../../components/ReviewBubble/ReviewBubble';
import { useThemeIcon } from '../../hooks/useThemeIcon';

function App() {
  useThemeIcon();
  const [isEnabled, setIsEnabled] = useState<boolean | null>(null);

  useEffect(() => {
    browser.storage.local.get('enabled').then((res) => {
      const enabled = res.enabled !== false; // default to true if undefined
      setIsEnabled(enabled);

      if (!enabled) {
        // Redirect to browser's default page
        const userAgent = navigator.userAgent.toLowerCase();
        let targetUrl = 'chrome://new-tab-page/';
        if (userAgent.includes('firefox')) {
          targetUrl = 'about:home';
        }
        
        browser.tabs.getCurrent().then((tab) => {
          if (tab && tab.id !== undefined) {
            browser.tabs.update(tab.id, { url: targetUrl });
          } else {
            window.location.replace(targetUrl);
          }
        }).catch(() => {
          window.location.replace(targetUrl);
        });
      }
    });
  }, []);

  if (isEnabled === null || !isEnabled) {
    return <div className="layout" />;
  }

  return (
    <div className="layout">
      <iframe
        src="https://weather-insights.eneszengin542.workers.dev/"
        title="Weather"
        className="weather-iframe"
        allow="geolocation"
      />
      <div className="sidebar">
        <TopSites />
        <ReviewBubble />
      </div>
    </div>
  );
}

export default App;
