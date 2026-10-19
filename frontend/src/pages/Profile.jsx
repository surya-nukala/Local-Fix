import { useNavigate } from "react-router-dom";
import "../App.css";
import logo from "../assets/logo_img.png";

function Profile() {
  const navigate = useNavigate();

  return (
    <div className="dashboard">

      <nav className="dashboard-navbar">

        <img src={logo} alt="LocalFix Logo" className="site-logo" />

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

      <main className="dashboard-content">

        <h1>My Profile</h1>

        <div className="profile-card">

          <h3>Customer Profile</h3>

          <p>Name: N. Jaya Surya</p>

          <p>Email: nukalajayasurya@gmail.com</p>

          <p>Role: Owner</p>

        </div>

      </main>

    </div>
  );
}

export default Profile;