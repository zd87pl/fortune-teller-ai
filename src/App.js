import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import OptionsPage from './components/OptionsPage';
import FortunePage from './components/FortunePage';
import TarotPage from './components/TarotPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/options" element={<OptionsPage />} />
        <Route path="/fortune" element={<FortunePage />} />
        <Route path="/tarot" element={<TarotPage />} />
      </Routes>
    </Router>
  );
}

export default App;