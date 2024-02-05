import { useState } from "react";
import Nav from "../components/Nav";

const OnBoarding = () => {
  //need to add the activity
  const [formData, setFormData] = useState({
    userID: "",
    firstName: "",
    dobDay: "",
    dobMonth: "",
    dobYear: "",
    showGender: false,
    genderIdentity: "",
    genderInterest: "",
    email: "",
    url: "",
    about: "",
    matches: [],
  });

  const handleSubmit = () => {
    console.log("submitted");
  };

  const handleChange = (e) => {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    const name = e.target.name;

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  console.log(formData);

  return (
    <>
      <Nav minimal={true} setShowModal={() => {}} showModal={false} />
      <div className="onboarding">
        <h2>Create Account</h2>
        <form onSubmit={handleSubmit}>
          <section>
            <label htmlFor="firstName">First Name</label>
            <input
              id="firstName"
              type="text"
              name="firstName"
              placeholder="First Name"
              required={true}
              value={formData.firstName}
              onChange={handleChange}
            ></input>
            <label>Birthday</label>
            <div className="multipleInputContainer">
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
            <label>Gender</label>
            <div className="multipleInputContainer">
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
            <div className="multipleInputContainer"></div>

            <label htmlFor="showGender">Show gender on my profile</label>
            <input
              id="showGender"
              type="checkbox"
              name="showGender"
              onChange={handleChange}
              checked={formData.showGender}
            ></input>
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
            <input type="submit"></input>
          </section>
          <section>
            <label htmlFor="about">Profile Profile</label>
            <input
              type="url"
              name="url"
              id="url"
              onChange={handleChange}
              required={true}
            ></input>
            <div className="photoContainer">
              <img src={formData.url} alt="Profile pic preview"></img>
            </div>
          </section>
        </form>
      </div>
    </>
  );
};

export default OnBoarding;