import React from 'react';
import { TrendingUp, Award, Percent, Clock } from 'lucide-react';
import { RewardItem } from '../types/rewards';

interface StatsOverviewProps {
  items: RewardItem[];
}

export function StatsOverview({ items }: StatsOverviewProps) {
  const totalItems = items.length;
  const avgValueScore = items.reduce((sum, item) => sum + item.valueScore, 0) / totalItems;
  const avgSavings = items.reduce((sum, item) => sum + item.savingsPercentage, 0) / totalItems;
  const promotionCount = items.filter(item => item.isPromotion).length;

  const stats = [
    {
      icon: Award,
      label: 'Total Rewards',
      value: totalItems.toString(),
      color: 'blue'
    },
    {
      icon: TrendingUp,
      label: 'Avg Value Score',
      value: avgValueScore.toFixed(1),
      color: 'green'
    },
    {
      icon: Percent,
      label: 'Avg Savings',
      value: `${avgSavings.toFixed(1)}%`,
      color: 'purple'
    },
    {
      icon: Clock,
      label: 'Active Promotions',
      value: promotionCount.toString(),
      color: 'orange'
    }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      blue: 'bg-blue-100 text-blue-600',
      green: 'bg-green-100 text-green-600',
      purple: 'bg-purple-100 text-purple-600',
      orange: 'bg-orange-100 text-orange-600'
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {stats.map((stat, index) => (
        <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3">
            <div className={`p-2 rounded-lg ${getColorClasses(stat.color)}`}>
              <stat.icon className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm text-gray-600">{stat.label}</p>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}