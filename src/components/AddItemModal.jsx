import React, { useState } from 'react';
import { 
  X, 
  Package, 
  MapPin, 
  DollarSign, 
  Building,
  Save,
  Upload,
  Hash,
  Calendar,
  AlertTriangle
} from 'lucide-react';

const AddItemModal = ({ isOpen, onClose, onAddItem }) => {
  const [itemData, setItemData] = useState({
    name: '',
    description: '',
    category: 'Electronics',
    location: '',
    stockLevel: '',
    threshold: '',
    supplier: '',
    unitPrice: '',
    sku: '',
    value: ''
  });

  const [errors, setErrors] = useState({});

  const categories = [
    'Electronics',
    'Automotive', 
    'Textiles',
    'Medical',
    'Construction',
    'Food',
    'Pharmaceuticals',
    'Industrial',
    'Agriculture',
    'Healthcare'
  ];

  const handleInputChange = (field, value) => {
    setItemData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!itemData.name.trim()) newErrors.name = 'Item name is required';
    if (!itemData.description.trim()) newErrors.description = 'Description is required';
    if (!itemData.location.trim()) newErrors.location = 'Location is required';
    if (!itemData.stockLevel || itemData.stockLevel <= 0) newErrors.stockLevel = 'Valid stock level is required';
    if (!itemData.threshold || itemData.threshold <= 0) newErrors.threshold = 'Valid threshold is required';
    if (!itemData.supplier.trim()) newErrors.supplier = 'Supplier is required';
    if (!itemData.unitPrice || itemData.unitPrice <= 0) newErrors.unitPrice = 'Valid unit price is required';
    if (!itemData.sku.trim()) newErrors.sku = 'SKU is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (!validateForm()) {
      return;
    }

    // Calculate value if not provided
    const calculatedValue = itemData.value || (parseFloat(itemData.unitPrice) * parseInt(itemData.stockLevel)).toFixed(2);
    
    const newItem = {
      id: Date.now(), // Simple ID generation
      name: itemData.name,
      description: itemData.description,
      category: itemData.category,
      location: itemData.location,
      stockLevel: parseInt(itemData.stockLevel),
      threshold: parseInt(itemData.threshold),
      supplier: itemData.supplier,
      unitPrice: parseFloat(itemData.unitPrice),
      value: `₹${calculatedValue}`,
      sku: itemData.sku,
      lastUpdated: new Date().toISOString().split('T')[0]
    };

    if (onAddItem) {
      onAddItem(newItem);
    }

    // Show success feedback
    const button = document.querySelector('.add-item-button');
    if (button) {
      const originalText = button.innerHTML;
      button.innerHTML = '<svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>Added!';
      button.style.backgroundColor = '#10b981';
      setTimeout(() => {
        button.innerHTML = originalText;
        button.style.backgroundColor = '';
      }, 2000);
    }

    // Reset form
    setItemData({
      name: '',
      description: '',
      category: 'Electronics',
      location: '',
      stockLevel: '',
      threshold: '',
      supplier: '',
      unitPrice: '',
      sku: '',
      value: ''
    });
    setErrors({});
    
    // Close modal after a short delay to show success message
    setTimeout(() => {
      onClose();
    }, 1000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="relative w-full max-w-3xl bg-white rounded-2xl shadow-xl">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <Package className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">Add New Inventory Item</h2>
                <p className="text-sm text-gray-600">Add a new item to your inventory</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6 max-h-96 overflow-y-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Left Column */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Item Name *
                  </label>
                  <input
                    type="text"
                    value={itemData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm ${
                      errors.name ? 'border-red-300 bg-red-50' : 'border-gray-200'
                    }`}
                    placeholder="Enter item name"
                  />
                  {errors.name && <p className="text-red-500 text-xs mt-1 flex items-center">
                    <AlertTriangle className="w-3 h-3 mr-1" />
                    {errors.name}
                  </p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description *
                  </label>
                  <textarea
                    value={itemData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    rows="3"
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm ${
                      errors.description ? 'border-red-300 bg-red-50' : 'border-gray-200'
                    }`}
                    placeholder="Describe the item"
                  />
                  {errors.description && <p className="text-red-500 text-xs mt-1 flex items-center">
                    <AlertTriangle className="w-3 h-3 mr-1" />
                    {errors.description}
                  </p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Category
                  </label>
                  <select
                    value={itemData.category}
                    onChange={(e) => handleInputChange('category', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm"
                  >
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    SKU *
                  </label>
                  <input
                    type="text"
                    value={itemData.sku}
                    onChange={(e) => handleInputChange('sku', e.target.value)}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm ${
                      errors.sku ? 'border-red-300 bg-red-50' : 'border-gray-200'
                    }`}
                    placeholder="Enter SKU code"
                  />
                  {errors.sku && <p className="text-red-500 text-xs mt-1 flex items-center">
                    <AlertTriangle className="w-3 h-3 mr-1" />
                    {errors.sku}
                  </p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Location *
                  </label>
                  <input
                    type="text"
                    value={itemData.location}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm ${
                      errors.location ? 'border-red-300 bg-red-50' : 'border-gray-200'
                    }`}
                    placeholder="Warehouse location"
                  />
                  {errors.location && <p className="text-red-500 text-xs mt-1 flex items-center">
                    <AlertTriangle className="w-3 h-3 mr-1" />
                    {errors.location}
                  </p>}
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Stock Level *
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={itemData.stockLevel}
                    onChange={(e) => handleInputChange('stockLevel', e.target.value)}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm ${
                      errors.stockLevel ? 'border-red-300 bg-red-50' : 'border-gray-200'
                    }`}
                    placeholder="Current stock quantity"
                  />
                  {errors.stockLevel && <p className="text-red-500 text-xs mt-1 flex items-center">
                    <AlertTriangle className="w-3 h-3 mr-1" />
                    {errors.stockLevel}
                  </p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Threshold Level *
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={itemData.threshold}
                    onChange={(e) => handleInputChange('threshold', e.target.value)}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm ${
                      errors.threshold ? 'border-red-300 bg-red-50' : 'border-gray-200'
                    }`}
                    placeholder="Minimum stock level"
                  />
                  {errors.threshold && <p className="text-red-500 text-xs mt-1 flex items-center">
                    <AlertTriangle className="w-3 h-3 mr-1" />
                    {errors.threshold}
                  </p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Unit Price *
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={itemData.unitPrice}
                    onChange={(e) => handleInputChange('unitPrice', e.target.value)}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm ${
                      errors.unitPrice ? 'border-red-300 bg-red-50' : 'border-gray-200'
                    }`}
                    placeholder="Price per unit"
                  />
                  {errors.unitPrice && <p className="text-red-500 text-xs mt-1 flex items-center">
                    <AlertTriangle className="w-3 h-3 mr-1" />
                    {errors.unitPrice}
                  </p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Supplier *
                  </label>
                  <input
                    type="text"
                    value={itemData.supplier}
                    onChange={(e) => handleInputChange('supplier', e.target.value)}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm ${
                      errors.supplier ? 'border-red-300 bg-red-50' : 'border-gray-200'
                    }`}
                    placeholder="Supplier name"
                  />
                  {errors.supplier && <p className="text-red-500 text-xs mt-1 flex items-center">
                    <AlertTriangle className="w-3 h-3 mr-1" />
                    {errors.supplier}
                  </p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Total Value (Auto-calculated)
                  </label>
                  <input
                    type="text"
                    value={itemData.value || (itemData.unitPrice && itemData.stockLevel ? 
                      `₹${(parseFloat(itemData.unitPrice) * parseInt(itemData.stockLevel)).toFixed(2)}` : '')}
                    onChange={(e) => handleInputChange('value', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg bg-gray-50 text-sm"
                    placeholder="Auto-calculated from unit price × stock"
                    readOnly
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex justify-end space-x-3 p-6 border-t border-gray-200 bg-gray-50">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="add-item-button flex items-center px-4 py-2 text-sm text-white bg-green-500 rounded-lg hover:bg-green-600 transition-colors"
            >
              <Save className="w-4 h-4 mr-2" />
              Add Item
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddItemModal;
