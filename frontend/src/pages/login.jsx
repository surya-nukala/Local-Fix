import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../App.css";
import logo from "../assets/logo_img.png";
import { apiRequest } from "../api";

function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setLoading(true);
    const formData = new FormData(event.currentTarget);

    try {
      const result = await apiRequest("/auth/login", {
        method: "POST",
        body: JSON.stringify({
          email: formData.get("email"),
          password: formData.get("password"),
          role: "customer"
        })
      });
      localStorage.setItem("localfixToken", result.token);
      localStorage.setItem("localfixUser", JSON.stringify(result.user));
      navigate(location.state?.from || "/customer-dashboard");
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <img src={logo} alt="LocalFix Logo" className="auth-logo" />
        <h1>Welcome Back</h1>
        <p>Login to your LocalFix account</p>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"/>
          <input
            type="password"
            name="password"
            placeholder="Enter your password"/>
          {error && <p className="form-error" role="alert">{error}</p>}
          <button type="submit" disabled={loading}>
            {loading ? "Signing in..." : "Login"}
          </button>
        </form>
        <p className="auth-switch">
          Don't have an account?
          <button onClick={() => navigate("/register")}>
            Register
          </button>
        </p>

      </div>

    </div>
  );
}

export default Login;