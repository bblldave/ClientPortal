import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './components/Register';
import React from 'react'
import Login from './components/Login';
import Layout from './components/Layout';

function App() {
  return (
    <>
      <Router>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Layout />} />
      </Routes>
    </Router>
    </>
  );
}

export default App;
