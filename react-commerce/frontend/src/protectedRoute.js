// protectedRoute.js
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, roleRequired }) => {
  const token = localStorage.getItem('token');
  const role = sessionStorage.getItem('role');
//   console.log(token)
//   console.log(role)

  if (!token) {
    return <Navigate to="/" />;
  }

  if (roleRequired && role !== roleRequired) {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;
