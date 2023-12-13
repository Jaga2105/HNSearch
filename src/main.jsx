import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import PostDetails from './components/PostDetails.jsx'
const router = createBrowserRouter([
  {
    path:"/",
    element:<App/>
  },
  {
    path:"/post/:id",
    element:<PostDetails/>
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
    <RouterProvider router={router}/>
)
