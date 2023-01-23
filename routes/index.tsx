import React, { lazy } from 'react'
import { Navigate } from 'react-router-dom'
import type { myRoute } from '../types'
const Login = lazy(() => import('@/pages/Login'))
const Home = lazy(() => import('@/pages/Home'))
const Error = lazy(() => import('@/pages/Error'))
const routes: myRoute[] = [
  {
    path: '/',
    element: <Navigate to={'/home'} />
  },
  {
    path: '/home',
    element: <Home />,
    auth: true
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/404',
    element: <Error />
  }
]

export default routes
