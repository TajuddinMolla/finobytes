import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import type { UserRole } from "../types/auth";
import type { RootState } from "../store/store";

interface Props {
  children?: React.ReactNode;
  role?: UserRole;
}

const ProtectedRoute: React.FC<Props> = ({ children, role }) => {
  const { isLoggedIn, user } = useSelector((state: RootState) => state.auth);

  if (!isLoggedIn) return <Navigate to={`/login/${role}`} />;
  if (role && user?.role !== role) return <Navigate to={`/login/${role}`} />;

  return <>{children ? children : <Outlet />}</>;
};

export default ProtectedRoute;
