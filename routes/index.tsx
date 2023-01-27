import Error from '@/pages/Error'
import Home from '@/pages/Home'
import Login from '@/pages/Login'
import React, { lazy } from 'react'
import { Navigate } from 'react-router-dom'
import type { myRoute } from '~/route'
// const Login = lazy(() => import('@/pages/Login'))
// const Home = lazy(() => import('@/pages/Home'))
// const Error = lazy(() => import('@/pages/Error'))
const System = lazy(() => import('@/pages/Home/Main/System'))
const ArticleManage = lazy(() => import('@/pages/Home/Main/Article/Manage'))
const Write = lazy(() => import('@/pages/Home/Main/Article/Write'))
const Info = lazy(() => import('@/pages/Home/Main/User/Info'))
const UserManage = lazy(() => import('@/pages/Home/Main/User/Manage'))
const BasePoint = lazy(() => import('@/pages/Home/Main/BasePoint'))
const routes: myRoute[] = [
  {
    path: '/',
    element: <Navigate to={'/home/system'} />
  },
  {
    path: '/404',
    element: <Error />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/home',
    element: <Home />,
    auth: true,
    children: [
      {
        path: 'system',
        element: <System />
      },
      {
        path: 'basepoint',
        element: <BasePoint />
      },
      {
        path: 'article/write',
        element: <Write />
      },
      {
        path: 'article/manage',
        element: <ArticleManage />
      },
      {
        path: 'user/manage',
        element: <UserManage />
      },
      {
        path: 'user/info',
        element: <Info />
      }
    ]
  }
]
export default routes
