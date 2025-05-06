import React from 'react';
import Navbar from './components/Navbar';
import Header from './components/Header';
import AboutSection from './components/AboutSection';
import MetricsSection from './components/MetricsSection';
import UploadSection from './components/UploadSection';

function App() {
  return (
    <div className="min-h-screen w-full bg-gray-50 overflow-x-hidden">
      <Navbar />
      <Header />
      <AboutSection />
      <MetricsSection />
      <UploadSection />
    </div>
  );
}

export default App;