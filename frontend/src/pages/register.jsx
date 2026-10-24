import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";
import logo from "../assets/logo_img.png";
import { apiRequest } from "../api";

function Register() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [role, setRole] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");

    const formData = new FormData(event.currentTarget);
    const password = formData.get("password");
    const confirmPassword = formData.get("confirmPassword");

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const result = await apiRequest("/auth/register", {
        method: "POST",
        body: JSON.stringify({
          name: formData.get("name"),
          email: formData.get("email"),
          password,
          role: formData.get("role"),
          service: formData.get("service"),
          experience: formData.get("experience"),
          location: formData.get("location")
        })
      });
      localStorage.setItem("localfixToken", result.token);
      localStorage.setItem("localfixUser", JSON.stringify(result.user));
      navigate(result.user.role === "provider" ? "/providers-dashboard" : "/customer-dashboard");
    } catch (requestError) {
      setError(requestError.message);
    }
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

          <select
            name="role"
            value={role}
            onChange={(event) => setRole(event.target.value)}
            required
          >
            <option value="">Select your role</option>
            <option value="customer">Customer</option>
            <option value="provider">Service Provider</option>
          </select>

          {role === "provider" && (
            <div className="provider-registration-fields">
              <p className="form-section-label">Provider details</p>
              <select name="service" defaultValue="" required>
                <option value="">Select your service</option>
                <option value="electrician">Electrician</option>
                <option value="plumber">Plumbing</option>
                <option value="ac-repair">AC & Appliance</option>
                <option value="home-cleaning">Home Cleaning</option>
                <option value="carpenter">Carpentry</option>
                <option value="painting">Painting</option>
                <option value="pest-control">Pest Control</option>
                <option value="salon">Salon at Home</option>
              </select>
              <input
                type="text"
                name="experience"
                placeholder="Experience (for example, 5 years)"
                required
              />
              <input
                type="text"
                name="location"
                placeholder="Service location"
                defaultValue="Eluru"
                required
              />
            </div>
          )}
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