import React, { useState, useEffect, useContext } from "react";
import { url } from "../store/api";
import GalleryModal from "./GalleryModal";
import axios from "axios";
import Stage from "./Stage";
import FilterForm from "./FilterForm";
import Sidebar from "./Sidebar";

const Gallery = () => {

  //Data state
  const [locations, setLocations] = useState([""]);
  const [imageData, setImageData] = useState([""]);
  const [isLoading, setIsLoading] = useState(true);

  const [filteredImageData, setFilteredImageData] = useState({});

  //Fetch image and location data
  const fetchData = () => {
    Promise.all([
      axios.get(`${url}/api/images`),
      axios.get(`${url}/api/locations`),
    ]).then(
      axios.spread((images, locations) => {
        setLocations(locations.data);
        setImageData(images.data);
        let filterData = images.data.sort((a, b) => (a.date < b.date ? 1 : -1));
        setFilteredImageData(filterData);
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

  const [sortBySelection, setSortBySelection] = useState("newest");

  const customSort = (arr) => {
    if (!arr.length > 0) {
      return arr;
    } else {
      switch (sortBySelection) {
        case "newest":
          return arr.sort((a, b) => (a.date < b.date ? 1 : -1));
        case "oldest":
          return arr.sort((a, b) => (a.date > b.date ? 1 : -1));
        case "author":
          return arr.sort((a, b) => (a.author > b.author ? 1 : -1));
        default:
          return arr;
      }
    }
  };

  const changeSortType = (e) => {
    setSortBySelection(e.target.value);
  };

  return (
    <div id="gallery" className="bg-black flex flex-col w-full">
      <Sidebar />
      <FilterForm
        locations={locations}
        isLoading={isLoading}
        setFilteredImageData={setFilteredImageData}
        imageData={imageData}
      />
      <div className="flex col-span-2 justify-end w-full">
        <p className="text-white mr-2">Sort by</p>
        <select
          onChange={changeSortType}
          value={sortBySelection}
          className="mr-2 md:mr-8 lg:mr-12 rounded hover:shadow-[inset_0_-2px_8px_rgba(210,130,0,1)]"
        >
          <option value="newest">Date (newest)</option>
          <option value="oldest">Date (oldest)</option>
          <option value="author">Author</option>
        </select>
      </div>
      <Stage
        isLoading={isLoading}
        filteredImageData={filteredImageData}
        showModalHandler={showModalHandler}
        locations={locations}
        customSort={customSort}
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
