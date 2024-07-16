import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from '../Pages/LandingPage/LandingPage';
import LoginPage from '../Pages/LoginPage';
import SignUpPage from '../Pages/SignUpPage';
import NotFoundPage from '../Pages/NotFoundPage';
import CheckOutPage from '../Pages/CheckOutPage/CheckOutPage';
import Dashboard from '../Pages/DashBoardPage/Dashboard';
import ProtectedRoute from './ProtectedRoute';
import PersonalInfo from '../Pages/DashBoardPage/PersonalInfo';

const AppRouter: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="signup" element={<SignUpPage />} />
        <Route path="checkout" element={<CheckOutPage />} />
        <Route path="dashboard" element={
          <ProtectedRoute>
             <Dashboard />
          </ProtectedRoute>
          } />
          <Route path="personal-info" element={<PersonalInfo />} />
        <Route />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
