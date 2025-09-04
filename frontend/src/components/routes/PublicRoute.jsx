import { Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const PublicRoute = ({ children }) => {
  const { user } = useAuth();

  if (user) {
    // Ako je već ulogovan → redirect na levels
    return <Navigate to="/levels" replace />;
  }

  return children;
};

export default PublicRoute;
