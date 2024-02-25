// Importing necessary modules and components from React and other dependencies
import { useState } from "react";
import Nav from "../components/Nav";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

// OnBoarding component responsible for user registration
const OnBoarding = () => {
  const [cookies, setCookie, removeCookies] = useCookies(["user"]);

  // State to manage form data for user registration
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

  let navigate = useNavigate();

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Sending a PUT request to update user data on the server
      const response = await fetch("/index/user", {
        method: "PUT",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ formData }),
      });
      const data = await response.json();

      // Checking for errors in the response
      if (!response.ok) {
        return console.error("response error", response);
      }

      // Redirecting to the dashboard on successful registration
      if (response.status === 200) {
        navigate("/dashboard");
      }
    } catch (error) {
      return console.log(error);
    }
  };

  // Function to handle changes in form input fields
  const handleChange = (e) => {
    // Extracting value and name from the target element
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;

    const name = e.target.name;

    // Updating form data state using the setFormData function
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Function to handle changes in checkbox activities
  const handleOnChange = (e) => {
    const checked = e.target.checked;
    const value = e.target.value;

    // Updating activities array based on checkbox state
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
  console.log(formData);

  // Rendering the OnBoarding component JSX
  return (
    <>
      {/* Rendering the navigation bar with minimal UI */}
      <Nav minimal={true} setShowModal={() => {}} showModal={false} />

      {/* Rendering the main content of the OnBoarding component */}
      <div className="onboarding">
        <h2>Create Account</h2>

        {/* Form for user registration */}
        <form onSubmit={handleSubmit}>
          <section>
            <label className="title" htmlFor="firstName">
              First Name
            </label>
            <input
              id="firstName"
              type="text"
              name="firstName"
              placeholder="First Name"
              required={true}
              value={formData.firstName}
              onChange={handleChange}
            ></input>

            <label className="title" htmlFor="dobDay">
              Birthday
            </label>
            {/* Input fields for day, month, and year of birth */}
            <div className="multipleInputContainer" id="birthday">
              <input
                id="dobDay"
                type="number"
                name="dobDay"
                placeholder="DD"
                required={true}
                value={formData.dobDay}
                onChange={handleChange}
              ></input>
              <input
                id="dobMonth"
                type="number"
                name="dobMonth"
                placeholder="MM"
                required={true}
                value={formData.dobMonth}
                onChange={handleChange}
              ></input>
              <input
                id="dobYear"
                type="number"
                name="dobYear"
                placeholder="YYYY"
                required={true}
                value={formData.dobYear}
                onChange={handleChange}
              ></input>
            </div>

            {/* Input fields for gender identity */}
            <label className="title" htmlFor="gender">
              Gender
            </label>
            <div className="multipleInputContainer" required={true}>
              <input
                id="manGenderIdentity"
                type="radio"
                name="genderIdentity"
                value={"man"}
                onChange={handleChange}
                checked={formData.genderIdentity === "man"}
              ></input>
              <label htmlFor="manGenderIdentity">Man</label>

              <input
                id="womanGenderIdentity"
                type="radio"
                name="genderIdentity"
                value={"woman"}
                onChange={handleChange}
                checked={formData.genderIdentity === "woman"}
              ></input>
              <label htmlFor="womanGenderIdentity">Woman</label>

              <input
                id="elseGenderIdentity"
                type="radio"
                name="genderIdentity"
                value={"else"}
                onChange={handleChange}
                checked={formData.genderIdentity === "else"}
              ></input>
              <label htmlFor="elseGenderIdentity">Else</label>
            </div>

            {/* Input field to show gender on the user's profile */}
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

            {/* Input fields for gender interest */}
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

            {/* Checkbox input for selecting user activities */}
            <label className="title" htmlFor="activities">
              Choose activities you like
            </label>
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

            {/* Input field for user description */}
            <label className="title" htmlFor="about">
              About Me
            </label>
            <input
              id="about"
              type="text"
              name="about"
              required={true}
              placeholder="I like long walks..."
              value={formData.about}
              onChange={handleChange}
            ></input>
          </section>

          {/* Section for profile picture input */}
          <section>
            <label className="title" htmlFor="about">
              Profile Picture
            </label>
            <input
              placeholder="Image url"
              type="url"
              name="url"
              id="url"
              onChange={handleChange}
              required={true}
            ></input>

            {/* Container to display a preview of the profile picture */}
            <div className="photoContainer">
              {formData.url && (
                <img
                  src={formData.url}
                  className="profileImg"
                  alt="Profile pic preview"
                ></img>
              )}
            </div>

            {/* Submit button for the registration form */}
            <input className="onboardingBtn" type="submit"></input>
          </section>
        </form>
      </div>
    </>
  );
};

// Exporting the OnBoarding component as the default export
export default OnBoarding;
