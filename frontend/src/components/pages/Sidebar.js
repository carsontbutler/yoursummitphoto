import React, { useState, useContext, useEffect } from "react";
import AuthContext from "../store/auth-context";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const authCtx = useContext(AuthContext);
  const [showSidebar, setShowSidebar] = useState(false);
  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  return authCtx.isLoggedIn ? (
    <div>
      <div
        class={`h-6 w-8 z-50 flex flex-col justify-center gap-1 fixed top-2 right-40 ${
          showSidebar && "hover:cursor-pointer"
        }`}
      >
        {showSidebar ? (
          <img
            src={require("../../close-btn.png")}
            onClick={toggleSidebar}
            className={`transform duration-500 animate-fadeIn1 ${
              !showSidebar && "translate-x-52"
            }`}
          />
        ) : (
          <div
            className="flex flex-col h-6 w-8 gap-1 hover:cursor-pointer animate-fadeIn1 z-50 fixed top-4 right-12"
            onClick={toggleSidebar}
          >
            <span class="bg-white w-8 h-1"></span>
            <span class="bg-white w-8 h-1"></span>
            <span class="bg-white w-8 h-1"></span>
          </div>
        )}
      </div>
      <div
        className={`w-30 h-40 fixed rounded  border-b-2 border-l-2 border-orange5 border-opacity-50 top-0 right-4 z-50 flex bg-black bg-opacity-80 transform duration-500 ${
          !showSidebar && "translate-x-44"
        }`}
      >
        <div className="flex flex-col gap-4 justify-center">
          <div className="w-full text-white h-4 flex justify-center hover:bg-opacity-50">
            <h6 className="text-sm text-center underline my-auto">
              {authCtx.username.length <= 18
                ? authCtx.username
                : `${authCtx.username.slice(0, 18)}...`}
            </h6>
          </div>
          <Link
            to="/upload"
            className="w-full text-orange5 h-8 font-bold flex justify-end hover:cursor-pointer hover:bg-blue5 hover:bg-opacity-50 px-2"
          >
            <h6 className="text-sm text-right my-auto">Upload photo</h6>
            <img src={require("../../sign-out.png")} className="h-6 my-auto" />
          </Link>

          <div
            onClick={authCtx.logout}
            className="w-full text-orange5 h-8 font-bold flex justify-end hover:cursor-pointer hover:bg-blue5 hover:bg-opacity-50 px-2 z-50"
          >
            <h6 className="text-sm text-right my-auto">Logout</h6>
            <img src={require("../../sign-out.png")} className="h-6 my-auto" />
          </div>
        </div>
      </div>
    </div>
  ) : (
    <></>
  );
};

export default Sidebar;
