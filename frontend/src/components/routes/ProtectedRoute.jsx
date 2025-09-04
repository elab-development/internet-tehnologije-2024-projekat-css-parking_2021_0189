import { Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const ProtectedRoute = ({ children, requiredRole }) => {
  const { user } = useAuth();

  if (!user) {
    // Nije ulogovan → redirect na login
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && user.role !== requiredRole) {
    // Nije odgovarajuće uloge → redirect na default stranicu
    return <Navigate to="/levels" replace />;
  }

  return children;
};

export default ProtectedRoute;
