import React, { useState } from 'react';
import { Code, Copy, CheckCircle, ExternalLink } from 'lucide-react';

interface APIEndpoint {
  method: string;
  path: string;
  description: string;
  parameters?: { name: string; type: string; required: boolean; description: string }[];
  response: string;
  example: string;
}

const API_ENDPOINTS: APIEndpoint[] = [
  {
    method: 'GET',
    path: '/restaurants',
    description: 'Get all restaurant chains',
    response: 'Array of restaurant objects with details',
    example: `curl -X GET "https://your-project.supabase.co/functions/v1/rewards-api/restaurants" \\
  -H "Authorization: Bearer YOUR_API_KEY"`
  },
  {
    method: 'GET',
    path: '/rewards',
    description: 'Get reward items with filtering and sorting options',
    parameters: [
      { name: 'restaurant', type: 'string', required: false, description: 'Filter by restaurant slug' },
      { name: 'minPoints', type: 'number', required: false, description: 'Minimum points required' },
      { name: 'maxPoints', type: 'number', required: false, description: 'Maximum points required' },
      { name: 'minValueScore', type: 'number', required: false, description: 'Minimum value score (0-100)' },
      { name: 'sortBy', type: 'string', required: false, description: 'Sort field (value_score, points_required, etc.)' },
      { name: 'sortOrder', type: 'string', required: false, description: 'Sort order (asc, desc)' },
      { name: 'limit', type: 'number', required: false, description: 'Number of results (max 100)' },
      { name: 'offset', type: 'number', required: false, description: 'Pagination offset' }
    ],
    response: 'Array of reward items with menu and restaurant details',
    example: `curl -X GET "https://your-project.supabase.co/functions/v1/rewards-api/rewards?restaurant=mcdonalds&minValueScore=70&sortBy=value_score&sortOrder=desc&limit=10" \\
  -H "Authorization: Bearer YOUR_API_KEY"`
  },
  {
    method: 'GET',
    path: '/promotions',
    description: 'Get active promotions',
    parameters: [
      { name: 'restaurant', type: 'string', required: false, description: 'Filter by restaurant slug' }
    ],
    response: 'Array of active promotion objects',
    example: `curl -X GET "https://your-project.supabase.co/functions/v1/rewards-api/promotions?restaurant=starbucks" \\
  -H "Authorization: Bearer YOUR_API_KEY"`
  },
  {
    method: 'GET',
    path: '/analytics',
    description: 'Get rewards analytics and statistics',
    response: 'Analytics object with aggregated data',
    example: `curl -X GET "https://your-project.supabase.co/functions/v1/rewards-api/analytics" \\
  -H "Authorization: Bearer YOUR_API_KEY"`
  },
  {
    method: 'GET',
    path: '/search',
    description: 'Search reward items by name or description',
    parameters: [
      { name: 'q', type: 'string', required: true, description: 'Search query' }
    ],
    response: 'Array of matching reward items',
    example: `curl -X GET "https://your-project.supabase.co/functions/v1/rewards-api/search?q=burger" \\
  -H "Authorization: Bearer YOUR_API_KEY"`
  }
];

