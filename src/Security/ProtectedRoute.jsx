import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, allowedUserTypes = [] }) => {
  const accessToken = localStorage.getItem("accessToken");
  const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}");

  if (!accessToken) {
    return <Navigate to="/login" replace />;
  }

  if (
    allowedUserTypes.length > 0 &&
    !allowedUserTypes.includes(currentUser.userType)
  ) {
    return <Navigate to="/login" replace />;
  }
  return children;
};
export default ProtectedRoute;
