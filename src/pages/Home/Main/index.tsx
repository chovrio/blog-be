import Loading from '@/pages/Loading'
import { fetchUserInfoAction } from '@/store/features/user'
import { Content } from 'antd/es/layout/layout'
import React, { Suspense } from 'react'
import { connect } from 'react-redux'
import { Outlet } from 'react-router-dom'
function Main(props: { fetchUserInfo: () => void }) {
  props.fetchUserInfo()
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
const mapDispatchToProps = (dispatch: any) => ({
  fetchUserInfo() {
    dispatch(fetchUserInfoAction())
  }
})
export default connect(null, mapDispatchToProps)(Main)
