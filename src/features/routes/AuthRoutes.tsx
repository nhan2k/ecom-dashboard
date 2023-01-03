import * as React from 'react';
import { useAppSelector } from '../hooks/reduxHooks';
import { getAuthState } from '@features/redux/slices/auth';
import { Navigate } from 'react-router-dom';

interface IProtectedRouteProps {
  children: JSX.Element;
}

const ProtectedRoute: React.FunctionComponent<IProtectedRouteProps> = ({ children }) => {
  const { auth } = useAppSelector(getAuthState);

  if (!auth) {
    return <Navigate to="/signin" />;
  }

  return children;
};

export default ProtectedRoute;
