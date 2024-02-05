import { useState } from "react";

const AuthModal = ({ setShowModal, signUp }) => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirmpassword, setConfirmPassword] = useState(null);
  const [error, setError] = useState(null);

  const handleClick = () => {
    setShowModal(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      if (signUp && password !== confirmpassword) {
        setError("Passwords need to match!");
      }
      console.log("make a post request to our database");
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
