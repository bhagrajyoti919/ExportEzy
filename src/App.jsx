import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Layout from './components/Layout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Shipments from './pages/Shipments';
import Inventory from './pages/Inventory';
import Clients from './pages/Clients';
import TestClients from './TestClients';
import TestClientsSimple from './TestClientsSimple';
import TestShipments from './TestShipments';
import TestInventory from './TestInventory';
import Profile from './pages/Profile';
import TestProfile from './TestProfile';
import ShipmentDetail from './pages/ShipmentDetail';

// Start MSW
// if (import.meta.env.DEV) {
//   const { worker } = await import('./mocks/browser');
//   worker.start();
// }

function App() {
  useEffect(() => {
    // Add Google Fonts
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
  }, []);

  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route
              path="/*"
              element={
                <ProtectedRoute>
                  <Layout>
                    <Routes>
                      <Route path="dashboard" element={<Dashboard />} />
                      <Route path="shipments" element={<Shipments />} />
                      <Route path="shipments/:id" element={<ShipmentDetail />} />
                      <Route path="inventory" element={<Inventory />} />
                      <Route path="clients" element={<Clients />} />
                    </Routes>
                  </Layout>
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;


