import '@pages/popup/Popup.scss'
import { Route, Routes } from 'react-router-dom'
// import routesConfig from '@src/routes'

import { privateRoutes, publicRoutes } from '@src/routes/index'
import PrivateRoute from '@src/components/PrivateRoute/PrivateRoute'
import React from 'react'

function Popup() {
  return (
    <Routes>
      {publicRoutes.map((route, index) => {
        const Page = route.component

        return <Route key={index} path={route.path} element={<Page />} />
      })}

      <Route element={<PrivateRoute />}>
        {privateRoutes.map((route, index) => {
          const Page = route.component
          const Layout = route?.layout || React.Fragment
          return (
            <Route
              key={index}
              path={route.path}
              element={
                <Layout>
                  <Page />
                </Layout>
              }
            />
          )
        })}
      </Route>
    </Routes>
  )
}

export default Popup
