import * as React from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { publicRoutes } from '@features/routes';
import { DefaultLayout } from '@features/layout';
import NotFound from '@pages/not-found';
import ProtectedRoute from '@features/routes/AuthRoutes';
import { rolesMap } from '@features/redux/slices/auth/enum';
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks';
import { getAuthState, setDecoded } from '../redux/slices/auth';

interface AppInterface {}

const App: React.FunctionComponent<AppInterface> = () => {
  const { decoded } = useAppSelector(getAuthState);

  return (
    <Router>
      <Routes>
        {publicRoutes.map(({ component, path, layout, role, isPublic }, index: number) => {
          let Page = component;

          let Layout = DefaultLayout;

          if (layout) {
            Layout = layout;
          } else if (layout === null) {
            Layout = React.Fragment;
          }

          if (isPublic) {
            return (
              <Route
                key={index}
                path={path}
                element={
                  <Layout>
                    <Page />
                  </Layout>
                }
              />
            );
          }

          return (
            <Route
              key={index}
              path={role ? (role === decoded.admin ? path : role === decoded.vendor ? path : '/') : '/404'}
              element={
                <Layout>
                  <ProtectedRoute>
                    <Page />
                  </ProtectedRoute>
                </Layout>
              }
            />
          );
        })}

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
