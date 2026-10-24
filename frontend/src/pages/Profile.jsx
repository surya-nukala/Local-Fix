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

        <p className="eyebrow">ACCOUNT SETTINGS</p>
        <h1>My profile</h1>
        <div className="profile-card account-profile-card">
          <div className="profile-hero">
            <div className="profile-avatar">N</div>
            <div>
              <h2>N. Jaya Surya</h2>
              <p>LocalFix customer</p>
            </div>
          </div>
          <div className="profile-details">
            <div><span>Full name</span><strong>N. Jaya Surya</strong></div>
            <div><span>Email address</span><strong>nukalajayasurya@gmail.com</strong></div>
            <div><span>Account type</span><strong>Customer</strong></div>
          </div>
        </div>

      </main>

    </div>
  );
}

export default Profile;