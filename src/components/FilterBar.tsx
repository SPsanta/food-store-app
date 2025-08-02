import React from 'react';
import { Flame, Clock, Leaf, Heart } from 'lucide-react';

interface FilterBarProps {
  filters: string[];
  onFiltersChange: (filters: string[]) => void;
}

export const FilterBar: React.FC<FilterBarProps> = ({ filters, onFiltersChange }) => {
  const filterOptions = [
    { id: 'spicy', label: 'Острое', icon: Flame, color: 'red' },
    { id: 'quick', label: 'Быстрое', icon: Clock, color: 'blue' },
    { id: 'healthy', label: 'Здоровое', icon: Leaf, color: 'green' },
    { id: 'popular', label: 'Популярное', icon: Heart, color: 'pink' },
  ];

  const toggleFilter = (filterId: string) => {
    const newFilters = filters.includes(filterId)
      ? filters.filter(f => f !== filterId)
      : [...filters, filterId];
    onFiltersChange(newFilters);
  };

  return (
    <div className="px-4 py-3 bg-white/60 backdrop-blur-sm">
      <div className="flex space-x-3 overflow-x-auto">
        {filterOptions.map((option) => {
          const Icon = option.icon;
          const isActive = filters.includes(option.id);
          
          return (
            <button
              key={option.id}
              onClick={() => toggleFilter(option.id)}
              className={`flex-shrink-0 flex items-center space-x-2 px-4 py-2 rounded-full border-2 transition-all duration-200 ${
                isActive
                  ? `bg-${option.color}-100 border-${option.color}-500 text-${option.color}-700`
                  : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300'
              }`}
            >
              <Icon size={16} />
              <span className="text-sm font-medium whitespace-nowrap">{option.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};