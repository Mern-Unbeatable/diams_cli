import { Navigate } from "react-router";
import { getRoleDashboardPath } from "@/config/dummyAuth";
import { useAuth } from "@/context/AuthContext";

const RoleDashboardRedirect = () => {
  const { user } = useAuth();

  return <Navigate to={getRoleDashboardPath(user.role)} replace />;
};

export default RoleDashboardRedirect;
