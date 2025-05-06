import React, { useState, useRef, useEffect } from 'react';
import { Edit2, Save, X } from 'lucide-react';
import { MetricCardProps, CategoryColors } from '../../types/metrics';

const categoryColors: CategoryColors = {
  environmental: 'bg-emerald-100 text-emerald-800',
  social: 'bg-blue-100 text-blue-800',
  governance: 'bg-purple-100 text-purple-800'
};

const MetricCard: React.FC<MetricCardProps> = ({ category, metricName, value, onSave, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(value);
  const [showControls, setShowControls] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const handleSave = () => {
    onSave(editValue);
    setIsEditing(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSave();
    }
  };

  return (
    <div
      className="relative group bg-white rounded-lg shadow-md p-6 transform transition-all duration-300
        hover:shadow-xl hover:-translate-y-1"
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
    >
      <div className={`absolute top-2 right-2 flex space-x-1 transition-opacity duration-300 
        ${showControls && !isEditing ? 'opacity-100' : 'opacity-0'}`}>
        <button
          onClick={() => onDelete()}
          className="p-1 rounded-full hover:bg-red-100 transition-colors group/delete"
        >
          <X className="w-4 h-4 text-red-600 group-hover/delete:text-red-700" />
        </button>
        <button
          onClick={() => setIsEditing(true)}
          className="p-1 rounded-full hover:bg-gray-100 transition-colors"
        >
          <Edit2 className="w-4 h-4 text-gray-600" />
        </button>
      </div>

      <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium mb-3
        ${categoryColors[category]}`}>
        {category.charAt(0).toUpperCase() + category.slice(1)}
      </span>

      <h3 className="text-lg font-semibold text-gray-800 mb-2">{metricName}</h3>

      {isEditing ? (
        <div className="relative">
          <input
            ref={inputRef}
            type="text"
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            onKeyPress={handleKeyPress}
            className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-green-500 
              focus:border-transparent outline-none"
          />
          <button
            onClick={handleSave}
            className="absolute left-1/2 transform -translate-x-1/2 mt-4 px-4 py-1
              bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors
              flex items-center space-x-1"
          >
            <Save className="w-4 h-4" />
            <span>Save</span>
          </button>
        </div>
      ) : (
        <p className="text-gray-600">{value}</p>
      )}
    </div>
  );
};

export default MetricCard;