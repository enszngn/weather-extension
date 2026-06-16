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

export function TopSites() {
  const [sites, setSites] = useState<TopSite[]>([]);

  useEffect(() => {
    if (typeof browser !== 'undefined' && browser.topSites) {
      browser.topSites.get().then((topSites) => {
        setSites(topSites.slice(0, 6));
      });
    }
  }, []);

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
