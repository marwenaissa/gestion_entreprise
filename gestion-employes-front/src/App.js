import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import EmployeeList from './components/EmployeeList';
import LeaveTracking from './components/LeaveTracking';
import EmployeeDetails from './pages/EmployeeDetails';
import Modal from './components/Modal';
import UpdateLeaveForm from './components/UpdateLeaveForm';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import { AuthProvider } from './context/AuthContext'; // Contexte d'authentification
import PrivateRoute from './components/PrivateRoute'; // Route protégée
import './tailwind.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [leaveId, setLeaveId] = useState(null);

  const openModal = (id) => {
    setLeaveId(id);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setLeaveId(null);
  };

  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes (Login and Register) */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>

        {/* Sidebar and Header are always visible if authenticated */}
        <div className="flex">
          <Sidebar />
          <div className="flex-1 ml-64">
            <Header />
            <Routes>
              {/* Protected Routes */}
              <Route
                path="/dashboard"
                element={
                  <PrivateRoute>
                    <Dashboard />
                  </PrivateRoute>
                }
              />
              <Route
                path="/employees"
                element={
                  <PrivateRoute>
                    <EmployeeList openModal={openModal} />
                  </PrivateRoute>
                }
              />
              <Route
                path="/leave-tracking"
                element={
                  <PrivateRoute>
                    <LeaveTracking openModal={openModal} />
                  </PrivateRoute>
                }
              />
              <Route
                path="/employees/:id"
                element={
                  <PrivateRoute>
                    <EmployeeDetails />
                  </PrivateRoute>
                }
              />
            </Routes>
          </div>
        </div>

        {/* Modal for leave update */}
        <Modal isOpen={isModalOpen} onClose={closeModal}>
          <UpdateLeaveForm leaveId={leaveId} onLeaveUpdated={closeModal} />
        </Modal>
      </Router>
    </AuthProvider>
  );
}

export default App;
