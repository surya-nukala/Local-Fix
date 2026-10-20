import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";
import logo from "../assets/logo_img.png";

function Register() {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    setError("");

    const formData = new FormData(event.currentTarget);
    const password = formData.get("password");
    const confirmPassword = formData.get("confirmPassword");

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    navigate("/login");
  }

  return (
    <div className="auth-page">

      <div className="auth-card">
        <img src={logo} alt="LocalFix Logo" className="auth-logo" />

        <h1>Create Account</h1>

        <p>Join LocalFix today</p>

        <form onSubmit={handleSubmit}>

          <input
            type="text"
            name="name"
            placeholder="Enter your name"
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Create password"
            required
            minLength={6}
          />

          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm password"
            required
          />

          <select name="role" defaultValue="" required>
            <option value="">Select your role</option>
            <option value="customer">Customer</option>
            <option value="provider">Service Provider</option>
          </select>

          {error && <p role="alert">{error}</p>}

          <button type="submit">
            Register
          </button>

        </form>

        <p className="auth-switch">
          Already have an account?
          <button onClick={() => navigate("/login")}>
            Login
          </button>
        </p>

      </div>

    </div>
  );
}

export default Register;      