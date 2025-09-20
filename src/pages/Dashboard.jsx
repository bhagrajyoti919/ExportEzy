import React from 'react';
import { Link } from 'react-router-dom';
import { useApi } from '../hooks/useApi';
import { Card, CardContent, CardTitle } from '../components/ui/Card';
import { 
  Package, 
  Warehouse, 
  Users, 
  TrendingUp, 
  AlertTriangle,
  CheckCircle,
  Clock,
  ArrowRight,
  Activity
} from 'lucide-react';

const Dashboard = () => {
  const { data: stats, loading: statsLoading } = useApi('/api/dashboard/stats');
  const { data: shipments, loading: shipmentsLoading } = useApi('/api/shipments');
  const { data: inventory, loading: inventoryLoading } = useApi('/api/inventory');

  const recentShipments = shipments?.slice(0, 5) || [];
  const lowStockItems = inventory?.filter(item => item.stockLevel < 50).slice(0, 4) || [];

  const StatCard = ({ title, value, icon: Icon, color, trend, description }) => (
    <Card className="hover:shadow-md transition-shadow duration-200">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
            <p className="text-3xl font-bold text-gray-900">{statsLoading ? '...' : value}</p>
            {trend && (
              <p className="text-xs text-gray-500 mt-1 flex items-center">
                <TrendingUp className="w-3 h-3 mr-1" />
                {trend}
              </p>
            )}
          </div>
          <div className={`p-3 rounded-full bg-${color}-100`}>
            <Icon className={`w-6 h-6 text-${color}-600`} />
          </div>
        </div>
        {description && (
          <p className="text-sm text-gray-500 mt-2">{description}</p>
        )}
      </CardContent>
    </Card>
  );

  return (
    <div className="p-4 lg:p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
          Dashboard Overview
        </h1>
        <p className="text-gray-600">
          Welcome back! Here's what's happening with your logistics operations.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-8">
        <StatCard
          title="Active Shipments"
          value={stats?.activeShipments || 0}
          icon={Package}
          color="primary"
          trend="+12% from last month"
          description="Currently in transit"
        />
        <StatCard
          title="Low Stock Items"
          value={stats?.lowStockItems || 0}
          icon={AlertTriangle}
          color="yellow"
          trend="Needs attention"
          description="Below threshold level"
        />
        <StatCard
          title="Total Clients"
          value={stats?.totalClients || 0}
          icon={Users}
          color="secondary"
          trend="+3 new this month"
          description="Active partnerships"
        />
        <StatCard
          title="Delivered This Month"
          value={stats?.deliveredThisMonth || 0}
          icon={CheckCircle}
          color="green"
          trend="+8% completion rate"
          description="Successfully completed"
        />
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Shipments */}
        <Card>
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center">
                <Activity className="w-5 h-5 mr-2 text-primary-600" />
                Recent Shipments
              </CardTitle>
              <Link 
                to="/shipments" 
                className="text-sm text-primary-600 hover:text-primary-700 flex items-center"
              >
                View All <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </div>
          </div>
          <CardContent className="p-0">
            {shipmentsLoading ? (
              <div className="p-6 text-center">
                <div className="animate-pulse space-y-3">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="h-16 bg-gray-100 rounded"></div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="divide-y divide-gray-200">
                {recentShipments.map((shipment) => (
                  <Link
                    key={shipment.id}
                    to={`/shipments/${shipment.id}`}
                    className="block p-4 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-3">
                          <div className={`w-3 h-3 rounded-full ${
                            shipment.status === 'Delivered' ? 'bg-green-500' :
                            shipment.status === 'In Transit' ? 'bg-blue-500' :
                            shipment.status === 'Customs Hold' ? 'bg-yellow-500' :
                            'bg-gray-500'
                          }`} />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 truncate">
                              {shipment.trackingNumber}
                            </p>
                            <p className="text-xs text-gray-500 truncate">
                              {shipment.origin} → {shipment.destination}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                          shipment.status === 'Delivered' 
                            ? 'bg-green-100 text-green-800'
                            : shipment.status === 'In Transit'
                            ? 'bg-blue-100 text-blue-800'
                            : shipment.status === 'Customs Hold'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {shipment.status}
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Low Stock Alert */}
        <Card>
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center">
                <Warehouse className="w-5 h-5 mr-2 text-yellow-600" />
                Low Stock Alert
              </CardTitle>
              <Link 
                to="/inventory" 
                className="text-sm text-primary-600 hover:text-primary-700 flex items-center"
              >
                View All <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </div>
          </div>
          <CardContent className="p-0">
            {inventoryLoading ? (
              <div className="p-6 text-center">
                <div className="animate-pulse space-y-3">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="h-16 bg-gray-100 rounded"></div>
                  ))}
                </div>
              </div>
            ) : lowStockItems.length === 0 ? (
              <div className="p-6 text-center text-gray-500">
                <CheckCircle className="w-12 h-12 mx-auto mb-2 text-green-500" />
                <p>All inventory levels are healthy!</p>
              </div>
            ) : (
              <div className="divide-y divide-gray-200">
                {lowStockItems.map((item) => (
                  <div key={item.id} className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {item.name}
                        </p>
                        <p className="text-xs text-gray-500 truncate">
                          {item.location}
                        </p>
                      </div>
                      <div className="text-right">
                        <span className="text-sm font-medium text-red-600">
                          {item.stockLevel} units
                        </span>
                        <p className="text-xs text-gray-500">Low stock</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="mt-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: Package, label: 'Track Shipment', href: '/shipments', color: 'primary' },
            { icon: Warehouse, label: 'Check Inventory', href: '/inventory', color: 'secondary' },
            { icon: Users, label: 'View Clients', href: '/clients', color: 'green' },
            { icon: TrendingUp, label: 'Analytics', href: '/dashboard', color: 'purple' }
          ].map((action) => (
            <Link
              key={action.label}
              to={action.href}
              className={`p-4 bg-${action.color}-50 border border-${action.color}-200 rounded-xl hover:bg-${action.color}-100 transition-colors text-center group`}
            >
              <action.icon className={`w-8 h-8 mx-auto mb-2 text-${action.color}-600 group-hover:scale-110 transition-transform`} />
              <p className={`text-sm font-medium text-${action.color}-700`}>{action.label}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
