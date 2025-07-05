import './App.css'
import {DiscoverPage} from './features/discover/DiscoverPage'
import { CssBaseline, GeistProvider } from '@geist-ui/react'

function App() {

  return (
    <GeistProvider>
      <CssBaseline />
      <DiscoverPage />
   </GeistProvider>
  )
}

export default App
