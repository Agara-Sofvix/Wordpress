import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import AboutPage from './pages/AboutPage';
import ServicesPage from './pages/ServicesPage';
import IndustriesPage from './pages/IndustriesPage';
import ContactPage from './pages/ContactPage';

const App: React.FC = () => {
  return (
    <Router>
      <main className="bg-background-dark text-[#111318] antialiased min-h-screen">
        <Routes>
          {/* Main Site Routes */}
          <Route path="/" element={<><Header /><Home /></>} />
          <Route path="/about" element={<><Header /><AboutPage /></>} />
          <Route path="/services" element={<><Header /><ServicesPage /></>} />
          <Route path="/industries" element={<><Header /><IndustriesPage /></>} />
          <Route path="/contact" element={<><Header /><ContactPage /></>} />
        </Routes>
      </main>
    </Router>
  );
};

export default App;
