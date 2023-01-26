import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../store/auth-context";

const Homepage = () => {
  const authCtx = useContext(AuthContext);
  const username = localStorage.getItem("username");

  return (
    <div className="flex h-screen">
        <img
          src={"./static/media/mtn-blue.04053161936aab857c82.jpg"}
          className="fixed top-0 right-0 animate-growImage opacity-70 object-cover h-screen w-screen"
        ></img>
      <div className="m-auto w-screen h-2/4 text-center drop-shadow-lg bg-blue2 bg-opacity-30 py-16 animate-fadeIn">
        <div className="text-center flex mb-10 justify-center">
          <img
            src={require("../../logo-white.png")}
            className="hidden sm:block sm:w-20 sm:h-20"
          ></img>
          <h1 className="text-3xl md:text-5xl text-white font-bold tracking-wider drop-shadow-xl self-center font-sofia">
            Your Summit Photo
          </h1>
        </div>
        <div className="w-44 text-center m-auto hover:scale-110 transition ease-in-out duration-500">
          <Link
            to="/gallery"
            className="button bg-orange2 hover:bg-orange5 shadow-lg bg-opacity-90 text-white text-xl font-bold py-2 px-4 rounded my-10 delay-75 w-10 animate-fadeIn5"
          >
            View Gallery
          </Link>
        </div>
        {authCtx.isLoggedIn ? (
          <div className="mt-10 animate-fadeIn5">
            <h3 className="text-l text-white drop-shadow-md">
              Logged in as <span className="text-orange5">{username}</span>
            </h3>
            <button
              onClick={authCtx.logout}
              className="text-white hover:text-orange5"
            >
              <small>Logout</small>
            </button>
          </div>
        ) : (
          <h3 className="text-l text-blue8 drop-shadow-md mt-10 animate-fadeIn7">
            <Link
              to="/login"
              className="underline hover:no-underline hover:text-orange2"
            >
              Log in
            </Link>{" "}
            or{" "}
            <Link
              to="/register"
              className="underline hover:no-underline hover:text-orange2"
            >
              Register
            </Link>{" "}
            to upload photos
          </h3>
        )}
      </div>
    </div>
  );
};

export default Homepage;
