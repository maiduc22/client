import { useAuthContext } from '@/hooks/context';
import { Navigate } from 'react-router-dom';
import { ROUTER } from '@/configs/router';

const ProtectedRoute = ({
  children,
  allowedRoles
}: {
  children: JSX.Element;
  allowedRoles: string[];
}) => {
  const { state } = useAuthContext();

  if (!allowedRoles.includes(state.role)) {
    return <Navigate to={ROUTER.UNAUTHORIZE} />;
  }

  return children;
};

export default ProtectedRoute;
