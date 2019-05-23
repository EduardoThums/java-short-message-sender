import React from 'react'
import { MainRouting } from './routes'
import { GlobalContext } from './context'
import { AlertScreen } from './components';

const App: React.FC = () => {
  return (
    <GlobalContext>
      <AlertScreen />
      <MainRouting />
    </GlobalContext>
  )
}

export default App 