export function APIDocumentation() {
  const [copiedExample, setCopiedExample] = useState<string | null>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedExample(id);
    setTimeout(() => setCopiedExample(null), 2000);
  };

  const getMethodColor = (method: string) => {
    switch (method) {
      case 'GET': return 'bg-green-100 text-green-800';
      case 'POST': return 'bg-blue-100 text-blue-800';
      case 'PUT': return 'bg-yellow-100 text-yellow-800';
      case 'DELETE': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-3">
        <Code className="w-8 h-8 text-blue-600" />
        <div>
          <h1 className="text-2xl font-bold text-gray-900">API Documentation</h1>
          <p className="text-gray-600">RESTful API for accessing restaurant rewards data</p>
        </div>
      </div>

      {/* Base URL */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h2 className="text-lg font-semibold text-blue-900 mb-2">Base URL</h2>
        <code className="text-blue-800 bg-blue-100 px-2 py-1 rounded">
          https://your-project.supabase.co/functions/v1/rewards-api
        </code>
      </div>

      {/* Authentication */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Authentication</h2>
        <p className="text-gray-600 mb-4">
          All API requests require authentication using a Bearer token in the Authorization header.
        </p>
        <div className="bg-gray-50 rounded-lg p-4">
          <code className="text-sm text-gray-800">
            Authorization: Bearer YOUR_API_KEY
          </code>
        </div>
      </div>

      {/* Rate Limiting */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Rate Limiting</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="text-2xl font-bold text-gray-900">1000</div>
            <div className="text-sm text-gray-600">Requests per hour</div>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="text-2xl font-bold text-gray-900">100</div>
            <div className="text-sm text-gray-600">Max results per request</div>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="text-2xl font-bold text-gray-900">5MB</div>
            <div className="text-sm text-gray-600">Max response size</div>
          </div>
        </div>
      </div>

      {/* Endpoints */}
      <div className="space-y-6">
        <h2 className="text-xl font-bold text-gray-900">API Endpoints</h2>
        
        {API_ENDPOINTS.map((endpoint, index) => (
          <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex items-center space-x-3 mb-2">
                <span className={`px-2 py-1 rounded text-xs font-medium ${getMethodColor(endpoint.method)}`}>
                  {endpoint.method}
                </span>
                <code className="text-lg font-mono text-gray-900">{endpoint.path}</code>
              </div>
              <p className="text-gray-600">{endpoint.description}</p>
            </div>

            <div className="px-6 py-4 space-y-4">
              {/* Parameters */}
              {endpoint.parameters && endpoint.parameters.length > 0 && (
                <div>
                  <h4 className="text-sm font-semibold text-gray-900 mb-2">Parameters</h4>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-gray-200">
                          <th className="text-left py-2 text-gray-600">Name</th>
                          <th className="text-left py-2 text-gray-600">Type</th>
                          <th className="text-left py-2 text-gray-600">Required</th>
                          <th className="text-left py-2 text-gray-600">Description</th>
                        </tr>
                      </thead>
                      <tbody>
                        {endpoint.parameters.map((param, paramIndex) => (
                          <tr key={paramIndex} className="border-b border-gray-100">
                            <td className="py-2 font-mono text-blue-600">{param.name}</td>
                            <td className="py-2 text-gray-600">{param.type}</td>
                            <td className="py-2">
                              <span className={`px-2 py-1 rounded text-xs ${param.required ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-600'}`}>
                                {param.required ? 'Required' : 'Optional'}
                              </span>
                            </td>
                            <td className="py-2 text-gray-600">{param.description}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Response */}
              <div>
                <h4 className="text-sm font-semibold text-gray-900 mb-2">Response</h4>
                <p className="text-gray-600 text-sm">{endpoint.response}</p>
              </div>

              {/* Example */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-sm font-semibold text-gray-900">Example Request</h4>
                  <button
                    onClick={() => copyToClipboard(endpoint.example, `${endpoint.method}-${endpoint.path}`)}
                    className="flex items-center space-x-1 text-sm text-gray-600 hover:text-gray-900 transition-colors duration-200"
                  >
                    {copiedExample === `${endpoint.method}-${endpoint.path}` ? (
                      <CheckCircle className="w-4 h-4 text-green-600" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                    <span>{copiedExample === `${endpoint.method}-${endpoint.path}` ? 'Copied!' : 'Copy'}</span>
                  </button>
                </div>
                <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                  <pre className="text-green-400 text-sm font-mono whitespace-pre-wrap">
                    {endpoint.example}
                  </pre>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Response Format */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Response Format</h2>
        <p className="text-gray-600 mb-4">All responses are returned in JSON format with the following structure:</p>
        
        <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
          <pre className="text-green-400 text-sm font-mono">
{`{
  "data": [...], // Array of results or single object
  "meta": {
    "total": 150,
    "limit": 50,
    "offset": 0,
    "has_more": true
  },
  "error": null
}`}
          </pre>
        </div>
      </div>

      {/* Error Codes */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Error Codes</h2>
        <div className="space-y-3">
          <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
            <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-sm font-medium">200</span>
            <span className="text-gray-900">OK - Request successful</span>
          </div>
          <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
            <span className="px-2 py-1 bg-red-100 text-red-800 rounded text-sm font-medium">400</span>
            <span className="text-gray-900">Bad Request - Invalid parameters</span>
          </div>
          <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
            <span className="px-2 py-1 bg-red-100 text-red-800 rounded text-sm font-medium">401</span>
            <span className="text-gray-900">Unauthorized - Invalid API key</span>
          </div>
          <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
            <span className="px-2 py-1 bg-red-100 text-red-800 rounded text-sm font-medium">429</span>
            <span className="text-gray-900">Too Many Requests - Rate limit exceeded</span>
          </div>
          <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
            <span className="px-2 py-1 bg-red-100 text-red-800 rounded text-sm font-medium">500</span>
            <span className="text-gray-900">Internal Server Error - Server error</span>
          </div>
        </div>
      </div>

      {/* SDKs and Libraries */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">SDKs and Libraries</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 border border-gray-200 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <span className="text-lg">🟨</span>
              <span className="font-medium">JavaScript/Node.js</span>
            </div>
            <code className="text-sm text-gray-600">npm install @rewards-analyzer/js-sdk</code>
          </div>
          <div className="p-4 border border-gray-200 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <span className="text-lg">🐍</span>
              <span className="font-medium">Python</span>
            </div>
            <code className="text-sm text-gray-600">pip install rewards-analyzer-python</code>
          </div>
          <div className="p-4 border border-gray-200 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <span className="text-lg">📱</span>
              <span className="font-medium">React Native</span>
            </div>
            <code className="text-sm text-gray-600">npm install @rewards-analyzer/react-native</code>
          </div>
          <div className="p-4 border border-gray-200 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <span className="text-lg">🔗</span>
              <span className="font-medium">REST Client</span>
            </div>
            <span className="text-sm text-gray-600">Use any HTTP client library</span>
          </div>
        </div>
      </div>

      {/* Support */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h2 className="text-lg font-semibold text-blue-900 mb-2">Need Help?</h2>
        <p className="text-blue-800 mb-4">
          Check out our additional resources for more information and support.
        </p>
        <div className="flex flex-wrap gap-3">
          <a
            href="#"
            className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            <ExternalLink className="w-4 h-4" />
            <span>API Reference</span>
          </a>
          <a
            href="#"
            className="inline-flex items-center space-x-2 px-4 py-2 bg-white text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors duration-200"
          >
            <span>Code Examples</span>
          </a>
          <a
            href="#"
            className="inline-flex items-center space-x-2 px-4 py-2 bg-white text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors duration-200"
          >
            <span>Support Forum</span>
          </a>
        </div>
      </div>
    </div>
  );
}