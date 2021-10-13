import React, { createContext } from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import reportWebVitals from './reportWebVitals'
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'

firebase.initializeApp({
  apiKey: 'AIzaSyDCiAukTBw4fPPPtNTsq7rxQwtvJKl1H5U',
  authDomain: 'chat-react-bacfd.firebaseapp.com',
  projectId: 'chat-react-bacfd',
  storageBucket: 'chat-react-bacfd.appspot.com',
  messagingSenderId: '224346962056',
  appId: '1:224346962056:web:18f4100cd2aea483e8473d',
})

export const Context = createContext(null)

const auth = firebase.auth()
const firestore = firebase.firestore()

ReactDOM.render(
  <Context.Provider value={{ firebase, auth, firestore }}>
    <App />
  </Context.Provider>,
  document.getElementById('root')
)

reportWebVitals()
