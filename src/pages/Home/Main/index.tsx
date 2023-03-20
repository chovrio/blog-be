import Loading from '@/pages/Loading'
import { Content } from 'antd/es/layout/layout'
import React, { Suspense } from 'react'
import { Outlet } from 'react-router-dom'
function Main() {
  return (
    <Content
      style={{
        margin: '24px 16px',
        padding: 24,
        minHeight: 280,
        backgroundColor: 'white'
      }}
    >
      <div style={{ height: '100%' }}>
        <Suspense fallback={<Loading />}>
          <Outlet />
        </Suspense>
      </div>
    </Content>
  )
}
export default Main
