import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './App'

import './index.css'

import 'bootstrap/dist/css/bootstrap.min.css';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import * as Ably from 'ably';
import { AblyProvider, ChannelProvider } from 'ably/react';import {
  GetSecretValueCommand,
  SecretsManagerClient,
} from "@aws-sdk/client-secrets-manager";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    }
  }
})

  const getSecretValue = async (secretName = "ABLY_KEY") => {
    const client = new SecretsManagerClient();
    const response = await client.send(
      new GetSecretValueCommand({
        SecretId: secretName,
      }),
    );
    console.log(response);
  
    if (response.SecretString) {
      return response.SecretString;
    }
  
    if (response.SecretBinary) {
      return response.SecretBinary;
    }
  };
  

const googleOAuthClientId = '1015986740737-bnii3vuh7eond8v9uj5fg3le18gs9i6r.apps.googleusercontent.com'

const ablyClient = new Ably.Realtime({ key: getSecretValue().toString() });

ReactDOM.createRoot(document.getElementById('root')!).render(
  <GoogleOAuthProvider clientId={googleOAuthClientId}>
    <AblyProvider client={ablyClient}> 
      <React.StrictMode>
        <QueryClientProvider client={queryClient}>
          <ChannelProvider channelName="rewards">
            <App />
          </ChannelProvider>
        </QueryClientProvider>
      </React.StrictMode>
    </AblyProvider>
  </GoogleOAuthProvider>
)
