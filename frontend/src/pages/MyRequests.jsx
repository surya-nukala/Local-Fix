import { useNavigate } from "react-router-dom";
import "../App.css";

function MyRequests() {
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

          <button>
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

        <h1>My Requests</h1>

        <p>You can view your service requests here.</p>

        <div className="request-card">
          <h3>No Requests Yet</h3>
          <p>
            You haven't requested any services yet.
          </p>
        </div>

      </main>

    </div>
  );
}

export default MyRequests;