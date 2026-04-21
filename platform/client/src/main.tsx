import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom' // <-- Importamos las rutas
import { GoogleOAuthProvider } from '@react-oauth/google' // <-- Importamos Google
import App from './App.tsx'
import './index.css'

// ID real (Es seguro tenerlo aquí en el Front)
const CLIENT_ID = "314351383097-37npvvmt5h2tnn6op97cnbhskc99l7dk.apps.googleusercontent.com";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={CLIENT_ID}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </GoogleOAuthProvider>
  </StrictMode>,
)