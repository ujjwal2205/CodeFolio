import { BrowserRouter } from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import StoreProvider from './context/StoreContext.jsx'
import { GoogleOAuthProvider } from '@react-oauth/google'
createRoot(document.getElementById('root')).render(
  <StoreProvider>
  <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
  <BrowserRouter>
    <App />
  </BrowserRouter>
  </GoogleOAuthProvider>
  </StoreProvider>
)
