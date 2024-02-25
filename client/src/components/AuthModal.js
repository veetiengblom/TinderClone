// Import necessary React hooks and modules
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

// Define the functional component AuthModal
const AuthModal = ({ setShowModal, signUp }) => {
  // State variables to store form input values and error messages
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirmpassword, setConfirmPassword] = useState(null);
  const [error, setError] = useState(null);

  // State variables to manage cookies
  const [cookies, setCookie, removeCookies] = useCookies(["user"]);

  // React Router hook for navigation
  let navigate = useNavigate();

  // Event handler to close the modal
  const handleClick = () => {
    setShowModal(false);
  };

  // Event handler for form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Check if passwords match for sign up
      if (signUp && password !== confirmpassword) {
        setError("Passwords need to match!");
        return;
      }

      // Determine the API route based on sign up or login
      const route = signUp ? "index/register" : "index/login";

      // Send a POST request to the server with user credentials
      const response = await fetch(route, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      // Parse the response JSON
      const data = await response.json();

      console.log("data", data);

      // Handle errors from the server
      if (!response.ok) {
        setError(data.error);
        return console.error("response error", response);
      }

      // Handle successful response (status 201 - Created)
      if (response.status === 201) {
        // Set cookies with authentication token and user ID
        setCookie("AuthToken", data.token);
        setCookie("UserId", data.userId);

        // Redirect the user based on sign up or login
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
      // Log and handle any unexpected errors
      console.error(error);
    }
  };

  // Render the AuthModal component
  return (
    <div className="authModal">
      {/* Close icon to hide the modal */}
      <div className="closeIcon" onClick={handleClick}>
        ✖
      </div>
      {/* Title indicating whether the user is creating an account or logging in */}
      <h2>{signUp ? "Create account" : "Log in"}</h2>
      {/* Form for user input */}
      <form onSubmit={handleSubmit}>
        {/* Input for email */}
        <input
          type="email"
          id="email"
          name="email"
          placeholder="email"
          required={true}
          onChange={(e) => setEmail(e.target.value)}
        />
        {/* Input for password */}
        <input
          type="password"
          id="password"
          name="password"
          placeholder="password"
          required={true}
          onChange={(e) => setPassword(e.target.value)}
        />
        {/* Additional password input for sign-up */}
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
        {/* Submit button */}
        <input className="secondaryBtn" type="submit" />
        {/* Display any error messages */}
        <p>{error}</p>
      </form>
    </div>
  );
};

// Export the AuthModal component as the default export
export default AuthModal;
