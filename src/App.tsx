import './App.css';
import Login from './component/Login';
import { useState } from 'react';
import VersionManager from './component/VersionManager';
import Header from './component/Header';
import React from 'react';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false); 

  const handleLogout = (): void => {
    setIsAuthenticated(false);
    console.log('Logout clicked');
  };

  return (
    <>
      <Header isAuthenticated={isAuthenticated} onLogout={handleLogout} />
      {isAuthenticated ? (
        <VersionManager />
      ) : (
        <div className="login-container">
          <Login setIsAuthenticated={setIsAuthenticated} />
        </div>
      )}
    </>
  );
}

export default App;
