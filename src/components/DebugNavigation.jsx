import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const DebugNavigation = () => {
  const location = useLocation();

  useEffect(() => {
    console.log('Current route:', location.pathname);
    console.log('Full location:', location);
  }, [location]);

  return (
    <div style={{
      position: 'fixed',
      top: '10px',
      right: '10px',
      background: 'rgba(0,0,0,0.8)',
      color: 'white',
      padding: '10px',
      borderRadius: '5px',
      fontSize: '12px',
      zIndex: 9999
    }}>
      Current Route: {location.pathname}
    </div>
  );
};

export default DebugNavigation;
