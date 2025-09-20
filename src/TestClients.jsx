import React from 'react';

const TestClients = () => {
  return (
    <div style={{ padding: '20px', backgroundColor: '#f0f0f0', minHeight: '100vh' }}>
      <h1 style={{ color: 'blue', fontSize: '24px' }}>Test Clients Page - React is working!</h1>
      <div style={{ backgroundColor: 'white', padding: '20px', margin: '20px 0', borderRadius: '8px' }}>
        <h2>Client Directory</h2>
        <p>This is a test version of the clients page.</p>
        <div style={{ backgroundColor: '#e3f2fd', padding: '15px', borderRadius: '5px', margin: '10px 0' }}>
          <h3>Sarah Johnson</h3>
          <p>GlobalTech Inc. - United States</p>
          <p>Status: Active</p>
        </div>
        <div style={{ backgroundColor: '#e8f5e8', padding: '15px', borderRadius: '5px', margin: '10px 0' }}>
          <h3>James Wilson</h3>
          <p>British Imports Ltd. - United Kingdom</p>
          <p>Status: Active</p>
        </div>
      </div>
    </div>
  );
};

export default TestClients;
