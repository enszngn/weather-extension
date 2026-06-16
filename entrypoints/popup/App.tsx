import { useState } from 'react';
import './App.css';
import { useThemeIcon } from '../../hooks/useThemeIcon';

function App() {
  useThemeIcon();
  // Since the popup is only accessible when the extension is active,
  // it is always initially enabled.
  const [enabled, setEnabled] = useState<boolean>(true);
  const [animating, setAnimating] = useState<boolean>(false);

  const toggle = async () => {
    if (animating) return;
    setAnimating(true);
    setEnabled(false);
    
    // Wait for the animation to play, then completely disable the extension.
    // This will close the popup and remove the new tab override.
    setTimeout(async () => {
      setAnimating(false);
      await browser.management.setEnabled(browser.runtime.id, false);
    }, 600);
  };

  return (
    <div className={`panel ${enabled ? 'panel-on' : 'panel-off'}`}>
      {/* Ambient glow orb */}
      <div className={`glow-orb ${enabled ? 'glow-on' : 'glow-off'}`} />

      {/* Status badge */}
      <div className={`status-badge ${enabled ? 'badge-on' : 'badge-off'}`}>
        <span className="badge-dot" />
        <span className="badge-text">{enabled ? 'Active' : 'Turning Off...'}</span>
      </div>

      {/* Big toggle button */}
      <button
        id="main-toggle"
        className={`toggle-btn ${enabled ? 'toggle-on' : 'toggle-off'} ${animating ? 'animating' : ''}`}
        onClick={toggle}
        aria-pressed={enabled}
        aria-label={`Turn extension ${enabled ? 'off' : 'on'}`}
      >
        <div className="toggle-ring" />
        <div className="toggle-ring toggle-ring-2" />
        <div className="power-icon">
          <svg width="52" height="52" viewBox="0 0 24 24" fill="none">
            <path
              d="M12 2.5C12 2.5 12 7 12 7M6.4 5.4C4.9 6.8 4 8.8 4 11C4 15.4 7.6 19 12 19C16.4 19 20 15.4 20 11C20 8.8 19.1 6.8 17.6 5.4"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          </svg>
        </div>
        <span className="toggle-label">{enabled ? 'ON' : 'OFF'}</span>
      </button>

      {/* Description */}
      <p className="panel-description">
        {enabled
          ? 'Extension is running and showing weather on your new tab.'
          : 'Extension disabled.'}
      </p>
    </div>
  );
}

export default App;
