import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { url, base, axiosInstance } from "../store/api";
import GalleryModal from "./GalleryModal";
import axios from "axios";
import AuthContext from "../store/auth-context";

const Gallery = () => {
  const authCtx = useContext(AuthContext);
  //Data state
  const [locations, setLocations] = useState([""]);
  const [imageData, setImageData] = useState([""]);
  const [isLoading, setIsLoading] = useState(true);

  //Filter Form
  const [errorMessage, setErrorMessage] = useState("");
  let today = new Date().toISOString().slice(0, 10);

  const [filterSelections, setFilterSelections] = useState({
    fromDate: "2020-01-01",
    toDate: today,
    location: 0,
  });
  const [filteredImageData, setFilteredImageData] = useState({});

  const handleLocationFilterChange = (e) => {
    setFilterSelections({
      ...filterSelections,
      location: Number(e.target.value),
    });
  };

  const handleFromDateChange = (e) => {
    setFilterSelections({
      ...filterSelections,
      fromDate: e.target.value,
    });
  };

  const handleToDateChange = (e) => {
    setFilterSelections({
      ...filterSelections,
      toDate: e.target.value,
    });
  };

  const filterPhotosHandler = () => {
    setErrorMessage(""); //Reset error message
    setFilteredImageData(imageData); //Reset filtered data

    //if specific location is selected
    if (
      filterSelections.location > 0 &&
      filterSelections.fromDate.length > 0 &&
      filterSelections.toDate.length > 0
    ) {
      let newFilterData = imageData.filter(
        (image) =>
          image.location === filterSelections.location &&
          image.date >= filterSelections.fromDate &&
          image.date <= filterSelections.toDate
      );
      setFilteredImageData(newFilterData);
    }
    //if location == 0 ("Any" is selected)
    else if (
      filterSelections.location === 0 &&
      filterSelections.fromDate.length > 0 &&
      filterSelections.toDate.length > 0
    ) {
      let newFilterData = imageData.filter(
        (image) =>
          image.date >= filterSelections.fromDate &&
          image.date <= filterSelections.toDate
      );
      setFilteredImageData(newFilterData);
    }
    //else handle the date fields not being filled out
    else {
      console.log(filterSelections);
      setErrorMessage("Please fill out all fields");
    }
  };

  //Fetch image and location data
  const fetchData = () => {
    Promise.all([
      axios.get(`${url}/images`),
      axios.get(`${url}/locations`),
    ]).then(
      axios.spread((images, locations) => {
        setLocations(locations.data);
        console.log(images.data);
        setImageData(images.data);
        setFilteredImageData(images.data);
        setIsLoading(false);
      })
    );
  };

  useEffect(() => {
    fetchData();
  }, []);

  //Photo modal - state
  const [showModal, setShowModal] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState({});
  //Photo modal - handlers
  const showModalHandler = (e) => {
    setSelectedPhoto(imageData.find((image) => image.id == e.target.id));
    setShowModal(true);
  };

  const closeModalHandler = () => {
    setShowModal(false);
  };

  return (
    <div className="bg-transparent flex flex-col h-100 w-full">
      <div className="h-70 bg-navBar bg-center bg-cover w-full border-b-4 border-orange2 border-opacity-80 text-white grid grid-cols-2 gap-y-4 justify-center py-4 px-2 mb-2">
        <div className="flex w-screen">
          <div className="w-1/6 self-start">
            <Link to="/">
              <img
                src={require("../../logo-white.png")}
                className="sm:w-20 sm:h-20 ml-auto opacity-70 hover:opacity-100"
              ></img>
            </Link>
          </div>
          <h1 className="w-4/6 text-center text-3xl self-end font-bold md:tracking-widest drop-shadow-xl font-sofia underline underline-offset-4 decoration-orange2 decoration-2">
            Find your summit photo
          </h1>
          {authCtx.isLoggedIn ? (
            <Link
              className="underline hover:no-underline w-1/6 text-white"
              to="/upload"
            >
              Upload photo
            </Link>
          ) : (
            <div className="w-1/6 text-white self-center">
              <Link
                className="underline hover:no-underline w-1/6 text-white self-center"
                to="/login"
              >
                Sign in
              </Link>
            </div>
          )}
        </div>
        <div className="flex gap-2 col-span-2 w-full lg:w-3/6 m-auto justify-center">
          <label className="my-auto">Location</label>
          {isLoading ? (
            <select
              id="locations"
              className="text-black w-3/6 rounded hover:shadow-[inset_0_-2px_4px_rgba(210,130,0,1)]"
            >
              <option>Loading...</option>
            </select>
          ) : (
            <select
              id="locations"
              className="text-black w-3/6 rounded hover:shadow-[inset_0_-2px_4px_rgba(210,130,0,1)]"
              onChange={handleLocationFilterChange}
            >
              <option value={0}>Any</option>
              {locations.map((location) => (
                <option id={location.id} value={location.id}>
                  {location.name}
                </option>
              ))}
            </select>
          )}
        </div>
        <div className="flex h-10 my-auto justify-end">
          <label className="my-auto mx-2">From</label>
          <input
            type="date"
            value={filterSelections.fromDate}
            className="text-black rounded hover:shadow-[inset_0_-2px_8px_rgba(210,130,0,1)]"
            onChange={handleFromDateChange}
          ></input>
        </div>
        <div className="flex h-10 my-auto justify-start">
          <label className="my-auto mx-2">To</label>
          <input
            type="date"
            value={filterSelections.toDate}
            className="text-black rounded hover:shadow-[inset_0_-2px_8px_rgba(210,130,0,1)]"
            onChange={handleToDateChange}
          ></input>
        </div>
        <div className="col-span-2 justify-center text-center">
          <button
            onClick={filterPhotosHandler}
            class="bg-orange2 hover:bg-blue2 border-orange2 border-2 text-white font-bold py-2 px-4 rounded drop-shadow-lg transition delay-50 ease-in"
          >
            Search
          </button>
          <small className="block text-red mt-2">{errorMessage}</small>
        </div>
      </div>
      <div className="flex flex-wrap justify-center">
        {isLoading ? (
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
          filteredImageData.map((image) => (
            <div
              className="photo-card flex flex-col items-center w-72 p-2 m-2 border-2 rounded-lg bg-blue2 bg-opacity-30 hover:border-2 hover:border-blue5 hover:border-opacity-75 transition ease-in animate-fadeIn"
              id={image.id}
              key={image.id}
            >
              <img
                className="w-full aspect-square rounded z-50 hover:cursor-pointer z-50"
                src={`http://localhost:8000${image.photo}`}
                id={image.id}
                onClick={showModalHandler}
              />
              <div>
                <h3 className="text-sm text-blue4">
                  <span className="text-blue7">Location: </span>
                  {locations.find((loc) => loc.id == image.location).name}
                </h3>
                <p className="text-blue4 text-sm">
                  <span className="text-blue7">Date: </span>
                  {image.date}
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
        {filteredImageData.length === 0 && (
          <div className="text-white text-center text-2xl mt-8">
            No photos found.
          </div>
        )}
      </div>
      <GalleryModal
        showModal={showModal}
        showModalHandler={showModalHandler}
        closeModalHandler={closeModalHandler}
        selectedPhoto={selectedPhoto}
        locations={locations}
      />
    </div>
  );
};

export default Gallery;
