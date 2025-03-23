import Layout from "../pages/Layout";
import Login from "../pages/Login";

import Article from "../pages/Article"
import Home from "../pages/Home"
import Publish from "../pages/Publish"

import { createBrowserRouter } from "react-router-dom";

import AuthRoute from "../components/AuthRoute";

const router=createBrowserRouter([
  {
    path:'/',
    element:<AuthRoute><Layout></Layout></AuthRoute>,
    children:[
      {
        index:true,
        // path:'home',
        element:<Home></Home>
      },
      {
        path:'article',
        element:<Article></Article>
      },
      {
        path:'publish',
        element:<Publish></Publish>
      },
    ]
  },
  {
    path:'/login',
    element:<Login></Login>
  }
])

export default router