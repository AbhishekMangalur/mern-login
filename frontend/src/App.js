import React, { useState } from 'react';
import Login from './Login';
import Register from './Register';

function App() {
  const [showLogin, setShowLogin] = useState(true);

  return (
    <div>
      <h1>Simple MERN Auth</h1>
      <button onClick={() => setShowLogin(true)}>Login</button>
      <button onClick={() => setShowLogin(false)}>Register</button>
      {showLogin ? <Login /> : <Register />}
    </div>
  );
}

export default App;
