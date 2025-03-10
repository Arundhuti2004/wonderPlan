import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import CreateTrip from './create-trip/index.jsx'
import ShareTrip from './share-trip/share.jsx'
import Header from './components/custom/Header.jsx'
import ReactDOM from 'react-dom/client'
import React from 'react'
import { Toaster } from "@/components/ui/sonner"
import { GoogleOAuthProvider } from '@react-oauth/google';
import ViewTrip from "./view-trip/index.jsx"
import MyTrips from './my-trips'

const router = createBrowserRouter([
  {
    path: '/',
    element:<App/>
  },
  {
    path: '/createtrip',
    element:<CreateTrip/>
  },
  {
    path : '/view-trip/:tripId',
    element: <ViewTrip/>
  },
  {
    path:'my-trips',
    element:<MyTrips/>
  },
  {
    path:'/sharetrip',
    element:<ShareTrip/>

  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_AUTH_CLIENT_ID}>
    <Header/>
    <Toaster />
    <RouterProvider router={router}/>
    </GoogleOAuthProvider>
  </React.StrictMode>


)
