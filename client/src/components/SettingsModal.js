// Import necessary modules and components from React and react-cookie
import React, { useState } from "react";
import { useCookies } from "react-cookie";

// Functional component SettingsModal for updating user profile settings
const SettingsModal = ({ setShowModal }) => {
  const [cookies, setCookie, removeCookies] = useCookies(["user"]);

  // State variables for form inputs and activities
  const [formData, setFormData] = useState({
    userId: cookies.UserId,
    showGender: false,
    genderInterest: "",
    url: "",
    about: "",
    activities: [],
  });

  // Event handler to close the modal
  const handleClick = () => {
    setShowModal(false);
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send a PUT request to update user profile data
      const response = await fetch("/index/updateUser", {
        method: "PUT",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ formData }),
      });
      const data = await response.json();

      // handle unsuccessful/successful update
      if (!response.ok) {
        return console.error("response error", response);
      }
      if (response.status === 200) {
        setShowModal(false);
        window.location.reload(); // Reload the page after successful update
      }
    } catch (error) {
      return console.log(error);
    }
  };

  // Function to handle form input changes
  const handleChange = (e) => {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    const name = e.target.name;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Function to handle changes in checkbox activities
  const handleOnChange = (e) => {
    const checked = e.target.checked;
    const value = e.target.value;
    console.log("activity", value);

    // Update activities array based on checkbox changes
    if (checked) {
      setFormData((prevState) => ({
        ...prevState,
        activities: [...prevState.activities, value],
      }));
    }
    if (!checked) {
      const updatedActivities = formData.activities.filter(
        (activity) => activity !== value
      );

      setFormData((prevData) => ({
        ...prevData,
        activities: updatedActivities,
      }));
    }
  };
  console.log("form", formData);

  // Render the SettingsModal component
  return (
    <div className="settingsModal">
      <div className="closeIcon" onClick={handleClick}>
        ✖
      </div>

      <h2>Update Profile</h2>
      <form onSubmit={handleSubmit}>
        <section>
          <label className="title" htmlFor="showGender">
            Show gender on my profile
          </label>
          <input
            id="showGender"
            type="checkbox"
            name="showGender"
            onChange={handleChange}
            checked={formData.showGender}
          ></input>
          <label className="title">Show Me</label>
          <div className="multipleInputContainer">
            <input
              id="manGenderInterest"
              type="radio"
              name="genderInterest"
              value={"man"}
              onChange={handleChange}
              checked={formData.genderInterest === "man"}
            ></input>
            <label htmlFor="manGenderInterest">Man</label>
            <input
              id="womanGenderInterest"
              type="radio"
              name="genderInterest"
              value={"woman"}
              onChange={handleChange}
              checked={formData.genderInterest === "woman"}
            ></input>
            <label htmlFor="womanGenderInterest">Woman</label>
            <input
              id="elseGenderInterest"
              type="radio"
              name="genderInterest"
              value={"else"}
              onChange={handleChange}
              checked={formData.genderInterest === "else"}
            ></input>
            <label htmlFor="elseGenderInterest">Else</label>
            <input
              id="everyoneGenderInterest"
              type="radio"
              name="genderInterest"
              value={"everyone"}
              onChange={handleChange}
              checked={formData.genderInterest === "everyone"}
            ></input>
            <label htmlFor="everyoneGenderInterest">Everyone</label>
          </div>
          <label className="title">Choose activities you like</label>
          <div className="multipleInputContainer">
            <input
              type="checkbox"
              id="activityCheckboxSports"
              name="Sports"
              value="Sports"
              onChange={handleOnChange}
            />
            <label htmlFor={"activityCheckboxSports"}>Sports</label>

            <input
              type="checkbox"
              id="activityCheckboxMusic"
              name="Music"
              value="Music"
              onChange={handleOnChange}
            />
            <label htmlFor={"activityCheckboxMusic"}>Music</label>
            <input
              type="checkbox"
              id="activityCheckboxAdventure"
              name="Adventure"
              value="Adventure"
              onChange={handleOnChange}
            />
            <label htmlFor={"activityCheckboxAdventure"}>Adventure</label>
          </div>

          <label className="title">About Me</label>
          <div className="multipleInputContainer">
            <input
              id="about"
              type="text"
              name="about"
              required={true}
              placeholder="I like long walks..."
              value={formData.about}
              onChange={handleChange}
            ></input>
          </div>
        </section>

        <section>
          <label className="title">Profile Picture</label>
          <input
            placeholder="Image url"
            type="url"
            name="url"
            id="url"
            onChange={handleChange}
            required={true}
          ></input>

          <div className="photoContainer">
            {formData.url && (
              <img
                src={formData.url}
                className="profileImg"
                alt="Profile pic preview"
              ></img>
            )}
          </div>
        </section>

        <input className="secondaryBtn" type="submit" />
      </form>
    </div>
  );
};

export default SettingsModal;
