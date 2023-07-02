import React, { useEffect, useState } from 'react'
import LandingPage from './LandingPage.js';

const App = () => {
  // const [message, setMessage] = useState('');

  // const [message, setMessage] = useState('');

// useEffect(() => {
//     fetch('/api')
//       .then(response => response.json())
//       .then(data => setMessage(data.message));
//   }, []);

  return (
    <div className="App">
      <header className="App-header">
      <LandingPage />
      </header>
    </div>
  );
};

export default App;
