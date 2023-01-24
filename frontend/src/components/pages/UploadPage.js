import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { axiosInstance, url } from "../store/api";
import AuthContext from "../store/auth-context";

const UploadPage = () => {
  const authCtx = useContext(AuthContext);
  const [locations, setLocations] = useState([""]);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  //Fetch all location names and ids to populate the Location dropdown
  const fetchLocations = async () => {
    await axiosInstance.get(`${url}/api/locations`).then((res) => {
      if (res.status == 200) {
        setLocations(res.data);
      } else {
        setErrorMessage(
          "Something went wrong while retrieving data. Try refreshing the page."
        );
      }
    });
  };

  useEffect(() => {
    fetchLocations();
  }, []);

  //checkbox to show/hide the optional Time input
  const [checked, setChecked] = useState(false);

  //Show Time input if box is checked. Otherwise hide.
  const handleCheckbox = () => {
    setChecked(!checked);
  };

  //photoName is only used to visually display the file name in the file input so the user can see.
  const [photoName, setPhotoName] = useState("");

  const [data, setData] = useState({
    photo: "",
    location: "",
    date: "",
    time: "",
  });

  //changes the 'date' and 'time' values in data obj
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  //changes the 'location' value in data obj by filtering the locations list to match the name from the input
  const handleLocationChange = (e) => {
    let locationId = locations.filter(
      (location) => location.name == e.target.value
    );
    setData({ ...data, [e.target.name]: locationId });
  };

  //changes the 'image' in data obj and updates the filename shown for the user
  const handleImageChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.files[0] });
    setPhotoName(e.target.photo);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");
    if (
      data.photo.length === 0 ||
      data.date.length === 0 ||
      data.location.length === 0
    ) {
      setErrorMessage("Please fill out all fields.");
      return;
    }
    let formData = new FormData(); //create formData, append each 'data' item to this
    formData.append("photo", data.photo, data.photo.name); //add the image file and name
    formData.append("author", 1); //hardcoded right now
    formData.append("location", data.location[0].id); //add the id of the location
    formData.append("date", data.date);
    if (checked) {
      formData.append("time", data.time); //only add the time if the checkbox is checked
    }
    axiosInstance
      .post(`${url}/api/upload/`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: "Bearer " + authCtx.access,
        },
      })
      .then((res) => {
        if (res.status == 200) {
          setSuccessMessage("Success! File uploaded successfully.");
          setData({
            photo: "",
            location: "",
            date: "",
            time: "",
          });
          setPhotoName("");
        }
      })
      .catch(() => {
        setErrorMessage("Unable to process request. Please try again later.");
      });
  };

  return (
    <div className="bg-mountain bg-cover bg-center flex h-screen max-w-full h-screen">
      <div className="h-5/6 md:h-4/6 w-full md:w-4/6 lg:w-3/6  m-auto flex">
        <div className="m:w-3/6 lg:w-full m-auto bg-blue2 bg-opacity-30 shadow-xl rounded px-4">
          <h3 className="text-center text-white text-3xl drop-shadow-xl mt-4">
            Upload a photo
          </h3>
          <div className="flex">
            <form
              onSubmit={submitHandler}
              className="lg:w-5/6 xl:w-4/6 2xl:w-4/6 px-8 pt-6 pb-8 mb-4 m-auto"
            >
              <div className="mb-4">
                <label
                  htmlFor="photo"
                  className="text-white text-lg mb-2 drop-shadow-lg"
                >
                  Photo
                </label>
                <input
                  type="file"
                  id="photo"
                  name="photo"
                  value={photoName}
                  onChange={(e) => {
                    handleImageChange(e);
                  }}
                  accept="image/png, image/jpeg"
                  className="appearance-none text-white border border-white rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline mb-2"
                ></input>

                <label className="block my-auto text-white text-lg mb-2 drop-shadow-lg">
                  Location
                </label>
                <select
                  name="location"
                  id="location"
                  className="text-black w-full rounded mb-2"
                  value={data.location.id}
                  onChange={(e) => {
                    handleLocationChange(e);
                  }}
                >
                  <option selected disabled>
                    Choose location
                  </option>
                  {locations.map((location) => (
                    <option key={location.id} id={location.id}>
                      {location.name}
                    </option>
                  ))}
                </select>

                <label
                  className="block text-white text-lg mb-2 drop-shadow-lg"
                  htmlFor="date"
                >
                  Date
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline mb-2"
                  id="date"
                  type="date"
                  name="date"
                  value={data.date}
                  onChange={(e) => {
                    handleChange(e);
                  }}
                />
                <div>
                  <input
                    type="checkbox"
                    id="checkbox"
                    name="checkbox"
                    checked={checked}
                    onChange={handleCheckbox}
                    className="mb-2"
                  />
                  <label
                    htmlFor="checkbox"
                    className="text-white text-lg mb-2 drop-shadow-lg ml-2"
                  >
                    Include time?
                  </label>
                </div>
                {checked && (
                  <div>
                    <label
                      className="block text-white text-lg mb-2 drop-shadow-lg"
                      htmlFor="time"
                    >
                      Time
                    </label>
                    <input
                      className="mb-2 shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                      id="time"
                      type="time"
                      name="time"
                      value={data.time}
                      onChange={(e) => {
                        handleChange(e);
                      }}
                    />
                  </div>
                )}
                <div className="text-center">
                  <button
                    className="bg-orange5 shadow-lg bg-opacity-70 hover:bg-orange1 text-blue8 py-2 px-4 rounded transition ease-in-out delay-75 mt-2"
                    type="submit"
                  >
                    Submit
                  </button>
                  <small className="text-red text-center block mt-2">
                    {errorMessage}
                  </small>
                  <p className="text-orange5 text-center">{successMessage}</p>
                  <Link
                    to="/gallery"
                    className="text-white hover:text-orange2 text-md text-center underline mt-2"
                  >
                    Go to the gallery
                  </Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadPage;
