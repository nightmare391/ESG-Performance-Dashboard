import React from 'react';
import { LucideIcon } from 'lucide-react';

interface ESGCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  className?: string;
}

const ESGCard: React.FC<ESGCardProps> = ({ icon: Icon, title, description, className = '' }) => {
  return (
    <div 
      className={`relative group bg-white p-6 rounded-lg shadow-md 
        transform transition-all duration-300 hover:scale-[1.02] hover:z-30
        ring-1 ring-transparent hover:ring-green-400 hover:ring-offset-4 ${className}`}
    >
      <div className="relative">
        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
          <Icon className="w-6 h-6 text-green-600" />
        </div>
        <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  );
};

export default ESGCard;