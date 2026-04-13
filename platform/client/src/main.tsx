import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { GoogleOAuthProvider } from '@react-oauth/google'

// Reemplaza esto con tu Client ID real de la consola de Google
const CLIENT_ID = "314351383097-37npvvmt5h2tnn6op97cnbhskc99l7dk.apps.googleusercontent.com";

createRoot(document.getElementById('root')!).render(
  <GoogleOAuthProvider clientId={CLIENT_ID}>
    <StrictMode>
      <App />
    </StrictMode>
  </GoogleOAuthProvider>,
)