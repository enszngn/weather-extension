import './App.css';
import { TopSites } from '../../components/TopSites/TopSites';
import { useThemeIcon } from '../../hooks/useThemeIcon';

function App() {
  useThemeIcon();
  return (
    <div className="layout">
      <iframe
        src="https://weather-insights.eneszengin542.workers.dev/"
        title="Weather"
        className="weather-iframe"
        allow="geolocation"
      />
      <TopSites />
    </div>
  );
}

export default App;
