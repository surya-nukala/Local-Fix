import { useNavigate } from "react-router-dom";
import "../App.css";
import logo from "../assets/logo_img.png";

function ProviderLogin() {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // For now, use Ravi as the logged-in provider
    localStorage.setItem(
      "loggedInProvider",
      "Ravi Electrical Services"
    );

    navigate("/providers-dashboard");
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
            type="text"
            placeholder="Enter Provider Name"
            required
          />

          <input
            type="password"
            placeholder="Enter Password"
            required
          />

          <button type="submit">
            Login
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