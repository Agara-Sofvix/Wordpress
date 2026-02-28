import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import AboutPage from './pages/AboutPage';
import ServicesPage from './pages/ServicesPage';
import IndustriesPage from './pages/IndustriesPage';
import ContactPage from './pages/ContactPage';

const App: React.FC = () => {
  return (
    <Router>
      <ScrollToTop />
      <main className="bg-background-dark text-[#111318] antialiased min-h-screen">
        <Routes>
          {/* Main Site Routes */}
          <Route path="/" element={<><Header /><Home /><Footer /></>} />
          <Route path="/about" element={<><Header /><AboutPage /><Footer /></>} />
          <Route path="/services" element={<><Header /><ServicesPage /><Footer /></>} />
          <Route path="/industries" element={<><Header /><IndustriesPage /><Footer /></>} />
          <Route path="/contact" element={<><Header /><ContactPage /><Footer /></>} />
        </Routes>
      </main>
    </Router>
  );
};

export default App;
