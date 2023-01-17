import React, { useState } from "react";
import RegisterForm from "./RegisterForm";
import LoginForm from "./LoginForm";

const AuthPage = () => {
  const [isLoggingIn, setIsLogginIn] = useState(true);

  return (
    <div className="bg-mountain bg-cover bg-center flex h-screen max-w-full h-full px-4">
      <div className="h-5/6 md:h-4/6 w-full md:w-4/6 lg:w-3/6 bg-black bg-opacity-70 m-auto py-6 flex">
        <div className="m:w-3/6 lg:w-full m-auto">
          {isLoggingIn ? (
            <h3 className="text-center text-blue8 text-3xl">Sign In</h3>
          ) : (
            <h3 className="text-center text-blue8 text-3xl">
              Create an account
            </h3>
          )}
          <div className="flex">
            {isLoggingIn ? <LoginForm /> : <RegisterForm />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
