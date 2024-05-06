import { Button, Container, Form, InputGroup, Nav, Navbar } from 'react-bootstrap'
import './App.css'
import { NavLink, createBrowserRouter, useNavigate, useRouteError, RouterProvider, Outlet } from 'react-router-dom'
import { useEffect, useState } from 'react'
import LogoImg from '@/assets/gk-logo.png'
import {  useGoogleLogin, TokenResponse } from '@react-oauth/google'
import { YoutubeChannel } from './types/YoutubeChannel'
import { AddYoutubeChannelProvider } from './services/YoutubeServiceProvider'
import { useUpdateYoutubeChannelMutation } from './services/youtubeState'
import { Rewards } from './pages/Rewards'
import { RewardRedemption } from './pages/RewardRedemption'

import * as Ably from 'ably';
import { AblyProvider, ChannelProvider } from 'ably/react';import {
  GetSecretValueCommand,
  SecretsManagerClient,
} from "@aws-sdk/client-secrets-manager";

export function RootErrorBoundary() {
  const error = useRouteError() as Error
  return (
    <>
      <NavigationHeader />
      <h1>An error has occurred.</h1>
      <p>{error.message || JSON.stringify(error)}</p>
    </>
  )
}

export const PagenotFound = () => (
  <div className="errorPage">
    <h1 role="errorHeader">Page Not Found</h1>
    <p>The page you're looking for wasn't found.</p>
  </div>
)

  const NavigationHeader = () => {
    const [accessToken, setAccessToken] = useState<string | undefined>()
    const [youtubeChannel, setChannge] = useState<YoutubeChannel | undefined>()
    const { mutate } = useUpdateYoutubeChannelMutation()

    const onGoogleLoginSuccess = (tokenResponse: TokenResponse) => {
      if (!tokenResponse.access_token) return;    
      localStorage.setItem("accessToken", tokenResponse.access_token)
      setAccessToken(tokenResponse.access_token)
      mutate(
        {accessToken: tokenResponse.access_token, forHandle: 'GoodKhaos', mine: false},
        { onSuccess: (data) => {
          setChannge(data)
        }
      }
      )
    }

    const login = useGoogleLogin({
      onSuccess: onGoogleLoginSuccess ,
      flow: 'implicit',
      scope: 'https://www.googleapis.com/auth/youtube.readonly'
    });

  return (
    <>
    <AddYoutubeChannelProvider forHandle="GoodKhaos" accessToken={accessToken ? accessToken : ''} mine={false}>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <NavLink to='/'>
                <img src={LogoImg} height={50} width={50} alt="GK Logo"/>
              </NavLink>
            </Nav>
          </Navbar.Collapse>
          <Navbar.Collapse className="justify-content-end">
            {!youtubeChannel && <Button onClick={() => login()}>Login To Google</Button> }
            <h4>{youtubeChannel && 'Welcome ' + youtubeChannel.snippet.title + '!'}</h4> 
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </AddYoutubeChannelProvider>
    <Outlet />
    </>
  )
}
export const Home = () => {
   const [forHandle, setForHandle] = useState('GoodKhaos')
   const navigate = useNavigate()
  
  const handleSubmit = () => {
    navigate('/rewards/' + forHandle)
  }


  return (
    <div role="homepage">
      <Container >
        <h1>GoodKhaos</h1>
        <InputGroup className="formControlFindChannel">                
            <Form.Control
                role="formControlFindChannel"
                aria-label="Example text with button addon"
                aria-describedby="basic-addon1"
                placeholder='Channel Handle'
                onChange={(e) => setForHandle(e.target.value)}
            />
            <Button role="findChannelButton" data-bs-theme="dark" onClick={handleSubmit}>Find</Button>
        </InputGroup>

      </Container>
    </div>
  )
}

const router = createBrowserRouter([
  {
      path: '/',
      element: <NavigationHeader />,
      errorElement: <RootErrorBoundary />,      
      children: [
        {index: true, element: <Home />},
        {path: 'rewards/:forHandle', element: <Rewards />},
        {path: 'rewardHandler/:forHandle', element: <RewardRedemption />}
      ],
  },
])


  
export function App() {
  const [ablyKey, setAblyKey] = useState<string>()
  const getSecretValue = async (secretName = "ABLY_KEY") => {
    const client = new SecretsManagerClient();
    const response = await client.send(
      new GetSecretValueCommand({
        SecretId: secretName,
      }),
    );
    console.log(response);
  
    if (response.SecretString) {
      setAblyKey(response.SecretString);

    }
  
    if (response.SecretBinary) {
      return response.SecretBinary;
    }
  };
  
  useEffect(() => {
    getSecretValue()
  }, [])
  
  const ablyClient = new Ably.Realtime({ key: ablyKey });
  return (
    <div className="App">
      <AblyProvider client={ablyClient}> 
          <ChannelProvider channelName="rewards">
        <RouterProvider router={router} /></ChannelProvider>
      </AblyProvider>
    </div>
  )
}

