import React, { useState } from 'react';
import { useApi } from '../hooks/useApi';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { 
  Users, 
  Search, 
  Filter, 
  Mail,
  Phone,
  MapPin,
  Calendar,
  TrendingUp,
  Globe,
  Building,
  DollarSign,
  Package,
  CheckCircle,
  Clock
} from 'lucide-react';

const Clients = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [countryFilter, setCountryFilter] = useState('');
  const { data: clients, loading, error } = useApi('/api/clients');

  const filteredClients = clients?.filter(client => {
    const matchesSearch = client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         client.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         client.country.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = !statusFilter || client.status === statusFilter;
    const matchesCountry = !countryFilter || client.country === countryFilter;
    
    return matchesSearch && matchesStatus && matchesCountry;
  }) || [];

  const countries = [...new Set(clients?.map(client => client.country) || [])];
  const activeClients = clients?.filter(client => client.status === 'Active').length || 0;
  const totalValue = clients?.reduce((sum, client) => {
    const value = parseFloat(client.value.replace(/[$,]/g, ''));
    return sum + value;
  }, 0) || 0;

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return 'green';
      case 'Inactive': return 'red';
      case 'Pending': return 'yellow';
      default: return 'gray';
    }
  };

  const StatusBadge = ({ status }) => {
    const color = getStatusColor(status);
    const Icon = status === 'Active' ? CheckCircle : Clock;
    
    const colorClasses = {
      green: 'bg-emerald-100 text-emerald-800 border-emerald-200',
      red: 'bg-red-100 text-red-800 border-red-200',
      yellow: 'bg-amber-100 text-amber-800 border-amber-200',
      gray: 'bg-gray-100 text-gray-800 border-gray-200'
    };
    
    return (
      <span className={`inline-flex items-center px-3 py-1 text-xs font-semibold rounded-full border ${colorClasses[color]} shadow-sm`}>
        <Icon className="w-3 h-3 mr-1.5" />
        {status}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="p-4 lg:p-6 max-w-7xl mx-auto">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-gray-200 rounded w-1/3"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-24 bg-gray-200 rounded"></div>
            ))}
          </div>
          <div className="h-16 bg-gray-200 rounded"></div>
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-32 bg-gray-200 rounded"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 lg:p-8 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center space-x-3 mb-4">
          <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg">
            <Users className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-1">
              Client Directory
            </h1>
            <p className="text-gray-600 text-lg">
              Manage relationships with your global client network
            </p>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-8">
        <Card className="hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border-0 shadow-lg bg-gradient-to-br from-white to-blue-50">
          <CardContent className="p-8">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-gray-600 mb-2 uppercase tracking-wide">Total Clients</p>
                <p className="text-4xl font-bold text-gray-900 mb-1">{clients?.length || 0}</p>
                <p className="text-sm text-gray-500 flex items-center">
                  <TrendingUp className="w-4 h-4 mr-1.5 text-blue-500" />
                  Global network
                </p>
              </div>
              <div className="p-4 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 shadow-lg">
                <Users className="w-8 h-8 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border-0 shadow-lg bg-gradient-to-br from-white to-emerald-50">
          <CardContent className="p-8">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-gray-600 mb-2 uppercase tracking-wide">Active Clients</p>
                <p className="text-4xl font-bold text-gray-900 mb-1">{activeClients}</p>
                <p className="text-sm text-gray-500 flex items-center">
                  <CheckCircle className="w-4 h-4 mr-1.5 text-emerald-500" />
                  Currently trading
                </p>
              </div>
              <div className="p-4 rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-600 shadow-lg">
                <CheckCircle className="w-8 h-8 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border-0 shadow-lg bg-gradient-to-br from-white to-amber-50">
          <CardContent className="p-8">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-gray-600 mb-2 uppercase tracking-wide">Total Business Value</p>
                <p className="text-4xl font-bold text-gray-900 mb-1">${(totalValue / 1000000).toFixed(1)}M</p>
                <p className="text-sm text-gray-500 flex items-center">
                  <DollarSign className="w-4 h-4 mr-1.5 text-amber-500" />
                  Lifetime value
                </p>
              </div>
              <div className="p-4 rounded-2xl bg-gradient-to-br from-amber-500 to-amber-600 shadow-lg">
                <DollarSign className="w-8 h-8 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="mb-8 border-0 shadow-lg bg-white">
        <CardContent className="p-8">
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Search & Filter</h3>
            <p className="text-gray-600">Find specific clients using advanced filters</p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 group-focus-within:text-blue-500 transition-colors" />
              <input
                type="text"
                placeholder="Search clients, companies, or locations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50 focus:bg-white shadow-sm"
              />
            </div>
            
            <div className="relative group">
              <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 group-focus-within:text-blue-500 transition-colors" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 appearance-none bg-gray-50 focus:bg-white shadow-sm cursor-pointer"
              >
                <option value="">All Statuses</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
                <option value="Pending">Pending</option>
              </select>
            </div>

            <div className="relative group">
              <Globe className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 group-focus-within:text-blue-500 transition-colors" />
              <select
                value={countryFilter}
                onChange={(e) => setCountryFilter(e.target.value)}
                className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 appearance-none bg-gray-50 focus:bg-white shadow-sm cursor-pointer"
              >
                <option value="">All Countries</option>
                {countries.map(country => (
                  <option key={country} value={country}>{country}</option>
                ))}
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Clients List */}
      <div className="space-y-4">
        {filteredClients.length === 0 ? (
          <Card>
            <CardContent className="p-12 text-center">
              <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No clients found</h3>
              <p className="text-gray-500">
                {searchTerm || statusFilter || countryFilter 
                  ? 'Try adjusting your search or filter criteria'
                  : 'No clients available at the moment'
                }
              </p>
            </CardContent>
          </Card>
        ) : (
          filteredClients.map((client, index) => (
            <Card key={client.id} className="hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border-0 shadow-lg bg-white group">
              <CardContent className="p-8">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center space-x-4 flex-1">
                    <div className="relative">
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-lg">
                        {client.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-md">
                        <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-xl font-bold text-gray-900 mb-1">{client.name}</h3>
                      <p className="text-gray-600 flex items-center mb-1">
                        <Building className="w-4 h-4 mr-2 text-gray-400" />
                        {client.company}
                      </p>
                      <p className="text-gray-600 flex items-center">
                        <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                        {client.country}
                      </p>
                    </div>
                  </div>
                  <StatusBadge status={client.status} />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  <div className="text-center p-4 bg-gray-50 rounded-xl">
                    <div className="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-lg mx-auto mb-2">
                      <Package className="w-5 h-5 text-blue-600" />
                    </div>
                    <p className="text-sm text-gray-600 mb-1">Total Orders</p>
                    <p className="text-2xl font-bold text-gray-900">{client.totalOrders}</p>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-xl">
                    <div className="flex items-center justify-center w-10 h-10 bg-emerald-100 rounded-lg mx-auto mb-2">
                      <DollarSign className="w-5 h-5 text-emerald-600" />
                    </div>
                    <p className="text-sm text-gray-600 mb-1">Business Value</p>
                    <p className="text-2xl font-bold text-gray-900">{client.value}</p>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-xl">
                    <div className="flex items-center justify-center w-10 h-10 bg-amber-100 rounded-lg mx-auto mb-2">
                      <Calendar className="w-5 h-5 text-amber-600" />
                    </div>
                    <p className="text-sm text-gray-600 mb-1">Last Order</p>
                    <p className="text-lg font-semibold text-gray-900">{new Date(client.lastOrder).toLocaleDateString()}</p>
                  </div>
                </div>

                <div className="flex space-x-3 pt-6 border-t border-gray-100">
                  <a 
                    href={`mailto:${client.email}`} 
                    className="flex-1 inline-flex items-center justify-center px-4 py-3 text-sm font-semibold text-white bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl"
                  >
                    <Mail className="w-4 h-4 mr-2" />
                    Email Client
                  </a>
                  <a 
                    href={`tel:${client.phone}`} 
                    className="flex-1 inline-flex items-center justify-center px-4 py-3 text-sm font-semibold text-blue-600 bg-blue-50 rounded-xl hover:bg-blue-100 transition-all duration-200 border border-blue-200"
                  >
                    <Phone className="w-4 h-4 mr-2" />
                    Call Client
                  </a>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}

export default Clients;
