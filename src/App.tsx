import React from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { connect } from 'react-redux'
import routers from '../routes'
import BeforeEnter from '../routes/beforeEnter'
import { fetchUserInfoAction } from '@/store/features/user'
function App(props: { fetchUserInfo: () => void }) {
  props.fetchUserInfo()
  const queryClient = new QueryClient()
  return (
    <QueryClientProvider client={queryClient}>
      <BeforeEnter routers={routers} />
    </QueryClientProvider>
  )
}
const mapDispatchToProps = (dispatch: any) => ({
  fetchUserInfo() {
    dispatch(fetchUserInfoAction())
  }
})
export default connect(null, mapDispatchToProps)(App)
