import React from 'react'
import Home from './components/Home'
import './index.css'
import { Provider } from 'react-redux'
import store from './store/store'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import PostDetails from './components/PostDetails'
const router = createBrowserRouter([
  {
    path:"/",
    element:<Home/>
  },
  {
    path:"/post/:id",
    element:<PostDetails/>
  }
])

const App = () => {
  return (
    <Provider store={store}>
       <RouterProvider router={router}/>
    </Provider>
  )
}

export default App