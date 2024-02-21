import React, { useState } from "react";
import { useCookies } from "react-cookie";

const SettingsModal = ({ setShowModal }) => {
  const [cookies, setCookie, removeCookies] = useCookies(["user"]);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirmpassword, setConfirmPassword] = useState(null);
  const [formData, setFormData] = useState({
    userId: cookies.UserId,
    firstName: "",
    dobDay: "",
    dobMonth: "",
    dobYear: "",
    showGender: false,
    genderIdentity: "",
    genderInterest: "",
    url: "",
    about: "",
    activities: [],
    matches: [],
  });

  const handleClick = () => {
    setShowModal(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  const handleChange = (e) => {
    // const value =
    //   e.target.type === "checkbox" ? e.target.checked : e.target.value;
    // const name = e.target.name;
    // setFormData((prevState) => ({
    //   ...prevState,
    //   [name]: value,
    // }));
  };

  const handleOnChange = (e) => {
    // const checked = e.target.checked;
    // const value = e.target.value;
    // console.log("activity", value);
    // if (checked) {
    //   setFormData((prevState) => ({
    //     ...prevState,
    //     activities: [...prevState.activities, value],
    //   }));
    // }
    // if (!checked) {
    //   const updatedActivities = formData.activities.filter(
    //     (activity) => activity !== value
    //   );
    //   setFormData((prevData) => ({
    //     ...prevData,
    //     activities: updatedActivities,
    //   }));
    // }
  };

  return (
    <div className="settingsModal">
      <div className="closeIcon" onClick={handleClick}>
        ✖
      </div>
      <h2>Change User Profile</h2>
      {/* <form onSubmit={handleSubmit}>
        <section>
          <label>Show Me</label>
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
          <div className="multipleInputContainer">
            <label htmlFor="about">About Me</label>
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
          <label htmlFor="activities">Choose activities you like</label>
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
        </section>
        <section>
          <label htmlFor="about">Profile Picture</label>
          <input
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
      </form> */}
    </div>
  );
};

export default SettingsModal;
