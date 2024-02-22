// Import necessary modules and components from React and react-cookie
import React, { useState } from "react";
import { useCookies } from "react-cookie";

// Functional component SettingsModal for updating user profile settings
const SettingsModal = ({ setShowModal }) => {
  // Hook to manage cookies
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

      // Log data and handle successful update
      console.log("data", data);
      if (!response.ok) {
        return console.error("response error", response);
      }
      if (response.status === 200) {
        console.log("data updated");

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
      {/* Close icon */}
      <div className="closeIcon" onClick={handleClick}>
        ✖
      </div>

      {/* Form for updating user profile */}
      <h2>Update Profile</h2>
      <form onSubmit={handleSubmit}>
        <section>
          {/* Checkbox for showing gender on the profile */}
          <label htmlFor="showGender">Show gender on my profile</label>
          <input
            id="showGender"
            type="checkbox"
            name="showGender"
            onChange={handleChange}
            checked={formData.showGender}
          ></input>

          {/* Radio buttons for gender interest */}
          <label>Show Me</label>
          <div className="multipleInputContainer">
            {/* ... (Radio buttons for different gender interests) */}
          </div>

          {/* Checkbox activities */}
          <label htmlFor="activities">Choose activities you like</label>
          <div className="multipleInputContainer">
            {/* ... (Checkbox inputs for different activities) */}
          </div>

          {/* Input for 'About Me' section */}
          <label htmlFor="about">About Me</label>
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
          {/* Input for profile picture URL */}
          <label htmlFor="about">Profile Picture</label>
          <input
            type="url"
            name="url"
            id="url"
            onChange={handleChange}
            required={true}
          ></input>

          {/* Display preview of the profile picture */}
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

        {/* Submit button for form */}
        <input className="secondaryBtn" type="submit" />
      </form>
    </div>
  );
};

// Export the SettingsModal component as the default export
export default SettingsModal;
