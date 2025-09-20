import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useApi } from '../hooks/useApi';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import Progress from '../components/ui/Progress';
import { 
  ArrowLeft, 
  Package, 
  MapPin, 
  Calendar,
  Truck,
  Ship,
  Plane,
  Clock,
  CheckCircle,
  AlertCircle,
  User,
  Weight,
  DollarSign,
  Navigation,
  Phone,
  Mail
} from 'lucide-react';

const ShipmentDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: shipment, loading, error } = useApi(`/api/shipments/${id}`);

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
    if (carrier?.includes('Maritime') || carrier?.includes('Maersk')) return Ship;
    if (carrier?.includes('DHL') || carrier?.includes('FedEx') || carrier?.includes('UPS')) return Plane;
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
      <div className="p-4 lg:p-6 max-w-4xl mx-auto">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-gray-200 rounded w-1/3"></div>
          <div className="h-64 bg-gray-200 rounded"></div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="h-48 bg-gray-200 rounded"></div>
            <div className="h-48 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !shipment) {
    return (
      <div className="p-4 lg:p-6 max-w-4xl mx-auto">
        <Card>
          <CardContent className="p-12 text-center">
            <AlertCircle className="w-16 h-16 text-red-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Shipment Not Found</h3>
            <p className="text-gray-500 mb-4">
              The requested shipment could not be found or may have been removed.
            </p>
            <Link
              to="/shipments"
              className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Shipments
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  const StatusIcon = getStatusIcon(shipment.status);
  const CarrierIcon = getCarrierIcon(shipment.carrier);
  const timeline = [
    { status: 'Preparing', date: '2024-09-01', completed: true },
    { status: 'In Transit', date: '2024-09-05', completed: shipment.progress > 20 },
    { status: 'Customs', date: '2024-09-15', completed: shipment.progress > 60 },
    { status: 'Out for Delivery', date: '2024-09-20', completed: shipment.progress > 85 },
    { status: 'Delivered', date: shipment.estimatedDelivery, completed: shipment.status === 'Delivered' }
  ];

  return (
    <div className="p-4 lg:p-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <button
          onClick={() => navigate('/shipments')}
          className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 mb-4 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-1" />
          Back to Shipments
        </button>
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
              {shipment.trackingNumber}
            </h1>
            <p className="text-gray-600">Shipment Details & Tracking</p>
          </div>
          <div className="mt-4 lg:mt-0">
            <span className={`inline-flex items-center px-4 py-2 text-sm font-medium rounded-full ${
              shipment.status === 'Delivered' 
                ? 'bg-green-100 text-green-800'
                : shipment.status === 'In Transit'
                ? 'bg-blue-100 text-blue-800'
                : shipment.status === 'Customs Hold'
                ? 'bg-yellow-100 text-yellow-800'
                : 'bg-gray-100 text-gray-800'
            }`}>
              <StatusIcon className="w-4 h-4 mr-2" />
              {shipment.status}
            </span>
          </div>
        </div>
      </div>

      {/* Progress Card */}
      {shipment.status !== 'Delivered' && (
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Shipment Progress</h3>
              <span className="text-sm font-medium text-gray-600">{shipment.progress}%</span>
            </div>
            <Progress value={shipment.progress} color={getStatusColor(shipment.status)} size="lg" />
            <div className="flex items-center mt-4 text-sm text-gray-600">
              <Navigation className="w-4 h-4 mr-2" />
              Current Location: <span className="font-medium ml-1">{shipment.currentLocation}</span>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Route Map Placeholder */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center">
            <MapPin className="w-5 h-5 mr-2 text-primary-600" />
            Shipment Route
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-gray-100 rounded-lg h-64 flex items-center justify-center">
            <div className="text-center">
              <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 font-medium">Interactive Map</p>
              <p className="text-sm text-gray-500 mt-1">
                In production, this would show real-time tracking with Google Maps integration
              </p>
              <div className="mt-4 flex items-center justify-center space-x-4 text-sm">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                  <span>Origin: {shipment.origin}</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                  <span>Destination: {shipment.destination}</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Details Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Shipment Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Package className="w-5 h-5 mr-2 text-primary-600" />
              Shipment Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-gray-600">Tracking Number</p>
                <p className="text-sm text-gray-900">{shipment.trackingNumber}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Status</p>
                <p className="text-sm text-gray-900">{shipment.status}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Origin</p>
                <p className="text-sm text-gray-900">{shipment.origin}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Destination</p>
                <p className="text-sm text-gray-900">{shipment.destination}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Estimated Delivery</p>
                <p className="text-sm text-gray-900">
                  {new Date(shipment.estimatedDelivery).toLocaleDateString()}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Current Location</p>
                <p className="text-sm text-gray-900">{shipment.currentLocation}</p>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-200">
              <div className="flex items-center space-x-4">
                <CarrierIcon className="w-5 h-5 text-gray-600" />
                <div>
                  <p className="text-sm font-medium text-gray-600">Carrier</p>
                  <p className="text-sm text-gray-900">{shipment.carrier}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Client & Cargo Details */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <User className="w-5 h-5 mr-2 text-primary-600" />
              Client & Cargo Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm font-medium text-gray-600">Client</p>
              <p className="text-sm text-gray-900">{shipment.client}</p>
            </div>
            
            <div>
              <p className="text-sm font-medium text-gray-600">Goods Description</p>
              <p className="text-sm text-gray-900">{shipment.goods}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="flex items-center mb-1">
                  <DollarSign className="w-4 h-4 text-gray-500 mr-1" />
                  <p className="text-sm font-medium text-gray-600">Value</p>
                </div>
                <p className="text-sm text-gray-900">{shipment.value}</p>
              </div>
              <div>
                <div className="flex items-center mb-1">
                  <Weight className="w-4 h-4 text-gray-500 mr-1" />
                  <p className="text-sm font-medium text-gray-600">Weight</p>
                </div>
                <p className="text-sm text-gray-900">{shipment.weight}</p>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-200">
              <p className="text-sm font-medium text-gray-600 mb-2">Quick Actions</p>
              <div className="flex space-x-2">
                <button className="inline-flex items-center px-3 py-2 text-xs font-medium text-primary-700 bg-primary-50 rounded-lg hover:bg-primary-100 transition-colors">
                  <Phone className="w-3 h-3 mr-1" />
                  Contact Client
                </button>
                <button className="inline-flex items-center px-3 py-2 text-xs font-medium text-primary-700 bg-primary-50 rounded-lg hover:bg-primary-100 transition-colors">
                  <Mail className="w-3 h-3 mr-1" />
                  Send Update
                </button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Timeline */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Clock className="w-5 h-5 mr-2 text-primary-600" />
            Delivery Timeline
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {timeline.map((item, index) => (
              <div key={index} className="flex items-center space-x-4">
                <div className={`w-3 h-3 rounded-full ${
                  item.completed ? 'bg-green-500' : 'bg-gray-300'
                }`} />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <p className={`text-sm font-medium ${
                      item.completed ? 'text-gray-900' : 'text-gray-500'
                    }`}>
                      {item.status}
                    </p>
                    <p className={`text-sm ${
                      item.completed ? 'text-gray-600' : 'text-gray-400'
                    }`}>
                      {new Date(item.date).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ShipmentDetail;
