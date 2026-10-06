import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'

//Para testing pre-landingpage reactificada. Reemplazar por App (entrypoint)
import Login from './pages/Login.jsx'
import Registro from './pages/Registro.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Login/>
  </StrictMode>,
)
