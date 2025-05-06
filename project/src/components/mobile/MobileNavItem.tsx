import React from 'react';
import { NavItem } from '../../types/nav';

interface MobileNavItemProps {
  item: NavItem;
  onClick: () => void;
}

const MobileNavItem: React.FC<MobileNavItemProps> = ({ item, onClick }) => {
  const { label, icon: Icon } = item;
  
  return (
    <button
      onClick={onClick}
      className="group relative flex items-center space-x-3 text-white text-xl font-medium
        transform transition-all duration-300 hover:scale-110 px-8 py-3"
    >
      {/* Animated background */}
      <div className="absolute inset-0 w-0 bg-green-600/30 group-hover:w-full transition-all 
        duration-300 rounded-lg -z-10" />
      
      <Icon className="w-6 h-6 relative z-10" />
      <span className="relative z-10">{label}</span>
    </button>
  );
};

export default MobileNavItem;