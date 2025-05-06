import React, { useState } from 'react';

interface MetricCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const MetricCard: React.FC<MetricCardProps> = ({ title, description, icon }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleMouseEnter = () => {
    setIsFlipped(true);
  };

  const handleMouseLeave = () => {
    setIsFlipped(false);
  };

  return (
    <div
      className="h-64 w-full perspective"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className={`relative preserve-3d w-full h-full duration-500 ${
          isFlipped ? 'rotate-y-180' : ''
        }`}
      >
        <div className="absolute backface-hidden w-full h-full bg-white rounded-xl shadow-lg p-6">
          <div className="flex flex-col items-center justify-center h-full">
            <div className="text-green-600 mb-4">{icon}</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
          </div>
        </div>
        
        <div className="absolute backface-hidden w-full h-full bg-green-700 rounded-xl shadow-lg p-6 rotate-y-180">
          <div className="flex items-center justify-center h-full">
            <p className="text-white text-center">{description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MetricCard;