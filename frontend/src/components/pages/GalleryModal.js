import React from "react";
import { url } from "../store/api";

const GalleryModal = (props) => {
  console.log(props);
  return (
    <div
      id="defaultModal"
      tabindex="-1"
      aria-hidden="true"
      className={`bg-black p-4 fixed top-0 left-0 right-0 z-50 w-full overflow-x-hidden h-screen text-white flex flex-col ${
        !props.showModal && "hidden"
      }`}
    >
      <svg
        aria-hidden="true"
        className="w-5 h-5 z-100 ml-auto hover:cursor-pointer text-white hover:text-orange5 absolute top-2 right-2 lg:top-2 lg:right-12"
        fill="currentColor"
        viewBox="0 0 18 18"
        xmlns="http://www.w3.org/2000/svg"
        onClick={props.closeModalHandler}
      >
        <path
          fill-rule="evenodd"
          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
          clip-rule="evenodd"
        ></path>
      </svg>
      <img
        className="h-5/6 aspect-auto object-contain animate-growGalleryModal"
        src={`${url}/${props.selectedPhoto.photo}`}
      ></img>
      <h3 className="text-blue4 text-md md:text-lg text-center font-bold">
        <span className="text-blue7">Location: </span>
        {props.locations.find(
          (loc) => loc.id == props.selectedPhoto.location
        ) &&
          props.locations.find((loc) => loc.id == props.selectedPhoto.location)
            .name}
      </h3>
      <p className="text-blue4 text-md md:text-lg text-center font-bold">
        <span className="text-blue7">Date: </span>
        {props.selectedPhoto.date}
      </p>
      {props.selectedPhoto.time && (
        <p className="text-blue4 text-md md:text-lg text-center font-bold">
          <span className="text-blue7">Time: </span>
          {props.selectedPhoto.time}
        </p>
      )}
      <p className="text-blue4 text-md md:text-lg text-center font-bold">
        <span className="text-blue7">Author: </span>
        {props.selectedPhoto.author_name}
      </p>
      <p className="text-orange5 text-md md:text-lg text-center font-bold">
        <a
          href={`${url}/${props.selectedPhoto.photo}`}
          download
          className="hover:text-orange2 hover:opacity-70"
        >
          Download
        </a>
      </p>
    </div>
  );
};

export default GalleryModal;
