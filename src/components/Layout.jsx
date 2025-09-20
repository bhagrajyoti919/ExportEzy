import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import ProfileModal from './ProfileModal';
import NotificationModal from './NotificationModal';
import { 
  Home, 
  Package, 
  Warehouse, 
  Users, 
  Menu,
  Bell,
  User,
  LogOut
} from 'lucide-react';

const Layout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const [notificationModalOpen, setNotificationModalOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();

  // Mock user data with localStorage persistence
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
    const confirmLogout = window.confirm('Are you sure you want to logout?');
    
    if (confirmLogout) {
      // Clear stored profile data
      localStorage.removeItem('exportezy_profile');
      localStorage.removeItem('exportezy_user');
      
      // Call logout function
      if (logout) {
        logout();
      }
      
      // Navigate to login page
      navigate('/login');
    }
  };

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: Home },
    { name: 'Shipments', href: '/shipments', icon: Package },
    { name: 'Inventory', href: '/inventory', icon: Warehouse },
    { name: 'Clients', href: '/clients', icon: Users },
  ];

  const handleNavClick = (href) => {
    console.log('Navigation clicked:', href);
    setSidebarOpen(false);
  };

  return (
    <div style={{ display: 'flex', height: '100vh', backgroundColor: '#f9fafb' }}>
      {/* Sidebar */}
      <div style={{ 
        width: '256px', 
        backgroundColor: 'white', 
        borderRight: '1px solid #e5e7eb',
        display: 'flex',
        flexDirection: 'column'
      }}>
        {/* Logo */}
        <div style={{ 
          padding: '24px', 
          borderBottom: '1px solid #e5e7eb',
          display: 'flex',
          alignItems: 'center',
          gap: '12px'
        }}>
          <div style={{
            width: '32px',
            height: '32px',
            backgroundColor: '#3b82f6',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Package style={{ width: '20px', height: '20px', color: 'white' }} />
          </div>
          <span style={{ fontSize: '20px', fontWeight: 'bold', color: '#111827' }}>
            ExportEzy
          </span>
        </div>

        {/* Navigation */}
        <nav style={{ padding: '24px 12px', flex: 1 }}>
          {navigation.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.href;
            
            return (
              <Link
                key={item.name}
                to={item.href}
                onClick={() => handleNavClick(item.href)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '12px',
                  marginBottom: '8px',
                  borderRadius: '8px',
                  textDecoration: 'none',
                  fontSize: '14px',
                  fontWeight: '500',
                  backgroundColor: isActive ? '#dbeafe' : 'transparent',
                  color: isActive ? '#1e40af' : '#374151',
                  borderRight: isActive ? '4px solid #2563eb' : 'none',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.target.style.backgroundColor = '#f3f4f6';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.target.style.backgroundColor = 'transparent';
                  }
                }}
              >
                <Icon style={{ 
                  width: '20px', 
                  height: '20px', 
                  marginRight: '12px',
                  color: isActive ? '#2563eb' : '#6b7280'
                }} />
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* User Section */}
        <button 
          onClick={() => setProfileModalOpen(true)}
          style={{ 
            padding: '16px', 
            borderTop: '1px solid #e5e7eb',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            width: '100%',
            backgroundColor: 'transparent',
            border: 'none',
            cursor: 'pointer',
            borderRadius: '8px',
            margin: '0 8px',
            transition: 'background-color 0.2s'
          }}
          onMouseEnter={(e) => e.target.style.backgroundColor = '#f3f4f6'}
          onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
        >
          <img 
            src={mockUser?.avatar} 
            alt={mockUser?.name}
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%'
            }}
          />
          <div style={{ flex: 1, textAlign: 'left' }}>
            <p style={{ margin: 0, fontSize: '14px', fontWeight: '500', color: '#111827' }}>
              {mockUser?.name}
            </p>
            <p style={{ margin: 0, fontSize: '12px', color: '#6b7280' }}>
              {mockUser?.role}
            </p>
          </div>
          <User style={{ width: '16px', height: '16px', color: '#6b7280' }} />
        </button>
        
        {/* Logout Button */}
        <button 
          onClick={handleLogout}
          style={{ 
            padding: '12px 16px', 
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            width: '100%',
            backgroundColor: 'transparent',
            border: 'none',
            cursor: 'pointer',
            borderRadius: '8px',
            margin: '8px 8px 0 8px',
            transition: 'background-color 0.2s',
            color: '#dc2626'
          }}
          onMouseEnter={(e) => e.target.style.backgroundColor = '#fef2f2'}
          onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
        >
          <LogOut style={{ width: '16px', height: '16px' }} />
          <span style={{ fontSize: '14px', fontWeight: '500' }}>Logout</span>
        </button>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Header */}
        <header style={{ 
          backgroundColor: 'white', 
          borderBottom: '1px solid #e5e7eb',
          padding: '16px 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              style={{
                padding: '8px',
                backgroundColor: 'transparent',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                color: '#6b7280'
              }}
            >
              <Menu style={{ width: '20px', height: '20px' }} />
            </button>
            
            <input
              type="text"
              placeholder="Search..."
              style={{
                padding: '8px 12px',
                border: '1px solid #d1d5db',
                borderRadius: '6px',
                fontSize: '14px',
                width: '300px'
              }}
            />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <button 
              onClick={() => setNotificationModalOpen(true)}
              style={{
                padding: '8px',
                backgroundColor: 'transparent',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                color: '#6b7280',
                position: 'relative',
                transition: 'background-color 0.2s'
              }}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#f3f4f6'}
              onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
            >
              <Bell style={{ width: '20px', height: '20px' }} />
              <span style={{
                position: 'absolute',
                top: '2px',
                right: '2px',
                width: '20px',
                height: '20px',
                backgroundColor: '#ef4444',
                borderRadius: '50%',
                color: 'white',
                fontSize: '10px',
                fontWeight: 'bold',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>3</span>
            </button>
            
            <button 
              onClick={() => setProfileModalOpen(true)}
              style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '8px',
                backgroundColor: 'transparent',
                border: 'none',
                cursor: 'pointer',
                padding: '8px',
                borderRadius: '6px',
                transition: 'background-color 0.2s'
              }}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#f3f4f6'}
              onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
            >
              <img 
                src={mockUser?.avatar} 
                alt={mockUser?.name}
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%'
                }}
              />
              <span style={{ fontSize: '14px', fontWeight: '500', color: '#111827' }}>
                {mockUser?.name}
              </span>
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main style={{ flex: 1, overflow: 'auto', padding: '0' }}>
          <div style={{ padding: '20px' }}>
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

      {/* Notification Modal */}
      <NotificationModal 
        isOpen={notificationModalOpen}
        onClose={() => setNotificationModalOpen(false)}
      />
    </div>
  );
};

export default Layout;
