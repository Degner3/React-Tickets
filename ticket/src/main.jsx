import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './Global.scss'
import { UserContextProvider } from './Context/UserContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UserContextProvider>
      <App />
    </UserContextProvider>
  </React.StrictMode>,
)
