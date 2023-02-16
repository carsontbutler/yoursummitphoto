import React, { useState, useContext} from "react";
import { Link } from "react-router-dom";
import { axiosInstance, url } from "../../store/api";
import AuthContext from "../../store/auth-context";
const LoginPage = () => {
  const authCtx = useContext(AuthContext);
  const [errorMessage, setErrorMessage] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const loginHandler = (e) => {
    e.preventDefault();
    setErrorMessage("");
    axiosInstance
      .post(`${url}/api/token/`, {
        username: username,
        password: password,
      })
      .then((res) => {
        if (res.status === 200) {
          authCtx.login(
            res.data.id,
            res.data.username,
            res.data.access.toString(),
            res.data.refresh
          );
        }
      })
      .catch(() => {
        setErrorMessage("Invalid credentials. Please try again.");
      });
  };
  return (
    <div id="loginpage-container" className="bg-mountain bg-cover bg-center flex h-screen max-w-full h-screen px-4">
      <div className="h-5/6 md:h-4/6 w-full md:w-4/6 lg:w-3/6 bg-blue2 bg-opacity-30 m-auto py-6 flex shadow-xl rounded animate-fadeIn">
        <div className="m:w-3/6 lg:w-full m-auto">
          <h3 className="text-center text-white text-3xl drop-shadow-xl">
            Sign In
          </h3>
          <div className="flex flex-col">
            <form
              onSubmit={loginHandler}
              className="lg:w-5/6 xl:w-4/6 2xl:w-4/6 px-8 pt-6 pb-8 mb-4 m-auto"
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
                  name="username"
                  type="text"
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                  }}
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-white text-lg mb-2 drop-shadow-lg"
                  htmlFor="password"
                >
                  Password
                </label>
                <input
                  className="shadow appearance-none border border-blue2 rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                  id="password"
                  type="password"
                  name="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
              </div>
              <div className="text-center">
                <button
                  className="bg-orange5 shadow-lg bg-opacity-70 hover:bg-orange1 text-blue8 py-2 px-4 rounded transition ease-in-out delay-75"
                  type="submit"
                >
                  Sign In
                </button>
                <p className="text-white underline hover:text-orange2 text-md mt-4">
                  <Link to="/register">Need an account? Register here.</Link>
                </p>
                <p className="text-red mt-4">{errorMessage}</p>
              </div>
              <div className="text-center mt-2 text">
                <Link
                  to="/gallery"
                  className="text-white hover:text-orange2 text-md text-center underline"
                >
                  Go to the gallery
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
