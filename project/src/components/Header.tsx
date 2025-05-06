import React from 'react';

const Header = () => {
  return (
    <div className="relative h-screen w-full">
      {/* Green section with background image */}
      <div className="relative h-[85vh] w-full bg-gradient-to-r from-green-600 to-green-400 text-white">
        {/* Background Image with Overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1500964757637-c85e8a162699?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2678&q=80")',
            backgroundPosition: 'center 30%'
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-green-600/70 to-green-400/70" />
        </div>

        {/* Content */}
        <div className="relative h-full container mx-auto px-4 flex flex-col items-center justify-center text-center">
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-4 sm:mb-6 leading-tight max-w-4xl">
            ESG Performance Dashboard
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl opacity-90 max-w-2xl mx-auto mb-6 sm:mb-8 px-4">
            Track, analyze, and improve your Environmental, Social, and Governance metrics with real-time insights
          </p>
        </div>
      </div>

      {/* White section with clip path */}
      <div 
        className="absolute bottom-0 w-full h-[30vh] bg-white" 
        style={{
          clipPath: "polygon(0 35%, 100% 0%, 100% 100%, 0% 100%)"
        }}
      />
    </div>
  );
};

export default Header;