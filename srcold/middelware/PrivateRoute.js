import { Navigate } from 'react-router-dom';

// This component will act as a guard and check if the user is authenticated
const PrivateRoute = ({ element }) => {
  const token = localStorage.getItem('authToken');

  // If there's no token, redirect to the login page
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // If token exists, render the passed element (protected component)
  return element;
};

export default PrivateRoute;
