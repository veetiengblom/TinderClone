import { useState } from "react";
import Nav from "../components/Nav";
import { activities } from "../utils/activities";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

const OnBoarding = () => {
  const [cookies, setCookie, removeCookies] = useCookies(["user"]);
  const [chosenActivities, setChosenActivities] = useState(
    new Array(activities.length).fill(false)
  );
  //need to add the activity
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

    matches: [],
  });

  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/index/user", {
        method: "PUT",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ formData }),
      });
      const data = await response.json();
      console.log("data", data);
      if (!response.ok) {
        return console.error("response error", response);
      }
      if (response.status === 200) {
        navigate("/dashboard");
      }
    } catch (error) {
      return console.log(error);
    }
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

  const handleOnChange = (position) => {
    const updatedCheckedState = chosenActivities.map((item, index) =>
      index === position ? !item : item
    );
    setChosenActivities(updatedCheckedState);
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
            <label htmlFor="activities">Choose activities you like</label>
            <div className="multipleInputContainer">
              {activities.map(({ name }, index) => {
                return (
                  <>
                    <input
                      key={index}
                      type="checkbox"
                      id={`activityCheckbox${name}`}
                      name={name}
                      value={name}
                      onChange={() => handleOnChange(index)}
                    />
                    <label htmlFor={`activityCheckbox${name}`}>{name}</label>
                  </>
                );
              })}
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
              {formData.url && (
                <img
                  src={formData.url}
                  className="profileImg"
                  alt="Profile pic preview"
                ></img>
              )}
            </div>
          </section>
        </form>
      </div>
    </>
  );
};

export default OnBoarding;
