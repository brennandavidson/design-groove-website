import React, { useState, useEffect } from 'react';
import { ReactLenis } from 'lenis/react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Preloader from './components/Preloader';
import Home from './pages/Home';
import WorkCollection from './pages/WorkCollection';
import ProjectDetail from './pages/ProjectDetail';
import ServicesPage from './pages/Services';
import ContactPage from './pages/ContactPage';
import BookPage from './pages/BookPage';
import ProcessPage from './pages/ProcessPage';
import AboutPage from './pages/AboutPage';

function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 900);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const content = (
    <div className="App">
      <Preloader onComplete={() => setIsLoaded(true)} />
      
      {/* Fixed Navigation (Always on top) */}
      <Navbar />
      
      <Routes>
        <Route path="/" element={<Home isLoaded={isLoaded} />} />
        <Route path="/work" element={<WorkCollection />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/work/:slug" element={<ProjectDetail />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/book" element={<BookPage />} />
        <Route path="/process" element={<ProcessPage />} />
        <Route path="/about" element={<AboutPage />} />
      </Routes>
    </div>
  );

  return !isMobile ? (
    <ReactLenis root>
      {content}
    </ReactLenis>
  ) : (
    content
  );
}

export default App;
