import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Notes from './components/Notes/Notes';
import Navbar from './components/Navbar';
import Home from './components/Home';

const App: React.FC = () => (
  <div className='bg-gray-900 text-white h-screen'>
  <Router>
    <Navbar />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/notes" element={<Notes />} />
    </Routes>
    </Router>
  </div>
);

export default App;
