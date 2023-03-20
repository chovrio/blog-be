import Error404 from '@/pages/404'
import Error403 from '@/pages/403'
import Home from '@/pages/Home'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import React, { lazy } from 'react'
import { Navigate } from 'react-router-dom'
import type { myRoute } from '~/route'
// const Login = lazy(() => import('@/pages/Login'))
// const Home = lazy(() => import('@/pages/Home'))
// const Error = lazy(() => import('@/pages/Error'))
const System = lazy(() => import('@/pages/Home/Main/System'))
const ArticleManage = lazy(() => import('@/pages/Home/Main/Article/Manage'))
const ArticleWrite = lazy(() => import('@/pages/Home/Main/Article/Write'))
const ArticleEditor = lazy(() => import('@/pages/Home/Main/Article/Editor'))
const Info = lazy(() => import('@/pages/Home/Main/User/Info'))
const UserManage = lazy(() => import('@/pages/Home/Main/User/Manage'))
const BasePoint = lazy(() => import('@/pages/Home/Main/BasePoint'))
const routes: myRoute[] = [
  {
    path: '/',
    element: <Navigate to={'/home/system'} />,
    purview: 3
  },
  {
    path: '/404',
    element: <Error404 />,
    purview: 3
  },
  {
    path: '/403',
    element: <Error403 />,
    purview: 3
  },
  {
    path: '/login',
    element: <Login />,
    purview: 3
  },
  {
    path: '/register',
    element: <Register />,
    purview: 3
  },
  {
    path: '/home',
    element: <Home />,
    purview: 3,
    auth: true,
    children: [
      {
        path: 'system',
        element: <System />,
        purview: 3,
        auth: true
      },
      {
        path: 'basepoint',
        element: <BasePoint />,
        purview: 3,
        auth: true
      },
      {
        path: 'article',
        purview: 3,
        auth: true,
        children: [
          {
            path: 'write',
            element: <ArticleWrite />,
            purview: 3,
            auth: true
          },
          {
            path: 'manage',
            element: <ArticleManage />,
            purview: 3,
            auth: true
          },
          {
            path: 'editor',
            element: <ArticleEditor />,
            purview: 3,
            auth: true
          }
        ]
      },
      {
        path: 'user',
        purview: 3,
        auth: true,
        children: [
          {
            path: 'manage',
            element: <UserManage />,
            purview: 0,
            auth: true
          },
          {
            path: 'info',
            element: <Info />,
            purview: 3,
            auth: true
          }
        ]
      }
    ]
  }
]
export default routes
