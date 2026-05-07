import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

/**
 * Protects child routes — redirects to /login if unauthenticated.
 * Reads auth state from the Redux store instead of calling authService directly.
 */
export default function ProtectedRoute({ children }) {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return children;
}
