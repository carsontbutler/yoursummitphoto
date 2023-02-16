import react from "react";
import { url } from "../store/api";
const Stage = (props) => {
  return (
    <div id="stage" className="flex flex-wrap justify-center">
      {props.isLoading ? (
        <div aria-label="Loading..." role="status" className="mt-8">
          <svg className="h-12 w-12 animate-spin" viewBox="3 3 18 18">
            <path
              className="fill-blue5"
              d="M3 5C8.13401 5 5 8.13401 5 12C5 15.866 8.13401 19 12 19C15.866 19 19 15.866 19 12C19 8.13401 15.866 5 12 5ZM3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12Z"
            ></path>
            <path
              className="fill-blue0"
              d="M16.9497 7.05015C14.2161 4.31648 9.78392 4.31648 7.05025 7.05015C6.65973 7.44067 6.02656 7.44067 5.63604 7.05015C5.24551 6.65962 5.24551 6.02646 5.63604 5.63593C9.15076 2.12121 14.8492 2.12121 18.364 5.63593C18.7545 6.02646 18.7545 6.65962 18.364 7.05015C17.9734 7.44067 17.3403 7.44067 16.9497 7.05015Z"
            ></path>
          </svg>
        </div>
      ) : (
        props.customSort(props.filteredImageData).map((image) => (
          <div
            className="photo-card flex flex-col items-center w-72 p-2 m-2 border-2 rounded-lg bg-blue2 bg-opacity-30 hover:border-2 hover:border-blue5 hover:border-opacity-75 transition ease-in animate-fadeIn1"
            id={image.id}
            key={image.id}
          >
            <img
              className="w-full aspect-square rounded z-50 hover:cursor-pointer z-20"
              src={`${url}${image.photo}`}
              id={image.id}
              onClick={props.showModalHandler}
            />
            <div>
              <h3 className="text-sm text-blue4">
                <span className="text-blue7">Location: </span>
                {props.locations.find((loc) => loc.id == image.location).name}
              </h3>
              <p className="text-blue4 text-sm">
                <span className="text-blue7">Date: </span>
                {`${image.date.split("-")[1]}/${image.date.split("-")[2]}/${
                  image.date.split("-")[0]
                }`}
              </p>
              {image.time && (
                <p className="text-blue4 text-sm">
                  <span className="text-blue7">Time: </span>
                  {image.time}
                </p>
              )}

              <p className="text-blue4 text-sm">
                <span className="text-blue7">Author: </span>
                {image.author_name}
              </p>
            </div>
          </div>
        ))
      )}
      {props.filteredImageData.length === 0 && (
        <div className="text-white text-center text-2xl mt-8">
          No photos found.
        </div>
      )}
    </div>
  );
};

export default Stage;
