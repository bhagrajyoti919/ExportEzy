import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApi } from '../hooks/useApi';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import Progress from '../components/ui/Progress';
import { 
  Package, 
  Search, 
  Filter, 
  MapPin, 
  Calendar,
  Truck,
  Ship,
  Plane,
  Clock,
  CheckCircle,
  AlertCircle,
  Eye
} from 'lucide-react';

const Shipments = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const { data: shipments, loading } = useApi('/api/shipments');
  
  console.log('Shipments component - data:', shipments, 'loading:', loading);

  const filteredShipments = shipments?.filter(shipment => {
    const matchesSearch = shipment.trackingNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         shipment.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         shipment.destination.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = !statusFilter || shipment.status === statusFilter;
    return matchesSearch && matchesStatus;
  }) || [];

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Delivered': return CheckCircle;
      case 'In Transit': return Truck;
      case 'Customs Hold': return AlertCircle;
      case 'Preparing': return Package;
      default: return Clock;
    }
  };

  const getCarrierIcon = (carrier) => {
    if (carrier.includes('Maritime') || carrier.includes('Maersk')) return Ship;
    if (carrier.includes('DHL') || carrier.includes('FedEx') || carrier.includes('UPS')) return Plane;
    return Truck;
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Delivered': return 'success';
      case 'In Transit': return 'primary';
      case 'Customs Hold': return 'warning';
      case 'Preparing': return 'secondary';
      default: return 'secondary';
    }
  };

  if (loading) {
    return (
      <div className="p-4 lg:p-6 max-w-7xl mx-auto">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-gray-200 rounded w-1/3"></div>
          <div className="h-16 bg-gray-200 rounded"></div>
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-32 bg-gray-200 rounded"></div>
          ))}
        </div>
      </div>
    );
  }

  // Debug: Show data status
  if (!loading && !shipments) {
    return (
      <div className="p-4 lg:p-6 max-w-7xl mx-auto">
        <div className="text-center">
          <h2 className="text-xl font-bold text-red-600">No Shipments Data</h2>
          <p className="text-gray-600">Shipments data is null or undefined</p>
          <p className="text-sm text-gray-500">Loading: {loading.toString()}, Data: {shipments ? 'exists' : 'null'}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 lg:p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
          Shipment Tracking
        </h1>
        <p className="text-gray-600">
          Monitor and track all your shipments in real-time
        </p>
      </div>

      {/* Filters */}
      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by tracking number, client, or destination..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent appearance-none bg-white"
              >
                <option value="">All Statuses</option>
                <option value="Preparing">Preparing</option>
                <option value="In Transit">In Transit</option>
                <option value="Customs Hold">Customs Hold</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Shipments List */}
      <div className="space-y-4">
        {filteredShipments.length === 0 ? (
          <Card>
            <CardContent className="p-12 text-center">
              <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No shipments found</h3>
              <p className="text-gray-500">
                {searchTerm || statusFilter 
                  ? 'Try adjusting your search or filter criteria'
                  : 'No shipments available at the moment'
                }
              </p>
            </CardContent>
          </Card>
        ) : (
          filteredShipments.map((shipment) => {
            const StatusIcon = getStatusIcon(shipment.status);
            const CarrierIcon = getCarrierIcon(shipment.carrier);
            
            return (
              <Card key={shipment.id} className="hover:shadow-md transition-shadow duration-200">
                <CardContent className="p-6">
                  {/* Mobile Layout */}
                  <div className=" space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <StatusIcon className={`w-5 h-5 text-${getStatusColor(shipment.status) === 'success' ? 'green' : getStatusColor(shipment.status) === 'warning' ? 'yellow' : getStatusColor(shipment.status) === 'primary' ? 'blue' : 'gray'}-600`} />
                        <div>
                          <h3 className="font-semibold text-gray-900">{shipment.trackingNumber}</h3>
                          <p className="text-sm text-gray-600">{shipment.client}</p>
                        </div>
                      </div>
                      <span className={`px-3 py-1 text-xs font-medium rounded-full ${
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

                    <div className="space-y-2">
                      <div className="flex items-center text-sm text-gray-600">
                        <MapPin className="w-4 h-4 mr-2" />
                        {shipment.origin} → {shipment.destination}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Calendar className="w-4 h-4 mr-2" />
                        Est. Delivery: {new Date(shipment.estimatedDelivery).toLocaleDateString()}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <CarrierIcon className="w-4 h-4 mr-2" />
                        {shipment.carrier}
                      </div>
                    </div>

                    {shipment.status !== 'Delivered' && (
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-600">Progress</span>
                          <span className="font-medium">{shipment.progress}%</span>
                        </div>
                        <Progress value={shipment.progress} color={getStatusColor(shipment.status)} />
                      </div>
                    )}

                    <div className="flex justify-between items-center pt-2 border-t">
                      <div className="text-sm text-gray-600">
                        <span className="font-medium">Value:</span> {shipment.value}
                      </div>
                      <Link
                        to={`/shipments/${shipment.id}`}
                        className="inline-flex items-center px-3 py-2 text-sm font-medium text-primary-700 bg-primary-50 rounded-lg hover:bg-primary-100 transition-colors"
                      >
                        <Eye className="w-4 h-4 mr-1" />
                        View Details
                      </Link>
                    </div>
                  </div>

                  {/* Desktop Layout */}
                  <div className="hidden lg:block">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 flex-1">
                        <StatusIcon className={`w-6 h-6 text-${getStatusColor(shipment.status) === 'success' ? 'green' : getStatusColor(shipment.status) === 'warning' ? 'yellow' : getStatusColor(shipment.status) === 'primary' ? 'blue' : 'gray'}-600`} />
                        
                        <div className="flex-1 grid grid-cols-5 gap-4">
                          <div>
                            <p className="font-semibold text-gray-900">{shipment.trackingNumber}</p>
                            <p className="text-sm text-gray-600">{shipment.client}</p>
                          </div>
                          
                          <div>
                            <p className="text-sm font-medium text-gray-900">{shipment.origin}</p>
                            <p className="text-sm text-gray-600">Origin</p>
                          </div>
                          
                          <div>
                            <p className="text-sm font-medium text-gray-900">{shipment.destination}</p>
                            <p className="text-sm text-gray-600">Destination</p>
                          </div>
                          
                          <div>
                            <p className="text-sm font-medium text-gray-900">
                              {new Date(shipment.estimatedDelivery).toLocaleDateString()}
                            </p>
                            <p className="text-sm text-gray-600">Est. Delivery</p>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div>
                              <span className={`inline-flex px-3 py-1 text-xs font-medium rounded-full ${
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
                            <Link
                              to={`/shipments/${shipment.id}`}
                              className="ml-4 inline-flex items-center px-3 py-2 text-sm font-medium text-primary-700 bg-primary-50 rounded-lg hover:bg-primary-100 transition-colors"
                            >
                              <Eye className="w-4 h-4 mr-1" />
                              Details
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>

                    {shipment.status !== 'Delivered' && (
                      <div className="mt-4 pl-10">
                        <div className="flex justify-between text-sm mb-2">
                          <span className="text-gray-600">Progress: {shipment.currentLocation}</span>
                          <span className="font-medium">{shipment.progress}%</span>
                        </div>
                        <Progress value={shipment.progress} color={getStatusColor(shipment.status)} />
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })
        )}
      </div>
    </div>
  );
};

export default Shipments;
