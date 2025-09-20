import React, { useState, useEffect } from 'react';
import { 
  X, 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Building, 
  Camera, 
  Save,
  Edit3,
  Upload
} from 'lucide-react';

const ProfileModal = ({ isOpen, onClose, user, onUpdateUser }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: 'Jayanita Employee',
    email: 'demo@exportezy.com',
    phone: '+1-555-0123',
    position: 'Logistics Manager',
    department: 'Operations',
    location: 'New York, USA',
    bio: 'Experienced logistics manager with expertise in international trade.',
    avatar: 'https://ui-avatars.com/api/?name=Jayanita+Employee&background=3b82f6&color=fff&size=200'
  });

  // Load data from localStorage on component mount
  useEffect(() => {
    const savedProfile = localStorage.getItem('exportezy_profile');
    if (savedProfile) {
      setProfileData(JSON.parse(savedProfile));
    }
  }, []);

  // Update user data when profileData changes
  useEffect(() => {
    if (onUpdateUser) {
      onUpdateUser({
        ...profileData,
        role: profileData.position
      });
    }
  }, [profileData, onUpdateUser]);

  const handleInputChange = (field, value) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    // Save to localStorage for persistence
    localStorage.setItem('exportezy_profile', JSON.stringify(profileData));
    setIsEditing(false);
    
    // Show success feedback
    const button = document.querySelector('.save-button');
    if (button) {
      button.textContent = 'Saved!';
      button.style.backgroundColor = '#10b981';
      setTimeout(() => {
        button.textContent = 'Save Changes';
        button.style.backgroundColor = '';
      }, 2000);
    }
  };

  const handleAvatarUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileData(prev => ({
          ...prev,
          avatar: e.target.result
        }));
      };
      reader.readAsDataURL(file);
    }
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
        <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-xl">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <User className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">Profile Settings</h2>
                <p className="text-sm text-gray-600">Manage your account information</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="flex items-center px-3 py-2 text-sm bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
              >
                <Edit3 className="w-4 h-4 mr-1" />
                {isEditing ? 'Cancel' : 'Edit'}
              </button>
              <button
                onClick={onClose}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 max-h-96 overflow-y-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Profile Picture */}
              <div className="lg:col-span-1">
                <div className="text-center">
                  <div className="relative inline-block mb-4">
                    <img
                      src={profileData.avatar}
                      alt={profileData.name}
                      className="w-24 h-24 rounded-full mx-auto shadow-lg"
                    />
                    {isEditing && (
                      <label className="absolute bottom-0 right-0 p-1.5 bg-blue-500 text-white rounded-full cursor-pointer hover:bg-blue-600 transition-colors shadow-lg">
                        <Camera className="w-3 h-3" />
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleAvatarUpload}
                          className="hidden"
                        />
                      </label>
                    )}
                  </div>
                  <h3 className="font-bold text-gray-900">{profileData.name}</h3>
                  <p className="text-sm text-gray-600">{profileData.position}</p>
                  <p className="text-xs text-gray-500">{profileData.department}</p>
                </div>
              </div>

              {/* Profile Information */}
              <div className="lg:col-span-2 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={profileData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                      />
                    ) : (
                      <p className="text-gray-900 px-3 py-2 bg-gray-50 rounded-lg text-sm flex items-center">
                        <User className="w-4 h-4 mr-2 text-gray-400" />
                        {profileData.name}
                      </p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address
                    </label>
                    {isEditing ? (
                      <input
                        type="email"
                        value={profileData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                      />
                    ) : (
                      <p className="text-gray-900 px-3 py-2 bg-gray-50 rounded-lg text-sm flex items-center">
                        <Mail className="w-4 h-4 mr-2 text-gray-400" />
                        {profileData.email}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number
                    </label>
                    {isEditing ? (
                      <input
                        type="tel"
                        value={profileData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                      />
                    ) : (
                      <p className="text-gray-900 px-3 py-2 bg-gray-50 rounded-lg text-sm flex items-center">
                        <Phone className="w-4 h-4 mr-2 text-gray-400" />
                        {profileData.phone}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Position
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={profileData.position}
                        onChange={(e) => handleInputChange('position', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                      />
                    ) : (
                      <p className="text-gray-900 px-3 py-2 bg-gray-50 rounded-lg text-sm flex items-center">
                        <Building className="w-4 h-4 mr-2 text-gray-400" />
                        {profileData.position}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Department
                    </label>
                    {isEditing ? (
                      <select
                        value={profileData.department}
                        onChange={(e) => handleInputChange('department', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                      >
                        <option value="Operations">Operations</option>
                        <option value="Logistics">Logistics</option>
                        <option value="Sales">Sales</option>
                        <option value="Finance">Finance</option>
                        <option value="Management">Management</option>
                      </select>
                    ) : (
                      <p className="text-gray-900 px-3 py-2 bg-gray-50 rounded-lg text-sm">
                        {profileData.department}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Location
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={profileData.location}
                        onChange={(e) => handleInputChange('location', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                      />
                    ) : (
                      <p className="text-gray-900 px-3 py-2 bg-gray-50 rounded-lg text-sm flex items-center">
                        <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                        {profileData.location}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Bio
                  </label>
                  {isEditing ? (
                    <textarea
                      value={profileData.bio}
                      onChange={(e) => handleInputChange('bio', e.target.value)}
                      rows="3"
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                      placeholder="Tell us about yourself..."
                    />
                  ) : (
                    <p className="text-gray-900 px-3 py-2 bg-gray-50 rounded-lg text-sm">
                      {profileData.bio}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          {isEditing && (
            <div className="flex justify-end space-x-3 p-6 border-t border-gray-200 bg-gray-50">
              <button
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 text-sm text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="save-button flex items-center px-4 py-2 text-sm text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors"
              >
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileModal;
