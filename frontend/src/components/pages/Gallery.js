import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { url, base, axiosInstance } from "../store/api";
import GalleryModal from "./GalleryModal";
import axios from "axios";
import AuthContext from "../store/auth-context";
import Stage from "./Stage";

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
      <Stage
        isLoading={isLoading}
        filteredImageData={filteredImageData}
        showModalHandler={showModalHandler}
        locations={locations}
      />
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
