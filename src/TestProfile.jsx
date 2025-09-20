import React from 'react';

const TestProfile = () => {
  return (
    <div style={{ padding: '20px', backgroundColor: '#f0f0f0', minHeight: '100vh' }}>
      <h1 style={{ color: 'blue', fontSize: '24px' }}>Test Profile Page - Working!</h1>
      <div style={{ backgroundColor: 'white', padding: '20px', margin: '20px 0', borderRadius: '8px' }}>
        <h2>User Profile</h2>
        <p>This is a test version of the profile page.</p>
        <div style={{ backgroundColor: '#e3f2fd', padding: '15px', borderRadius: '5px', margin: '10px 0' }}>
          <h3>Demo User</h3>
          <p>Email: demo@exportezy.com</p>
          <p>Position: Logistics Manager</p>
        </div>
      </div>
    </div>
  );
};

export default TestProfile;
