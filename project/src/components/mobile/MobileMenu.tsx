import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { navItems } from '../Navbar';
import { scrollToSection } from '../../utils/scroll';

const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleNavClick = (id: string) => {
    scrollToSection(id);
    setIsOpen(false);
  };

  return (
    <div className="md:hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 focus:outline-none"
      >
        <Menu className="w-6 h-6" />
      </button>

      <div
        className={`fixed inset-0 bg-green-600 transition-transform duration-700 ease-in-out ${
          isOpen ? 'translate-y-0' : '-translate-y-full'
        }`}
        style={{
          clipPath: 'circle(200% at top right)',
          transition: 'clip-path 1s ease-in-out, transform 0.1s 0.5s'
        }}
      >
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-4 p-2 text-white hover:bg-green-500 rounded-full transition-colors duration-200"
        >
          <X className="w-6 h-6" />
        </button>

        <div className={`flex flex-col items-center justify-center h-full space-y-8 
          transition-opacity duration-500 ${isOpen ? 'opacity-100' : 'opacity-0'}`}>
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className="group relative flex items-center space-x-3 text-white text-xl font-medium
                transform transition-all duration-300 hover:scale-105"
            >
              <div className="absolute inset-0 -m-2 w-[calc(100%+1rem)] h-[calc(100%+1rem)] 
                border border-white/80 rounded-lg opacity-0 group-hover:opacity-100 
                transition-all duration-300 shadow-[0_0_5px_rgba(255,255,255,0.2)] 
                group-hover:shadow-[0_0_8px_rgba(255,255,255,0.3)]" />
              <item.icon className="w-6 h-6 relative z-10" />
              <span className="relative z-10 px-4 py-2">{item.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;