import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  Package, 
  Warehouse, 
  Users, 
  Menu,
  Bell,
  User
} from 'lucide-react';

const SimpleLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

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
        <div style={{ 
          padding: '16px', 
          borderTop: '1px solid #e5e7eb',
          display: 'flex',
          alignItems: 'center',
          gap: '12px'
        }}>
          <div style={{
            width: '40px',
            height: '40px',
            backgroundColor: '#3b82f6',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontSize: '14px',
            fontWeight: 'bold'
          }}>
            JE
          </div>
          <div style={{ flex: 1 }}>
            <p style={{ margin: 0, fontSize: '14px', fontWeight: '500', color: '#111827' }}>
              Jayanita Employee
            </p>
            <p style={{ margin: 0, fontSize: '12px', color: '#6b7280' }}>
              Logistics Manager
            </p>
          </div>
        </div>
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
            <button style={{
              padding: '8px',
              backgroundColor: 'transparent',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              color: '#6b7280',
              position: 'relative'
            }}>
              <Bell style={{ width: '20px', height: '20px' }} />
              <span style={{
                position: 'absolute',
                top: '2px',
                right: '2px',
                width: '8px',
                height: '8px',
                backgroundColor: '#ef4444',
                borderRadius: '50%'
              }}></span>
            </button>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{
                width: '32px',
                height: '32px',
                backgroundColor: '#3b82f6',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '12px',
                fontWeight: 'bold'
              }}>
                JE
              </div>
              <span style={{ fontSize: '14px', fontWeight: '500', color: '#111827' }}>
                Jayanita Employee
              </span>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main style={{ flex: 1, overflow: 'auto', padding: '0' }}>
          <div style={{ padding: '20px' }}>
            <div style={{
              position: 'fixed',
              top: '10px',
              right: '10px',
              backgroundColor: 'rgba(0,0,0,0.8)',
              color: 'white',
              padding: '8px 12px',
              borderRadius: '4px',
              fontSize: '12px',
              zIndex: 1000
            }}>
              Current: {location.pathname}
            </div>
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default SimpleLayout;
