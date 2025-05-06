import React from 'react';
import { Leaf, Users, Building } from 'lucide-react';

const vectors = [
  {
    icon: Leaf,
    title: 'Environmental',
    description: 'Climate change, resource depletion, waste, pollution, deforestation'
  },
  {
    icon: Users,
    title: 'Social',
    description: 'Employee relations, diversity, working conditions, local communities, health and safety'
  },
  {
    icon: Building,
    title: 'Governance',
    description: 'Board composition, audit committee structure, executive compensation, shareholder rights'
  }
];

const ESGVectors = () => {
  return (
    <>
      {vectors.map(({ icon: Icon, title, description }) => (
        <div 
          key={title}
          className="relative group bg-white p-6 rounded-lg shadow-md 
            transform transition-all duration-300 hover:-translate-y-2"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-green-50 to-green-100 
            rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="relative">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <Icon className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
            <p className="text-gray-600">{description}</p>
          </div>
        </div>
      ))}
    </>
  );
};

export default ESGVectors;