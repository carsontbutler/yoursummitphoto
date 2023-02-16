import React from "react";
import Stage from "./Stage";

const MyPhotos = (props) => {
  return (
    <div className="h-screen w-full">
      <h1 className="text-center text-white text-xl sm:text-2xl md:text-3xl font-bold md:tracking-widest drop-shadow-xl font-sofia underline underline-offset-4 decoration-orange2 decoration-2">
        My photos
      </h1>
        <div className="h-full w-5/6 bg-orange2"></div>
    </div>
  );
};

export default MyPhotos;