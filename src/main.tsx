import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './App'

import './index.css'

import 'bootstrap/dist/css/bootstrap.min.css';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';


const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    }
  }
})

const googleOAuthClientId = '1015986740737-bnii3vuh7eond8v9uj5fg3le18gs9i6r.apps.googleusercontent.com'



ReactDOM.createRoot(document.getElementById('root')!).render(
  <GoogleOAuthProvider clientId={googleOAuthClientId}>
      <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <App />
        </QueryClientProvider>
      </React.StrictMode>
  </GoogleOAuthProvider>
)
