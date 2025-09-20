import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import ProfileModal from './ProfileModal';
import { 
  Home, 
  Package, 
  Warehouse, 
  Users, 
  Menu, 
  X, 
  LogOut,
  Bell,
  Search,
  User
} from 'lucide-react';
import clsx from 'clsx';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: Home },
  { name: 'Shipments', href: '/shipments', icon: Package },
  { name: 'Inventory', href: '/inventory', icon: Warehouse },
  { name: 'Clients', href: '/clients', icon: Users },
];

const Layout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  
  // Provide mock user for debugging with localStorage persistence
  const [mockUser, setMockUser] = useState(() => {
    const savedProfile = localStorage.getItem('exportezy_profile');
    if (savedProfile) {
      const profile = JSON.parse(savedProfile);
      return {
        name: profile.name,
        role: profile.position,
        avatar: profile.avatar
      };
    }
    return {
      name: 'Jayanita Employee',
      role: 'Logistics Manager',
      avatar: 'https://ui-avatars.com/api/?name=Jayanita+Employee&background=3b82f6&color=fff'
    };
  });

  const handleUpdateUser = (updatedProfile) => {
    setMockUser({
      name: updatedProfile.name,
      role: updatedProfile.role,
      avatar: updatedProfile.avatar
    });
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 lg:hidden bg-black bg-opacity-50"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Desktop sidebar */}
      <div className="hidden lg:flex lg:flex-shrink-0">
        <div className={`flex flex-col bg-white border-r border-gray-200 transition-all duration-300 ${
          sidebarCollapsed ? 'w-16' : 'w-64'
        }`}>
          {/* Logo */}
          <div className="flex items-center h-16 px-6 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                <Package className="w-5 h-5 text-white" />
              </div>
              {!sidebarCollapsed && (
                <span className="text-xl font-bold text-gray-900">ExportEzy</span>
              )}
            </div>
          </div>

          <nav className="mt-6 px-3">
            {navigation.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.href;
              
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={clsx(
                    'flex items-center px-3 py-2 mb-2 text-sm font-medium rounded-lg transition-all duration-200',
                    isActive
                      ? 'bg-primary-50 text-primary-700 border-r-2 border-primary-500'
                      : 'text-gray-700 hover:bg-gray-100',
                    sidebarCollapsed ? 'justify-center' : ''
                  )}
                  title={sidebarCollapsed ? item.name : ''}
                >
                  <Icon className={clsx(
                    'w-5 h-5', 
                    isActive ? 'text-primary-600' : 'text-gray-500',
                    sidebarCollapsed ? '' : 'mr-3'
                  )} />
                  {!sidebarCollapsed && item.name}
                </Link>
              );
            })}
          </nav>

          {/* User section */}
          <div className="absolute bottom-0 w-full p-4 border-t border-gray-200">
            <button
              onClick={() => setProfileModalOpen(true)}
              className={`flex items-center mb-3 w-full p-2 rounded-lg hover:bg-gray-50 transition-colors ${
                sidebarCollapsed ? 'justify-center' : 'space-x-3'
              }`}
              title={sidebarCollapsed ? mockUser?.name : ''}
            >
              <img 
                src={mockUser?.avatar} 
                alt={mockUser?.name}
                className="w-10 h-10 rounded-full"
              />
              {!sidebarCollapsed && (
                <>
                  <div className="flex-1 min-w-0 text-left">
                    <p className="text-sm font-medium text-gray-900 truncate">{mockUser?.name}</p>
                    <p className="text-xs text-gray-500 truncate">{mockUser?.role}</p>
                  </div>
                  <User className="w-4 h-4 text-gray-400" />
                </>
              )}
            </button>
            <button
              onClick={handleLogout}
              className={`flex items-center w-full px-3 py-2 text-sm text-gray-700 rounded-lg hover:bg-gray-100 transition-colors ${
                sidebarCollapsed ? 'justify-center' : ''
              }`}
              title={sidebarCollapsed ? 'Logout' : ''}
            >
              <LogOut className={`w-4 h-4 ${sidebarCollapsed ? '' : 'mr-2'}`} />
              {!sidebarCollapsed && 'Logout'}
            </button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <header className="bg-white shadow-sm border-b border-gray-200 lg:shadow-none">
          <div className="flex items-center justify-between h-16 px-4 lg:px-6">
            <div className="flex items-center space-x-4">
              {/* Mobile hamburger */}
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100"
              >
                <Menu className="w-5 h-5" />
              </button>
              
              {/* Desktop hamburger for sidebar collapse */}
              <button
                onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                className="hidden lg:block p-2 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-colors"
                title={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
              >
                <Menu className="w-5 h-5" />
              </button>
              
              <div className="hidden lg:flex items-center space-x-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search..."
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg relative">
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
              </button>
              
              <button 
                onClick={() => setProfileModalOpen(true)}
                className="hidden lg:flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <img 
                  src={mockUser?.avatar} 
                  alt={mockUser?.name}
                  className="w-8 h-8 rounded-full"
                />
                <span className="text-sm font-medium text-gray-900">{mockUser?.name}</span>
              </button>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-auto">
          <div className="animate-fade-in">
            {children}
          </div>
        </main>
      </div>

      {/* Profile Modal */}
      <ProfileModal 
        isOpen={profileModalOpen}
        onClose={() => setProfileModalOpen(false)}
        user={mockUser}
        onUpdateUser={handleUpdateUser}
      />
    </div>
  );
};

export default Layout;
