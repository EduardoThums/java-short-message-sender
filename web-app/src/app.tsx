import React from 'react'
import { MainRouting } from './routes'
import { GlobalContext } from './context'

const App: React.FC = () => {
  return (
    <GlobalContext>
      <MainRouting />
    </GlobalContext>
  )
}

export default App 
