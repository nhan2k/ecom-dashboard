import * as React from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks';
import { getAuthState, setDecoded } from '@features/redux/slices/auth';
import { useNavigate, Navigate } from 'react-router-dom';

interface IProtectedRouteProps {
  children: JSX.Element;
}

const ProtectedRoute: React.FunctionComponent<IProtectedRouteProps> = ({ children }) => {
  const { auth, decoded } = useAppSelector(getAuthState);
  const dispatch = useAppDispatch();
  if (!decoded) {
    dispatch(setDecoded(JSON.parse('role')));
  }
  if (!auth) {
    return <Navigate to="/signin" />;
  }

  return children;
};

export default ProtectedRoute;
