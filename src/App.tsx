import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { CityWeather } from './pages/weather-page';
import { Home } from './pages/home';

export function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/weather/:city" element={<CityWeather />} />
      </Routes>
    </Router>
  )
}