import logo from "./logo.svg";
import react, { useState, useContext } from "react";
import "./App.css";
import Homepage from "./components/pages/Homepage";
import Gallery from "./components/pages/Gallery";
import UploadPage from "./components/pages/UploadPage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "./components/pages/AuthPage/LoginPage";
import RegisterPage from "./components/pages/AuthPage/RegisterPage";
import { axiosInstance, url } from "./components/store/api";
import AuthContext from "./components/store/auth-context";

function App() {
  const authCtx = useContext(AuthContext);

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
