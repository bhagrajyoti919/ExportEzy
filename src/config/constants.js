// Application Constants
export const APP_CONFIG = {
  name: 'ExportEzy',
  version: '1.0.0',
  description: 'Modern logistics dashboard for Jayanita Exports'
};

// API Endpoints
export const API_ENDPOINTS = {
  DASHBOARD_STATS: '/api/dashboard/stats',
  SHIPMENTS: '/api/shipments',
  INVENTORY: '/api/inventory',
  CLIENTS: '/api/clients'
};

// Navigation Items
export const NAVIGATION_ITEMS = [
  { name: 'Dashboard', path: '/dashboard', icon: 'Home' },
  { name: 'Shipments', path: '/shipments', icon: 'Package' },
  { name: 'Inventory', path: '/inventory', icon: 'Warehouse' },
  { name: 'Clients', path: '/clients', icon: 'Users' }
];

// Shipment Status Options
export const SHIPMENT_STATUS = [
  { value: '', label: 'All Statuses' },
  { value: 'Preparing', label: 'Preparing' },
  { value: 'In Transit', label: 'In Transit' },
  { value: 'Customs Hold', label: 'Customs Hold' },
  { value: 'Delivered', label: 'Delivered' }
];

// Stock Level Options
export const STOCK_LEVELS = [
  { value: '', label: 'All Stock Levels' },
  { value: 'low', label: 'Low Stock (<50)' },
  { value: 'normal', label: 'Normal Stock (50-999)' },
  { value: 'high', label: 'High Stock (1000+)' }
];

// Client Status Options
export const CLIENT_STATUS = [
  { value: '', label: 'All Statuses' },
  { value: 'Active', label: 'Active' },
  { value: 'Inactive', label: 'Inactive' },
  { value: 'Pending', label: 'Pending' }
];

// Color Themes
export const THEME_COLORS = {
  primary: '#3b82f6',
  secondary: '#22c55e',
  success: '#10b981',
  warning: '#f59e0b',
  danger: '#ef4444',
  info: '#06b6d4'
};

// Default User
export const DEFAULT_USER = {
  id: 1,
  name: 'Jayanita Employee',
  email: 'demo@exportezy.com',
  role: 'Logistics Manager',
  avatar: 'https://ui-avatars.com/api/?name=Jayanita+Employee&background=3b82f6&color=fff'
};
