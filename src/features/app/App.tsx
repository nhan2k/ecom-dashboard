import * as React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { publicRoutes, adminRoutes, vendorRoutes } from '@features/routes'
import { DefaultLayout } from '@features/layout'
import NotFound from '@pages/not-found'

interface AppInterface {}

const App: React.FunctionComponent<AppInterface> = () => {
  return (
    <Router>
      <Routes>
        {publicRoutes.map(({ component, path, layout }, index: number) => {
          const Page = component

          let Layout = DefaultLayout

          if (layout) {
            Layout = layout
          } else if (layout === null) {
            Layout = React.Fragment
          }

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
          )
        })}
        {adminRoutes.map(({ component, path, layout }, index: number) => {
          const Page = component

          let Layout = DefaultLayout

          if (layout) {
            Layout = layout
          } else if (layout === null) {
            Layout = React.Fragment
          }

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
          )
        })}
        {vendorRoutes.map(({ component, path, layout }, index: number) => {
          const Page = component

          let Layout = DefaultLayout

          if (layout) {
            Layout = layout
          } else if (layout === null) {
            Layout = React.Fragment
          }

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
          )
        })}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  )
}

export default App
