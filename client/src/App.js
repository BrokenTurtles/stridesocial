import React, { useEffect, useState } from 'react'
import Login from './Login'
const App = () => {

const [message, setMessage] = useState('')

// useEffect(() => {
//     fetch('/api')
//       .then(response => response.json())
//       .then(data => setMessage(data.message));
//   }, []);

  return (
    <div className="App">
      <Login />
    </div>
  )
}

export default App