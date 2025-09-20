import React, { useState, useEffect } from 'react';
import { useApi } from '../hooks/useApi';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import AddItemModal from '../components/AddItemModal';
import { 
  Warehouse, 
  Search, 
  Filter, 
  AlertTriangle,
  CheckCircle,
  Package,
  MapPin,
  Calendar,
  TrendingDown,
  TrendingUp,
  Boxes,
  DollarSign
} from 'lucide-react';

const Inventory = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [stockFilter, setStockFilter] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [localInventory, setLocalInventory] = useState([]);
  const { data: inventory, loading } = useApi('/api/inventory');

  // Load saved inventory from localStorage on component mount
  useEffect(() => {
    const savedInventory = localStorage.getItem('exportezy_inventory');
    if (savedInventory) {
      try {
        const parsedInventory = JSON.parse(savedInventory);
        setLocalInventory(parsedInventory);
      } catch (error) {
        console.error('Error parsing saved inventory:', error);
        setLocalInventory([]);
      }
    }
  }, []);

  // Save inventory to localStorage whenever localInventory changes
  useEffect(() => {
    if (localInventory.length > 0) {
      localStorage.setItem('exportezy_inventory', JSON.stringify(localInventory));
    }
  }, [localInventory]);

  // Combine API data with local inventory
  const allInventory = [...(inventory || []), ...localInventory];
  
  const filteredInventory = allInventory?.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.supplier.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !categoryFilter || item.category === categoryFilter;
    const matchesStock = !stockFilter || 
                        (stockFilter === 'low' && item.stockLevel < 50) ||
                        (stockFilter === 'normal' && item.stockLevel >= 50 && item.stockLevel < 1000) ||
                        (stockFilter === 'high' && item.stockLevel >= 1000);
    
    return matchesSearch && matchesCategory && matchesStock;
  }) || [];

  const categories = [...new Set(allInventory?.map(item => item.category) || [])];
  const lowStockCount = allInventory?.filter(item => item.stockLevel < 50).length || 0;
  const totalValue = allInventory?.reduce((sum, item) => {
    const raw = (item && item.value) ? item.value : 0;
    const value = typeof raw === 'string' ? parseFloat(raw.replace(/[^0-9.-]+/g, '')) : (raw || 0);
    return sum + value;
  }, 0) || 0;

  const handleAddItem = (newItem) => {
    const updatedInventory = [...localInventory, newItem];
    setLocalInventory(updatedInventory);
    
    // Save to localStorage immediately
    localStorage.setItem('exportezy_inventory', JSON.stringify(updatedInventory));
    
    // Show success message
    console.log('Item added successfully:', newItem.name);
  };

  // Function to clear saved inventory (for testing purposes)
  const clearSavedInventory = () => {
    localStorage.removeItem('exportezy_inventory');
    setLocalInventory([]);
    console.log('Saved inventory cleared');
  };

  const getStockStatus = (level) => {
    if (level < 50) return { status: 'Low', color: 'red', icon: AlertTriangle };
    if (level < 200) return { status: 'Medium', color: 'yellow', icon: TrendingDown };
    return { status: 'Good', color: 'green', icon: CheckCircle };
  };

  const StockBadge = ({ level }) => {
    const { status, color, icon: Icon } = getStockStatus(level);
    return (
      <span className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full bg-${color}-100 text-${color}-800`}>
        <Icon className="w-3 h-3 mr-1" />
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

  // When not loading and no data arrived, show a helpful debug message
  if (!loading && (!inventory || inventory.length === 0)) {
    return (
      <div className="p-4 lg:p-6 max-w-3xl mx-auto">
        <Card>
          <CardContent className="p-8 text-center">
            <Warehouse className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No inventory data loaded</h3>
            <p className="text-gray-500">This could be due to a data fetch issue. Please try refreshing the page.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-4 lg:p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">
            Inventory Management
          </h1>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-500">
              Saved Items: {localInventory.length}
            </span>
            {localInventory.length > 0 && (
              <button
                onClick={clearSavedInventory}
                className="px-2 py-1 text-xs text-red-600 bg-red-50 rounded hover:bg-red-100 transition-colors"
              >
                Clear Saved
              </button>
            )}
          </div>
        </div>
        <p className="text-gray-600">
          Monitor stock levels and manage your warehouse inventory
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6 mb-6">
        <Card className="hover:shadow-md transition-shadow duration-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Total Items</p>
                <p className="text-3xl font-bold text-gray-900">{inventory?.length || 0}</p>
                <p className="text-xs text-gray-500 mt-1 flex items-center">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  Active inventory
                </p>
              </div>
              <div className="p-3 rounded-full bg-primary-100">
                <Boxes className="w-6 h-6 text-primary-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow duration-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Low Stock Items</p>
                <p className="text-3xl font-bold text-gray-900">{lowStockCount}</p>
                <p className="text-xs text-gray-500 mt-1 flex items-center">
                  <AlertTriangle className="w-3 h-3 mr-1" />
                  Needs attention
                </p>
              </div>
              <div className="p-3 rounded-full bg-red-100">
                <AlertTriangle className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow duration-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Total Value</p>
                <p className="text-3xl font-bold text-gray-900">₹{(totalValue / 100000).toFixed(1)}L</p>
                <p className="text-xs text-gray-500 mt-1 flex items-center">
                  <DollarSign className="w-3 h-3 mr-1" />
                  Inventory worth
                </p>
              </div>
              <div className="p-3 rounded-full bg-green-100">
                <DollarSign className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search inventory items..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
            
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent appearance-none bg-white"
              >
                <option value="">All Categories</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            <div className="relative">
              <Package className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <select
                value={stockFilter}
                onChange={(e) => setStockFilter(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent appearance-none bg-white"
              >
                <option value="">All Stock Levels</option>
                <option value="low">Low Stock (&lt;50)</option>
                <option value="normal">Normal Stock (50-999)</option>
                <option value="high">High Stock (1000+)</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Inventory List */}
      <div className="space-y-4">
        {filteredInventory.length === 0 ? (
          <Card>
            <CardContent className="p-12 text-center">
              <Warehouse className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No inventory items found</h3>
              <p className="text-gray-500">
                {searchTerm || categoryFilter || stockFilter 
                  ? 'Try adjusting your search or filter criteria'
                  : 'No inventory items available at the moment'
                }
              </p>
            </CardContent>
          </Card>
        ) : (
          filteredInventory.map((item) => (
            <Card key={item.id} className="hover:shadow-md transition-shadow duration-200">
              <CardContent className="p-6">
                {/* Mobile Layout */}
                <div className="lg:hidden space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900 mb-1">{item.name}</h3>
                      <p className="text-sm text-gray-600 mb-2">{item.description}</p>
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <span className="inline-flex items-center">
                          <Package className="w-4 h-4 mr-1" />
                          {item.category}
                        </span>
                        <span className="inline-flex items-center">
                          <MapPin className="w-4 h-4 mr-1" />
                          {item.location}
                        </span>
                      </div>
                    </div>
                    <StockBadge level={item.stockLevel} />
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-600">Stock Level</p>
                      <p className="font-semibold text-gray-900">{item.stockLevel.toLocaleString()} units</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Value</p>
                      <p className="font-semibold text-gray-900">{item.value}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Supplier</p>
                      <p className="font-medium text-gray-900">{item.supplier}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Last Updated</p>
                      <p className="font-medium text-gray-900">
                        {new Date(item.lastUpdated).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Desktop Layout */}
                <div className="hidden lg:block">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 flex-1">
                      <div className="p-3 rounded-full bg-gray-100">
                        <Package className="w-6 h-6 text-gray-600" />
                      </div>
                      
                      <div className="flex-1 grid grid-cols-6 gap-4">
                        <div className="col-span-2">
                          <p className="font-semibold text-gray-900">{item.name}</p>
                          <p className="text-sm text-gray-600 truncate">{item.description}</p>
                          <span className="inline-flex items-center text-xs text-gray-500 mt-1">
                            <Package className="w-3 h-3 mr-1" />
                            {item.category}
                          </span>
                        </div>
                        
                        <div>
                          <p className="text-sm font-medium text-gray-900">{item.stockLevel.toLocaleString()}</p>
                          <p className="text-sm text-gray-600">Stock Level</p>
                        </div>
                        
                        <div>
                          <p className="text-sm font-medium text-gray-900">{item.value}</p>
                          <p className="text-sm text-gray-600">Value</p>
                        </div>
                        
                        <div>
                          <p className="text-sm font-medium text-gray-900">{item.location}</p>
                          <p className="text-sm text-gray-600">Location</p>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-gray-900">{item.supplier}</p>
                            <p className="text-sm text-gray-600">Supplier</p>
                          </div>
                          <StockBadge level={item.stockLevel} />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 pl-16 text-sm text-gray-600">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-2" />
                      Last updated: {new Date(item.lastUpdated).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Quick Actions */}
      <div className="mt-8">
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <button className="p-4 bg-red-50 border border-red-200 rounded-xl hover:bg-red-100 transition-colors text-center group">
                <AlertTriangle className="w-8 h-8 mx-auto mb-2 text-red-600 group-hover:scale-110 transition-transform" />
                <p className="text-sm font-medium text-red-700">View Low Stock</p>
              </button>
              <button className="p-4 bg-blue-50 border border-blue-200 rounded-xl hover:bg-blue-100 transition-colors text-center group">
                <TrendingUp className="w-8 h-8 mx-auto mb-2 text-blue-600 group-hover:scale-110 transition-transform" />
                <p className="text-sm font-medium text-blue-700">Stock Report</p>
              </button>
              <button 
                onClick={() => setIsAddModalOpen(true)}
                className="p-4 bg-green-50 border border-green-200 rounded-xl hover:bg-green-100 transition-colors text-center group cursor-pointer"
              >
                <Package className="w-8 h-8 mx-auto mb-2 text-green-600 group-hover:scale-110 transition-transform" />
                <p className="text-sm font-medium text-green-700">Add New Item</p>
              </button>
              <button className="p-4 bg-purple-50 border border-purple-200 rounded-xl hover:bg-purple-100 transition-colors text-center group">
                <DollarSign className="w-8 h-8 mx-auto mb-2 text-purple-600 group-hover:scale-110 transition-transform" />
                <p className="text-sm font-medium text-purple-700">Value Analysis</p>
              </button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Add Item Modal */}
      <AddItemModal 
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddItem={handleAddItem}
      />
    </div>
  );
};

export default Inventory;
