import { useNavigate } from "react-router-dom";
import "../App.css";
import logo from "../assets/logo_img.png";

function CustomerDashboard() {

  const navigate = useNavigate();

  return (
    <div className="dashboard">

      {/* Navigation Bar */}
      <nav className="dashboard-navbar">

        <img
          src={logo}
          alt="LocalFix Logo"
          className="logo-image"
        />

        <div className="dashboard-links">

          <button onClick={() => navigate("/customer-dashboard")}>
            Home
          </button>

          <button onClick={() => navigate("/my-requests")}>
            My Requests
          </button>

          <button onClick={() => navigate("/profile")}>
            Profile
          </button>

          <button onClick={() => navigate("/")}>
            Logout
          </button>

        </div>

      </nav>

      {/* Dashboard Content */}
      <main className="dashboard-content">

        <h1>Welcome to LocalFix</h1>

        <p>
          Find trusted local service providers near you.
        </p>

        <h2>Popular Services</h2>

        <div className="service-container">

          {/* Electrician */}
          <div className="service-card">

            <h3>Electrician</h3>

            <p>
              Find trusted electricians near you.
            </p>

            <button
              onClick={() => navigate("/providers/electrician")}
            >
              View Providers
            </button>

          </div>

          {/* Plumber */}
          <div className="service-card">

            <h3>Plumber</h3>

            <p>
              Find trusted plumbers near you.
            </p>

            <button
              onClick={() => navigate("/providers/plumber")}
            >
              View Providers
            </button>

          </div>

          {/* AC Repair */}
          <div className="service-card">

            <h3>AC Repair</h3>

            <p>
              Find trusted AC repair professionals near you.
            </p>

            <button
              onClick={() => navigate("/providers/ac-repair")}
            >
              View Providers
            </button>

          </div>

          {/* Home Cleaning */}
          <div className="service-card">

            <h3>Home Cleaning</h3>

            <p>
              Find trusted home cleaning professionals near you.
            </p>

            <button
              onClick={() => navigate("/providers/home-cleaning")}
            >
              View Providers
            </button>

          </div>

        </div>

      </main>

    </div>
  );
}

export default CustomerDashboard;