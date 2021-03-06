import React, {useContext} from 'react'
import './App.css'
import {BrowserRouter} from 'react-router-dom'
import {Navbar} from './components/Navbar'
import {AppRouter} from './components/AppRouter'
import {Loader} from './components/Loader'
import {Context} from './index'
import {useAuthState} from 'react-firebase-hooks/auth'

function App() {
  const {auth} = useContext(Context)
  const [_, loading] = useAuthState(auth)

  if (loading) {
    return <Loader/>
  }
  return (
    <BrowserRouter>
      <Navbar/>
      <AppRouter/>
    </BrowserRouter>
  )
}

export default App
