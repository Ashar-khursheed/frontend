import { Route, Navigate } from 'react-router-dom';

// This component will act as a guard and check if the user is authenticated
const PrivateRoute = ({ element, ...rest }) => {
  const token = localStorage.getItem('token');
  
  // If there's no token, redirect to the login page
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  
  // If token exists, render the passed component
  return <Route {...rest} element={element} />;
};

export default PrivateRoute;
