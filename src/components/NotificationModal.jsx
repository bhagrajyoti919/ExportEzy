import React, { useState, useEffect } from 'react';
import { 
  X, 
  Bell, 
  Package, 
  Users, 
  AlertTriangle,
  CheckCircle,
  Clock,
  Truck,
  DollarSign,
  Settings,
  MoreHorizontal
} from 'lucide-react';

const NotificationModal = ({ isOpen, onClose }) => {
  const [notifications, setNotifications] = useState([]);
  const [filter, setFilter] = useState('all'); // all, unread, read

  // Demo notifications data
  useEffect(() => {
    const demoNotifications = [
      {
        id: 1,
        type: 'shipment',
        title: 'Shipment Delivered',
        message: 'Shipment #SH-2024-001 has been successfully delivered to GlobalTech Inc.',
        time: '2 minutes ago',
        read: false,
        icon: CheckCircle,
        color: 'text-emerald-600',
        bgColor: 'bg-emerald-100'
      },
      {
        id: 2,
        type: 'client',
        title: 'New Client Registration',
        message: 'Ahmed Al-Rashid from Middle East Trading has registered as a new client.',
        time: '15 minutes ago',
        read: false,
        icon: Users,
        color: 'text-blue-600',
        bgColor: 'bg-blue-100'
      },
      {
        id: 3,
        type: 'alert',
        title: 'Inventory Low Stock Alert',
        message: 'Product SKU-12345 is running low in stock. Only 5 units remaining.',
        time: '1 hour ago',
        read: false,
        icon: AlertTriangle,
        color: 'text-amber-600',
        bgColor: 'bg-amber-100'
      },
      {
        id: 4,
        type: 'payment',
        title: 'Payment Received',
        message: 'Payment of $25,000 received from British Imports Ltd. for invoice #INV-2024-089.',
        time: '2 hours ago',
        read: true,
        icon: DollarSign,
        color: 'text-emerald-600',
        bgColor: 'bg-emerald-100'
      },
      {
        id: 5,
        type: 'shipment',
        title: 'Shipment Delayed',
        message: 'Shipment #SH-2024-002 to Australia has been delayed due to weather conditions.',
        time: '3 hours ago',
        read: true,
        icon: Truck,
        color: 'text-red-600',
        bgColor: 'bg-red-100'
      },
      {
        id: 6,
        type: 'system',
        title: 'System Maintenance',
        message: 'Scheduled system maintenance will occur tonight from 2:00 AM to 4:00 AM UTC.',
        time: '5 hours ago',
        read: true,
        icon: Settings,
        color: 'text-gray-600',
        bgColor: 'bg-gray-100'
      },
      {
        id: 7,
        type: 'client',
        title: 'Client Profile Updated',
        message: 'Sarah Johnson has updated her company profile and contact information.',
        time: '1 day ago',
        read: true,
        icon: Users,
        color: 'text-blue-600',
        bgColor: 'bg-blue-100'
      },
      {
        id: 8,
        type: 'shipment',
        title: 'New Shipment Created',
        message: 'New shipment #SH-2024-003 has been created for Canadian Imports.',
        time: '2 days ago',
        read: true,
        icon: Package,
        color: 'text-blue-600',
        bgColor: 'bg-blue-100'
      }
    ];

    setNotifications(demoNotifications);
  }, []);

  const markAsRead = (id) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id 
          ? { ...notification, read: true }
          : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, read: true }))
    );
  };

  const deleteNotification = (id) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  };

  const filteredNotifications = notifications.filter(notification => {
    if (filter === 'unread') return !notification.read;
    if (filter === 'read') return notification.read;
    return true;
  });

  const unreadCount = notifications.filter(n => !n.read).length;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="flex min-h-screen items-start justify-center p-4 pt-16">
        <div className="relative w-full max-w-md bg-white rounded-2xl shadow-xl">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Bell className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">Notifications</h2>
                <p className="text-sm text-gray-600">
                  {unreadCount > 0 ? `${unreadCount} unread` : 'All caught up!'}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Filter Tabs */}
          <div className="flex border-b border-gray-200">
            {[
              { key: 'all', label: 'All', count: notifications.length },
              { key: 'unread', label: 'Unread', count: unreadCount },
              { key: 'read', label: 'Read', count: notifications.length - unreadCount }
            ].map(tab => (
              <button
                key={tab.key}
                onClick={() => setFilter(tab.key)}
                className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
                  filter === tab.key
                    ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                {tab.label} ({tab.count})
              </button>
            ))}
          </div>

          {/* Actions */}
          {unreadCount > 0 && (
            <div className="p-4 border-b border-gray-200 bg-gray-50">
              <button
                onClick={markAllAsRead}
                className="text-sm text-blue-600 hover:text-blue-700 font-medium"
              >
                Mark all as read
              </button>
            </div>
          )}

          {/* Notifications List */}
          <div className="max-h-96 overflow-y-auto">
            {filteredNotifications.length === 0 ? (
              <div className="p-8 text-center">
                <Bell className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">No notifications found</p>
              </div>
            ) : (
              <div className="divide-y divide-gray-100">
                {filteredNotifications.map((notification) => {
                  const Icon = notification.icon;
                  return (
                    <div
                      key={notification.id}
                      className={`p-4 hover:bg-gray-50 transition-colors ${
                        !notification.read ? 'bg-blue-50' : ''
                      }`}
                    >
                      <div className="flex items-start space-x-3">
                        <div className={`p-2 rounded-lg ${notification.bgColor}`}>
                          <Icon className={`w-5 h-5 ${notification.color}`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <h4 className={`text-sm font-medium ${
                                !notification.read ? 'text-gray-900' : 'text-gray-700'
                              }`}>
                                {notification.title}
                              </h4>
                              <p className="text-sm text-gray-600 mt-1">
                                {notification.message}
                              </p>
                              <div className="flex items-center mt-2 space-x-2">
                                <Clock className="w-3 h-3 text-gray-400" />
                                <span className="text-xs text-gray-500">
                                  {notification.time}
                                </span>
                                {!notification.read && (
                                  <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                                )}
                              </div>
                            </div>
                            <div className="flex items-center space-x-1 ml-2">
                              {!notification.read && (
                                <button
                                  onClick={() => markAsRead(notification.id)}
                                  className="p-1 text-gray-400 hover:text-blue-600 rounded"
                                  title="Mark as read"
                                >
                                  <CheckCircle className="w-4 h-4" />
                                </button>
                              )}
                              <button
                                onClick={() => deleteNotification(notification.id)}
                                className="p-1 text-gray-400 hover:text-red-600 rounded"
                                title="Delete notification"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-gray-200 bg-gray-50">
            <button className="w-full text-sm text-gray-600 hover:text-gray-900 font-medium">
              View All Notifications
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationModal;
