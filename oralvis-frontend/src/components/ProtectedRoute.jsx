import { getToken, parseJwt } from '../utils/auth';
import { Navigate, Outlet } from 'react-router-dom';

export default function ProtectedRoute({ allowedRoles }) {
  const token = getToken();
  
  if (!token) return <Navigate to="/login" />;
  const payload = parseJwt(token);
  // console.log(payload)
  if (!allowedRoles.includes(payload?.role)) return <Navigate to="/login" />;
  return <Outlet />;
}
