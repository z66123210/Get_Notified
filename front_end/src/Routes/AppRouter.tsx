import React from 'react';
import { BrowserRouter as Router, Route, Routes, createBrowserRouter } from 'react-router-dom';
import LandingPage from '../Pages/LandingPage/LandingPage';
import LoginPage from '../Pages/LoginPage';
import SignUpPage from '../Pages/SignUpPage';
import NotFoundPage from '../Pages/NotFoundPage';
import CheckOutPage from '../Pages/CheckOutPage/CheckOutPage';
import Dashboard from '../Pages/DashBoardPage/Dashboard';
import ProtectedRoute from './ProtectedRoute';
import PersonalInfo from '../Pages/DashBoardPage/PersonalInfoPage';
import RestrictedRoute from './RestrictedRoute';
import SearchesPage from '../Pages/DashBoardPage/SearchesPage';

const AppRouter =
    createBrowserRouter([
      {
          path: "/",
          element: <LandingPage />,
          errorElement: <NotFoundPage />,
  
      },
      {
          path: "/login",
          element: <RestrictedRoute>
                    <LoginPage />
                  </RestrictedRoute>,
      },
      {
          path: "/signup",
          element: <RestrictedRoute>
                    <SignUpPage />
                    </RestrictedRoute>,
      },
      {
          path: "/checkout",
          element: <CheckOutPage />,
      },
      {
          path: "/dashboard",
          element: (
              <ProtectedRoute>
                  <Dashboard />
              </ProtectedRoute>
          ),
          children: [
              {
                  path: "personal-info",
                  element: <PersonalInfo />,
              },
              {
                path: "your-searches",
                element: <SearchesPage />
              }
          ],
      },
  ]);


export default AppRouter;
