import React, { Suspense } from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import routers from '../routes'
import BeforeEnter from '../routes/beforeEnter'
import Loading from './pages/Loading'
function App() {
  const queryClient = new QueryClient()
  return (
    <QueryClientProvider client={queryClient}>
      <>
        <Suspense fallback={<Loading />}>
          <BeforeEnter routers={routers} />
        </Suspense>
      </>
    </QueryClientProvider>
  )
}

export default App
