import { Button, Container, Form, InputGroup, Nav, Navbar } from 'react-bootstrap'
import './App.css'
import { NavLink, createBrowserRouter, useNavigate, useRouteError, RouterProvider, Outlet } from 'react-router-dom'
import { useState } from 'react'
import LogoImg from '@/assets/gk-logo.png'
import {  useGoogleLogin, TokenResponse } from '@react-oauth/google'
import { YoutubeChannel } from './types/YoutubeChannel'
import { AddYoutubeChannelProvider } from './services/YoutubeServiceProvider'
import { useUpdateYoutubeChannelMutation } from './services/youtubeState'
import { Rewards } from './pages/Rewards'
import { RewardRedemption } from './pages/RewardRedemption'

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
  
  const handleRewardsSubmit = () => {
    navigate('/rewards/' + forHandle)
  }
  const handleRedemptionSubmit = () => {
    navigate('/rewardHandler/' + forHandle)
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
            <Button role="findChannelRewardsButton" data-bs-theme="dark" onClick={handleRewardsSubmit}>Rewards</Button>
            <Button role="findChannelRedemptionsButton" data-bs-theme="dark" onClick={handleRedemptionSubmit}>Redemptions</Button>
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
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  )
}

