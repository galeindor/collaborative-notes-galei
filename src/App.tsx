// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Notes from './components/Notes';
import Navbar from './components/Navbar';
import './index.css';

const App: React.FC = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
              <Route path="/" element={
                  <div className="center-container">
                      <h1>Welcome to Notes App</h1>
                    </div>
        } />
        <Route path="/login" element={<Login />} />
        <Route path="/notes" element={<Notes />} />
      </Routes>
    </Router>
  );
};

export default App;
