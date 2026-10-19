import { useNavigate } from "react-router-dom";
import "../App.css";
import logo from "../assets/logo_img.png";

function Register() {
  const navigate = useNavigate();

  return (
    <div className="auth-page">

      <div className="auth-card">
        <img src={logo} alt="LocalFix Logo" className="auth-logo" />

        <h1>Create Account</h1>

        <p>Join LocalFix today</p>

        <form>

          <input
            type="text"
            placeholder="Enter your name"
          />

          <input
            type="email"
            placeholder="Enter your email"
          />

          <input
            type="password"
            placeholder="Create password"
          />

          <input
            type="password"
            placeholder="Confirm password"
          />

          <select>
            <option value="">Select your role</option>
            <option value="customer">Customer</option>
            <option value="provider">Service Provider</option>
          </select>

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