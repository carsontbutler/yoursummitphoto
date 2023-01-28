import logo from "./logo.svg";
import react, { useState, useContext } from "react";
import "./App.css";
import Homepage from "./components/pages/Homepage";
import Gallery from "./components/pages/Gallery";
import UploadPage from "./components/pages/UploadPage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "./components/pages/AuthPage/LoginPage";
import RegisterPage from "./components/pages/AuthPage/RegisterPage";
import { axiosDataInstance, url } from "./components/store/api";
import AuthContext from "./components/store/auth-context";
import axios from "axios";
import jwt_decode from "jwt-decode";
import dayjs from "dayjs";

function App() {
  const authCtx = useContext(AuthContext);

  axiosDataInstance.interceptors.request.use(
    async (req) => {
      const user = jwt_decode(localStorage.getItem("access"));
      const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;
      if (!isExpired) return req;
      
      const response = await axios.post(`${url}/api/token/refresh`, {
        refresh: localStorage.getItem("refresh"),
      });
      authCtx.refreshTokens(response.data.access, response.data.refresh);
      req.headers.Authorization = `Bearer  ${response.data.access}`;
      return req;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Homepage />,
    },
    {
      path: "*",
      element: <Homepage />,
    },
    {
      path: "/gallery",
      element: <Gallery />,
    },
    {
      path: "/login",
      element: authCtx.isLoggedIn ? <Gallery /> : <LoginPage />,
    },
    {
      path: "/register",
      element: <RegisterPage />,
    },
    {
      path: "/upload",
      element: authCtx.isLoggedIn ? <UploadPage /> : <LoginPage />,
    },
  ]);

  return (
    <div className="App h-screen w-screen overflow-x-hidden bg-galleryBg">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
