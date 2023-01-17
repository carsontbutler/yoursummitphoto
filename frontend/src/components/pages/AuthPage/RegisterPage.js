import React, { useState } from "react";
import { Link } from "react-router-dom";

const RegisterPage = () => {
  const [errorMessage, setErrorMessage] = useState("");
  return (
    <div className="bg-mountain bg-cover bg-center flex h-screen max-w-full h-screen px-4">
      <div className="h-full sm:h-5/6 w-full md:w-4/6 lg:w-3/6 bg-blue2 bg-opacity-30 m-auto py-6 flex shadow-xl rounded">
        <div className="m:w-3/6 lg:w-full m-auto">
          <h3 className="text-center text-white text-3xl drop-shadow-xl">
            Create an account
          </h3>
          <div className="flex">
            <form className="lg:w-5/6 xl:w-4/6 2xl:w-4/6 rounded px-8 pt-6 pb-8 mb-4 m-auto">
              <div className="mb-4">
                <label
                  className="block text-white text-lg mb-2 drop-shadow-lg"
                  for="username"
                >
                  Username
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="username"
                  type="text"
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-white text-lg mb-2 drop-shadow-lg"
                  for="password"
                >
                  Password
                </label>
                <input
                  className="shadow appearance-none border border-blue2 rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
                  id="password"
                  type="password"
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-white text-lg mb-2 drop-shadow-lg"
                  for="password2"
                >
                  Re-enter password
                </label>
                <input
                  className="shadow appearance-none border border-blue2 rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
                  id="password2"
                  type="password"
                />
              </div>
              <div className="text-center">
                <button
                  className="bg-orange5 shadow-lg bg-opacity-70 hover:bg-orange1 text-white py-2 px-4 rounded transition ease-in-out delay-75"
                  type="button"
                >
                  Register
                </button>
                <p className="text-white hover:text-orange2 text-md mt-4">
                  <Link to="/login">Already have an account? Sign in.</Link>
                </p>
                <p className="text-red mt-4">{errorMessage}</p>
                <Link
                  to="/gallery"
                  className="text-white hover:text-orange2 text-md text-center underline"
                >
                  Go to gallery
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
