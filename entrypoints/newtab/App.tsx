import './App.css';

function App() {
  return (
    <div className="iframe-container">
      <iframe
        src="https://weather-insights.eneszengin542.workers.dev/"
        title="Weather Insights"
        className="weather-iframe"
        allow="geolocation"
      />
    </div>
  );
}

export default App;
