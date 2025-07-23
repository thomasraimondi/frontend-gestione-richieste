import React from "react";
import { useAuth } from "../contexts/AuthContext";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>;

  if (!user) {
    // window.location.reload();
    return null;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
