import { useNavigate } from "react-router-dom";
import "../App.css";

function Profile() {
  const navigate = useNavigate();

  return (
    <div className="dashboard">

      <nav className="dashboard-navbar">

        <h2 className="logo">
          Local<span>Fix</span>
        </h2>

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