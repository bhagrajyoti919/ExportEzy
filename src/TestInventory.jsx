import React from 'react';

const TestInventory = () => {
  console.log('TestInventory component rendering...');
  
  return (
    <div style={{ padding: '20px', backgroundColor: '#f0f0f0', minHeight: '100vh' }}>
      <h1 style={{ color: 'blue', fontSize: '24px' }}>Inventory Page - Working!</h1>
      <div style={{ backgroundColor: 'white', padding: '20px', margin: '20px 0', borderRadius: '8px' }}>
        <h2>Warehouse Inventory</h2>
        <p>This is the inventory page and it's working properly.</p>
        <div style={{ backgroundColor: '#e8f5e8', padding: '15px', borderRadius: '5px', margin: '10px 0' }}>
          <h3>Electronic Components</h3>
          <p>Warehouse A - 25 units</p>
          <p>Status: Low Stock</p>
        </div>
        <div style={{ backgroundColor: '#fff3e0', padding: '15px', borderRadius: '5px', margin: '10px 0' }}>
          <h3>Automotive Parts</h3>
          <p>Warehouse B - 15 units</p>
          <p>Status: Critical</p>
        </div>
      </div>
    </div>
  );
};

export default TestInventory;
