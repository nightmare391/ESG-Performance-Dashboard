import React from 'react';

const LearnMoreButton = () => {
  return (
    <a 
      href="https://esgmatters.asia/esgdashboard/"
      target="_blank"
      rel="noopener noreferrer"
      className="group relative inline-block px-6 py-2 text-lg font-medium overflow-hidden transition-all duration-300 
        hover:scale-105 hover:shadow-lg active:shadow-none active:scale-95"
    >
      <span className="relative z-10 text-green-600 group-hover:text-white decoration-green-600 
        group-hover:decoration-white underline underline-offset-4 transition-colors duration-300">
        Learn More
      </span>
      <div className="absolute inset-0 w-0 bg-green-600 group-hover:w-full transition-all duration-300 ease-out"></div>
    </a>
  );
};

export default LearnMoreButton;