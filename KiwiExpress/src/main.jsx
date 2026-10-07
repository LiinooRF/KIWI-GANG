import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

//estilos: primero bootstrap y despues los nuestros para poder sobreescribirlo
import 'bootstrap/dist/css/bootstrap.min.css'
import './css/estilos.css'
import './css/style.css'

import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
