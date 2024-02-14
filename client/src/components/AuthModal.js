import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

const AuthModal = ({ setShowModal, signUp }) => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirmpassword, setConfirmPassword] = useState(null);
  const [error, setError] = useState(null);
  const [cookies, setCookie, removeCookies] = useCookies(["user"]);

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

      //Register user in
      const route = signUp ? "index/register" : "index/login";
      const response = await fetch(route, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      // if (response.status === 403) {
      //   setError("Email is already in use");
      //   return;
      // }

      const data = await response.json();
      if (!response.ok) {
        setError(data.error);
        return console.error("response error", response);
      }
      if (response.status === 201) {
        setCookie("AuthToken", data.token);
        setCookie("UserId", data.userId);

        if (signUp) {
          navigate("/onboarding");
          window.location.reload();
        }
        if (!signUp) {
          navigate("/dashboard");
          window.location.reload();
        }
      }
    } catch (error) {
      console.error(error);
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
