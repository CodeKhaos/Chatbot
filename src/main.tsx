import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './App'
import './index.css'

import 'bootstrap/dist/css/bootstrap.min.css';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import {  ChannelProvider } from 'ably/react';
import { AblyClientProvider } from './sharedKernel/AblyClientProvider';
//require('dotenv').config()

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    }
  }
})

const googleOAuthClientId = '1015986740737-bnii3vuh7eond8v9uj5fg3le18gs9i6r.apps.googleusercontent.com'

//const ablyClient = new Ably.Realtime({ authUrl: '/ably/auth' });

ReactDOM.createRoot(document.getElementById('root')!).render(
  <GoogleOAuthProvider clientId={googleOAuthClientId}>
    <AblyClientProvider>
      <React.StrictMode>
        <QueryClientProvider client={queryClient}>
          <ChannelProvider channelName="rewards">
            <App />
          </ChannelProvider>
        </QueryClientProvider>
      </React.StrictMode>
    </AblyClientProvider>
  </GoogleOAuthProvider>
)
