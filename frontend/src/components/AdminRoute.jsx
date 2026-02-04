import { Navigate, Outlet } from 'react-router-dom';

const AdminRoute = () => {
  // 1. Get User Info
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));

  // 2. Check if Admin
  const isAdmin = userInfo && userInfo.role === 'admin';

  // 3. Decide: Show Page OR Redirect
  return isAdmin ? <Outlet /> : <Navigate to="/dashboard" replace />;
};

export default AdminRoute;


















































