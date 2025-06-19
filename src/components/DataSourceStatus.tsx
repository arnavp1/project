import React from 'react';
import { CheckCircle, AlertCircle, Clock, RefreshCw } from 'lucide-react';

interface DataSource {
  restaurant: string;
  logo: string;
  status: 'active' | 'error' | 'updating';
  lastUpdate: string;
  itemCount: number;
  source: string;
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

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Live Data Sources</h3>
        <button
          onClick={onRefresh}
          disabled={isRefreshing}
          className="flex items-center space-x-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 disabled:opacity-50"
        >
          <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
          <span>Refresh All</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sources.map((source, index) => (
          <div
            key={index}
            className={`p-4 rounded-lg border ${getStatusColor(source.status)}`}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <span className="text-xl">{source.logo}</span>
                <span className="font-medium text-gray-900">{source.restaurant}</span>
              </div>
              {getStatusIcon(source.status)}
            </div>
            
            <div className="text-sm text-gray-600 space-y-1">
              <div>Items: {source.itemCount}</div>
              <div>Source: {source.source}</div>
              <div>Updated: {source.lastUpdate}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 p-3 bg-blue-50 rounded-lg">
        <p className="text-sm text-blue-800">
          <strong>Real-time data collection:</strong> All reward information is scraped directly from restaurant websites and mobile apps. 
          Data refreshes automatically every 30 minutes to ensure accuracy.
        </p>
      </div>
    </div>
  );
}