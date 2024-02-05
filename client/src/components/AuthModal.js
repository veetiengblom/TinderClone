import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthModal = ({ setShowModal, signUp }) => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirmpassword, setConfirmPassword] = useState(null);
  const [error, setError] = useState(null);

  let navigate = useNavigate();

  const handleClick = () => {
    setShowModal(false);
  };

  //Handle creating account and log in
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (signUp && password !== confirmpassword) {
        setError("Passwords need to match!");
        return;
      }
      //Create account for user when registering first time or log user in
      if (signUp) {
        //Register user in
        fetch("/index/register", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }).then((response) => {
          console.log("response", response);
          if (response.ok) {
            navigate("/onboarding");
          }
          //DO something järkevä with the response
        });
      } else {
        //Log user in
        console.log("logging in");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="authModal">
      <div className="closeIcon" onClick={handleClick}>
        ✖
      </div>
      <h2> {signUp ? "Create account" : "Log in"}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="email"
          required={true}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          id="password"
          name="password"
          placeholder="password"
          required={true}
          onChange={(e) => setPassword(e.target.value)}
        />
        {signUp && (
          <input
            type="password"
            id="passwordCheck"
            name="passwordCheck"
            placeholder="confirmPassword"
            required={true}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        )}
        <input className="secondaryBtn" type="submit" />
        <p>{error}</p>
      </form>
    </div>
  );
};

export default AuthModal;
