import React, { Suspense } from 'react'
import routers from '../routes'
import BeforeEnter from '../routes/beforeEnter'
import Loading from './pages/Loading'
function App() {
  return (
    <Suspense fallback={<Loading />}>
      <BeforeEnter routers={routers} />
    </Suspense>
  )
}

export default App
