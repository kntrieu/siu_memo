import React from 'react';
import './App.css';
import NavbarComponent from '../components/Navbar'
import Dashboard from './Dashboard';

function App() {
  return (
    <div className="container-fluid siu-container">
      <NavbarComponent/>
      <Dashboard/>
    </div>
  );
}

export default App;
