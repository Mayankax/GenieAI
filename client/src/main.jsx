import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider,createBrowserRouter } from 'react-router-dom'
import Homepage from './routes/homepage/Homepage'
import DashboardPage from './routes/dashboardPage/DashboardPage'
import ChatPage from './routes/chatPage/ChatPage'
import RootLayout from './layouts/rootLayout/RootLayout';
import DashboardLayout from './layouts/dashboardLayout/DashboardLayout';
import SignInpage from './routes/signInPage/SignInPage'
import SignUppage from './routes/signUpPage/SignUpPage'

const router = createBrowserRouter([
  {
    element:<RootLayout/>,
    children: [
      {
        path: "/",
        element: <Homepage/>,
      },
      {
        path: "/sign-in/*",
        element: <SignInpage/>,
      },
      {
        path: "/sign-up/*",
        element: <SignUppage/>,
      },
      {
        element:<DashboardLayout/>,
        children: [
          {
            path: "/dashboard",
            element: <DashboardPage/>
          },
          {
            path: "/dashboard/chats/:id",
            element: <ChatPage/>
          }
        ]
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
