import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from '../components/ProtectedRoute';
import Layout from '../components/Layout';
import Login from '../pages/Login';
import Dashboard from '../pages/Dashboard';
import Shipments from '../pages/Shipments';
import Inventory from '../pages/Inventory';
import Clients from '../pages/Clients';
import ShipmentDetail from '../pages/ShipmentDetail';

// Route configuration
export const routeConfig = [
  {
    path: '/login',
    element: <Login />,
    public: true
  },
  {
    path: '/',
    element: <Navigate to="/dashboard" replace />,
    public: true
  },
  {
    path: '/dashboard',
    element: <Dashboard />,
    protected: true
  },
  {
    path: '/shipments',
    element: <Shipments />,
    protected: true
  },
  {
    path: '/shipments/:id',
    element: <ShipmentDetail />,
    protected: true
  },
  {
    path: '/inventory',
    element: <Inventory />,
    protected: true
  },
  {
    path: '/clients',
    element: <Clients />,
    protected: true
  }
];

// Main App Routes Component
export const AppRoutes = () => (
  <Routes>
    {routeConfig.map(({ path, element, public: isPublic, protected: isProtected }) => (
      <Route
        key={path}
        path={path}
        element={
          isProtected ? (
            <ProtectedRoute>
              <Layout>
                {element}
              </Layout>
            </ProtectedRoute>
          ) : (
            element
          )
        }
      />
    ))}
  </Routes>
);

export default AppRoutes;
