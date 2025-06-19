import React from 'react';
import { ChevronDown, ArrowUpDown } from 'lucide-react';
import { SortOption } from '../types/rewards';

interface SortControlsProps {
  currentSort: SortOption;
  onSortChange: (sort: SortOption) => void;
  totalItems: number;
}

export function SortControls({ currentSort, onSortChange, totalItems }: SortControlsProps) {
  const sortOptions: SortOption[] = [
    { key: 'valueScore', direction: 'desc', label: 'Best Value' },
    { key: 'valueScore', direction: 'asc', label: 'Lowest Value' },
    { key: 'points', direction: 'asc', label: 'Fewest Points' },
    { key: 'points', direction: 'desc', label: 'Most Points' },
    { key: 'retailPrice', direction: 'asc', label: 'Lowest Price' },
    { key: 'retailPrice', direction: 'desc', label: 'Highest Price' },
    { key: 'savingsPercentage', direction: 'desc', label: 'Best Savings' },
    { key: 'name', direction: 'asc', label: 'Name A-Z' }
  ];

  return (
    <div className="flex items-center justify-between bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-6">
      <div className="flex items-center space-x-4">
        <span className="text-sm text-gray-600">
          Showing <span className="font-semibold">{totalItems}</span> reward options
        </span>
      </div>
      
      <div className="flex items-center space-x-2">
        <ArrowUpDown className="w-4 h-4 text-gray-500" />
        <span className="text-sm text-gray-600">Sort by:</span>
        <div className="relative">
          <select
            value={`${currentSort.key}-${currentSort.direction}`}
            onChange={(e) => {
              const [key, direction] = e.target.value.split('-');
              const option = sortOptions.find(opt => opt.key === key && opt.direction === direction);
              if (option) onSortChange(option);
            }}
            className="appearance-none bg-white border border-gray-300 rounded-lg px-3 py-2 pr-8 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none cursor-pointer"
          >
            {sortOptions.map((option, index) => (
              <option key={index} value={`${option.key}-${option.direction}`}>
                {option.label}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
        </div>
      </div>
    </div>
  );
}