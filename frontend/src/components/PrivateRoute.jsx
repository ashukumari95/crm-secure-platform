import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {
  const token = localStorage.getItem('token');

  // If token exists, let them pass (Outlet). 
  // If not, kick them to Login (Navigate).
  return token ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoute;