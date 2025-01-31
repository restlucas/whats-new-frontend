import { AuthContext } from "@src/contexts/AuthContext";
import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";

export const ProtectedRoute = () => {
  const { isAuthenticated, loading } = useContext(AuthContext);

  if (loading) {
    return (
      <div className="w-screen h-screen bg-light dark:bg-dark dark:text-light flex items-center justify-center">
        <div className="w">
          <div className="h-5 w-5 animate-spin rounded-full border-2  border-dark dark:border-white border-t-transparent" />
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/auth/creator" replace />;
  }

  return <Outlet />;
};
