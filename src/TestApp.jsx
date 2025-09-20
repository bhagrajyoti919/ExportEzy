import React from 'react';

function TestApp() {
  return (
    <div style={{ padding: '20px', backgroundColor: '#f0f0f0', minHeight: '100vh' }}>
      <h1 style={{ color: 'red', fontSize: '24px' }}>Test App - If you see this, React is working!</h1>
      <div className="bg-blue-500 text-white p-4 rounded">
        This should be blue if Tailwind CSS is working
      </div>
      <div>
        <p>Current time: {new Date().toLocaleString()}</p>
        <button onClick={() => alert('Button clicked!')}>Test Button</button>
      </div>
    </div>
  );
}

export default TestApp;
