import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";
import logo from "../assets/logo_img.png";
import { apiRequest } from "../api";

function ProviderLogin() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    setError("");
    setLoading(true);
    try {
      const result = await apiRequest("/auth/login", {
        method: "POST",
        body: JSON.stringify({
          email: formData.get("email"),
          password: formData.get("password"),
          role: "provider"
        })
      });
      localStorage.setItem("localfixToken", result.token);
      localStorage.setItem("localfixUser", JSON.stringify(result.user));
      navigate("/providers-dashboard");
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">

      <div className="auth-card">

        <img
          src={logo}
          alt="LocalFix Logo"
          className="auth-logo"
        />

        <h2>Provider Login</h2>

        <form onSubmit={handleLogin}>

          <input
            type="email"
            name="email"
            placeholder="Enter provider email"
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Enter Password"
            required
          />

          {error && <p className="form-error" role="alert">{error}</p>}
          <button type="submit" disabled={loading}>
            {loading ? "Signing in..." : "Login"}
          </button>

        </form>

        <button
          className="auth-back-button"
          onClick={() => navigate("/")}
        >
          Back to Home
        </button>

      </div>

    </div>
  );
}

export default ProviderLogin;