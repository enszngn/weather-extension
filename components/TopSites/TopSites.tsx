import { useEffect, useState } from 'react';
import './TopSites.css';

interface TopSite {
  url: string;
  title: string;
}

function getFaviconUrl(url: string): string {
  try {
    const { origin } = new URL(url);
    return `https://www.google.com/s2/favicons?domain=${origin}&sz=64`;
  } catch {
    return '';
  }
}

function getDisplayTitle(site: TopSite): string {
  if (site.title) return site.title;
  try {
    return new URL(site.url).hostname.replace(/^www\./, '');
  } catch {
    return site.url;
  }
}

/**
 * Returns how many site bubbles to show based on the current viewport width.
 * Targets 4 bubbles at 1920px and scales linearly, clamped to [2, 6].
 *
 * Examples:
 *   768px  → 2
 *   1280px → 3
 *   1920px → 4  (reference)
 *   2560px → 5
 *   3840px → 6  (capped)
 */
function getMaxSites(): number {
  return Math.max(2, Math.min(6, Math.round((window.innerWidth * 4) / 1920)));
}

export function TopSites() {
  const [allSites, setAllSites] = useState<TopSite[]>([]);
  const [maxSites, setMaxSites] = useState<number>(getMaxSites());

  // Fetch top sites once
  useEffect(() => {
    if (typeof browser !== 'undefined' && browser.topSites) {
      browser.topSites.get().then((topSites) => {
        // Store up to 6 so we have a pool to slice from on resize
        setAllSites(topSites.slice(0, 6));
      });
    }
  }, []);

  // Recalculate visible count whenever the window is resized
  useEffect(() => {
    const handleResize = () => setMaxSites(getMaxSites());
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const sites = allSites.slice(0, maxSites);

  if (sites.length === 0) return null;

  return (
    <nav className="top-sites" aria-label="Most visited sites">
      {sites.map((site) => (
        <a
          key={site.url}
          href={site.url}
          className="top-sites__bubble"
          title={getDisplayTitle(site)}
          aria-label={getDisplayTitle(site)}
        >
          <img
            src={getFaviconUrl(site.url)}
            alt=""
            className="top-sites__favicon"
            width={28}
            height={28}
            loading="lazy"
          />
          <span className="top-sites__tooltip">{getDisplayTitle(site)}</span>
        </a>
      ))}
    </nav>
  );
}
