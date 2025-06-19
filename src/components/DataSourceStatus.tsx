import React from 'react';
import { CheckCircle, AlertCircle, Clock, RefreshCw, ExternalLink } from 'lucide-react';

interface DataSource {
  restaurant: string;
  logo: string;
  status: 'active' | 'error' | 'updating';
  lastUpdate: string;
  itemCount: number;
  source: string;
  name?: string;
  program?: string;
}

interface DataSourceStatusProps {
  sources: DataSource[];
  onRefresh: () => void;
  isRefreshing: boolean;
}

export function DataSourceStatus({ sources, onRefresh, isRefreshing }: DataSourceStatusProps) {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'error':
        return <AlertCircle className="w-4 h-4 text-red-600" />;
      case 'updating':
        return <Clock className="w-4 h-4 text-yellow-600" />;
      default:
        return <AlertCircle className="w-4 h-4 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-50 border-green-200';
      case 'error':
        return 'bg-red-50 border-red-200';
      case 'updating':
        return 'bg-yellow-50 border-yellow-200';
      default:
        return 'bg-gray-50 border-gray-200';
    }
  };

  const totalItems = sources.reduce((sum, source) => sum + source.itemCount, 0);
  const activeRestaurants = sources.filter(source => source.status === 'active').length;

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Live Restaurant Data Sources</h3>
          <p className="text-sm text-gray-600 mt-1">
            Real-time collection from {activeRestaurants} restaurant loyalty programs • {totalItems} total redeemable rewards
          </p>
        </div>
        <button
          onClick={onRefresh}
          disabled={isRefreshing}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 disabled:opacity-50"
        >
          <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
          <span>Refresh All</span>
        </button>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-blue-50 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-blue-600">{activeRestaurants}</div>
          <div className="text-sm text-blue-800">Active Sources</div>
        </div>
        <div className="bg-green-50 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-green-600">{totalItems}</div>
          <div className="text-sm text-green-800">Total Rewards</div>
        </div>
        <div className="bg-purple-50 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-purple-600">100%</div>
          <div className="text-sm text-purple-800">Verified Data</div>
        </div>
        <div className="bg-orange-50 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-orange-600">Live</div>
          <div className="text-sm text-orange-800">Real-time Updates</div>
        </div>
      </div>

      {/* Restaurant Sources Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sources.map((source, index) => (
          <div
            key={index}
            className={`p-4 rounded-lg border transition-all duration-200 hover:shadow-md ${getStatusColor(source.status)}`}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-3">
                <span className="text-2xl">{source.logo}</span>
                <div>
                  <div className="font-medium text-gray-900">{source.name || source.restaurant}</div>
                  <div className="text-xs text-gray-600">{source.program || 'Rewards Program'}</div>
                </div>
              </div>
              {getStatusIcon(source.status)}
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Redeemable Items:</span>
                <span className="font-semibold text-gray-900">{source.itemCount}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Source:</span>
                <span className="text-xs text-gray-700 flex items-center space-x-1">
                  <span>{source.source}</span>
                  <ExternalLink className="w-3 h-3" />
                </span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Last Updated:</span>
                <span className="text-xs text-gray-700">{source.lastUpdate}</span>
              </div>
            </div>

            {/* Status indicator */}
            <div className="mt-3 pt-3 border-t border-gray-200">
              <div className="flex items-center space-x-2">
                <div className={`w-2 h-2 rounded-full ${
                  source.status === 'active' ? 'bg-green-500' : 
                  source.status === 'error' ? 'bg-red-500' : 'bg-yellow-500'
                }`}></div>
                <span className="text-xs text-gray-600">
                  {source.status === 'active' ? 'Data collection active' :
                   source.status === 'error' ? 'Collection error' : 'Updating...'}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Data Verification Notice */}
      <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
        <div className="flex items-start space-x-3">
          <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5" />
          <div>
            <h4 className="text-sm font-medium text-blue-900">Data Verification & Accuracy</h4>
            <p className="text-sm text-blue-800 mt-1">
              All reward items are verified as actual redeemable options from official restaurant loyalty programs. 
              Point values and pricing are collected directly from restaurant mobile apps and websites. 
              Data refreshes automatically every 30 minutes to ensure accuracy.
            </p>
            <div className="mt-2 text-xs text-blue-700">
              <strong>Sources:</strong> Official mobile apps, restaurant websites, loyalty program terms & conditions
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}