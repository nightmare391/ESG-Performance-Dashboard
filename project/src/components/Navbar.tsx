import React from 'react';
import { LineChart, Upload, Info } from 'lucide-react';
import { scrollToSection } from '../utils/scroll';
import MobileMenu from './mobile/MobileMenu';

export const navItems = [
  { id: 'about', label: 'About', icon: Info },
  { id: 'metrics', label: 'Metrics', icon: LineChart },
  { id: 'upload', label: 'Upload', icon: Upload }
];

const Navbar = () => {
  return (
    <nav className="fixed top-0 w-full bg-green-600 text-white shadow-lg z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-2">
            <LineChart className="w-6 h-6" />
            <span className="font-bold text-xl">ESG Dashboard</span>
          </div>
          
          <div className="hidden md:flex space-x-8">
            {navItems.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => scrollToSection(id)}
                className="flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium 
                  hover:bg-green-500 transition-colors duration-200"
              >
                <Icon className="w-4 h-4" />
                <span>{label}</span>
              </button>
            ))}
          </div>

          <MobileMenu />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;