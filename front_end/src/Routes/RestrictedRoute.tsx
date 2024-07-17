import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../Context/useAuth";

type Props = { children: React.ReactNode };

const RestrictedRoute = ({ children }: Props) => {
  const location = useLocation();
  const { isLoggedIn } = useAuth();
  return !isLoggedIn() ? (
    <>{children}</>
  ) : (
    <Navigate to="/dashboard" state={{ from: location }} replace />
  );
};

export default RestrictedRoute;