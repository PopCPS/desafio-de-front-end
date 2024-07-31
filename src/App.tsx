import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Weather } from './pages/weather';
import { Home } from './pages/home';

export function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/weather/:city" element={<Weather />} />
      </Routes>
    </Router>
  )
}