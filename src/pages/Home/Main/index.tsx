import { Content } from 'antd/es/layout/layout'
import React, { Suspense } from 'react'
import { Outlet } from 'react-router-dom'
export default function Main() {
  return (
    <Content
      style={{
        margin: '24px 16px',
        padding: 24,
        minHeight: 280,
        backgroundColor: 'white'
      }}
    >
      <div>
        <Suspense fallback={<h1>Loading...</h1>}>
          <Outlet />
        </Suspense>
      </div>
    </Content>
  )
}
