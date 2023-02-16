import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { axiosInstance, url } from "../../store/api";

const RegisterPage = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const navigate = useNavigate();

  const registerHandler = (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");
    if (password !== password2) {
      setErrorMessage("Passwords do not match.");
      return;
    }
    else if (username.length > 150){
      setErrorMessage("Username cannot be longer than 150 characters");
      return;
    };
    axiosInstance
      .post(`${url}/api/register/`, {
        username: username,
        password: password,
        password2: password2,
      })
      .then((res) => {
        console.log(res.data);
        if (res.status === 201) {
          setSuccessMessage("Success! Redirecting to login...");
          setTimeout(() => {
            navigate("/login");
          }, 2000);
        }
      })
      .catch((error) => {
        console.log(error.response.data);
        if (
          error.response.data.username
        ) {
          setErrorMessage("Username is already taken. Please try another.");
        } else {
          setErrorMessage("Something went wrong. Please try again later.");
        }
      });
  };

  return (
    <div id="registerpage-container" className="bg-mountain bg-cover bg-center flex h-screen max-w-full h-screen px-4">
      <div className="h-full sm:h-5/6 w-full md:w-4/6 lg:w-3/6 bg-blue2 bg-opacity-30 m-auto py-6 flex shadow-xl rounded animate-fadeIn">
        <div className="m:w-3/6 lg:w-full m-auto">
          <h3 className="text-center text-white text-3xl drop-shadow-xl">
            Create an account
          </h3>
          <div className="flex">
            <form
              onSubmit={registerHandler}
              className="lg:w-5/6 xl:w-4/6 2xl:w-4/6 rounded px-8 pt-6 pb-8 mb-4 m-auto"
            >
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
                  name="username"
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                  }}
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
                  name="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
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
                  name="password2"
                  value={password2}
                  onChange={(e) => {
                    setPassword2(e.target.value);
                  }}
                />
              </div>
              <div className="text-center">
                <button
                  className="bg-orange5 shadow-lg bg-opacity-70 hover:bg-orange1 text-white py-2 px-4 rounded transition ease-in-out delay-75"
                  type="submit"
                >
                  Register
                </button>
                <p className="text-orange5 mt-4 w-5/6 text-center m-auto">{successMessage}</p>
                <p className="text-red mt-4 w-5/6 text-center m-auto">{errorMessage}</p>
                <p className="text-white hover:text-orange2 text-md mt-4">
                  <Link to="/login">Already have an account? Sign in.</Link>
                </p>

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
