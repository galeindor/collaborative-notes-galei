// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Notes from './components/Notes';
import Layout from './components/Layout';

const App: React.FC = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/notes" element={<Notes />} />
          <Route path="/" element={<Layout children={undefined} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
