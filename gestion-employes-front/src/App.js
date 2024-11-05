import logo from './logo.svg';
import './App.css';

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import EmployeeList from './components/EmployeeList';
import LeaveTracking from './components/LeaveTracking';
import EmployeeDetails from './pages/EmployeeDetails';
import './tailwind.css';

function App() {
  return (
      <Router>
          <Navbar />
          <div className="main-content">
              <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/employees" element={<EmployeeList />} />
                  <Route path="/leave-tracking" element={<LeaveTracking />} />
                  <Route path="/employees/:id" element={<EmployeeDetails />} />
              </Routes>
          </div>
      </Router>
  );
}

export default App;
