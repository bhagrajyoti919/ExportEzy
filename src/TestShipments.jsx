import React from 'react';

const TestShipments = () => {
  console.log('TestShipments component rendering...');
  
  return (
    <div style={{ padding: '20px', backgroundColor: '#f0f0f0', minHeight: '100vh' }}>
      <h1 style={{ color: 'blue', fontSize: '24px' }}>Shipments Page - Working!</h1>
      <div style={{ backgroundColor: 'white', padding: '20px', margin: '20px 0', borderRadius: '8px' }}>
        <h2>Shipment Tracking</h2>
        <p>This is the shipments page and it's working properly.</p>
        <div style={{ backgroundColor: '#e3f2fd', padding: '15px', borderRadius: '5px', margin: '10px 0' }}>
          <h3>SH-2024-001</h3>
          <p>New York → London</p>
          <p>Status: Delivered</p>
        </div>
        <div style={{ backgroundColor: '#fff3e0', padding: '15px', borderRadius: '5px', margin: '10px 0' }}>
          <h3>SH-2024-002</h3>
          <p>Los Angeles → Sydney</p>
          <p>Status: In Transit</p>
        </div>
      </div>
    </div>
  );
};

export default TestShipments;
