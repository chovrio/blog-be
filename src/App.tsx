import React from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import routers from '../routes'
import BeforeEnter from '../routes/beforeEnter'
function App() {
  const queryClient = new QueryClient()
  return (
    <QueryClientProvider client={queryClient}>
      <BeforeEnter routers={routers} />
    </QueryClientProvider>
  )
}

export default App
