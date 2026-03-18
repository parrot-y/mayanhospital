import React from 'react';
import { BrowserRouter as Router, Routes, Route, ScrollRestoration } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/FooterRefined';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Contact from './pages/Contact';
import Team from './pages/Team';
import Blog from './pages/Blog';
import Appointment from './pages/Appointment';
import PricingPlan from './pages/PricingPlan';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-ovicare-dark text-ovicare-text font-jakarta selection:bg-ovicare-primary selection:text-ovicare-dark">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/team" element={<Team />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/appointment" element={<Appointment />} />
            <Route path="/pricing-plan" element={<PricingPlan />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
