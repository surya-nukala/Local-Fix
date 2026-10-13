import { useNavigate } from "react-router-dom";
import "../App.css";

function CustomerDashboard() {
  const navigate = useNavigate();

  return (
    <div className="dashboard">

      <nav className="dashboard-navbar">

        <h2 className="logo">
          Local<span>Fix</span>
        </h2>

        <div className="dashboard-links">

          <button>
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

        <h1>Welcome to LocalFix</h1>

        <p>
          Find trusted local service providers near you.
        </p>

        <div className="dashboard-search">

          <input
            type="text"
            placeholder="What service do you need?"
          />

          <button>
            Search
          </button>

        </div>

        <section className="dashboard-services">

          <h2>Popular Services</h2>

          <div className="service-container">

            <div className="service-card">
              <h3>Electrician</h3>
              <p>Find trusted electricians.</p>
              <button onClick={() => navigate("/providers")}>
                View Providers
              </button>
            </div>

            <div className="service-card">
              <h3>Plumber</h3>
              <p>Find reliable plumbers.</p>
              <button onClick={() => navigate("/providers")}>
                View Providers
              </button>
            </div>

            <div className="service-card">
              <h3>AC Repair</h3>
              <p>Find AC repair professionals.</p>
              <button onClick={() => navigate("/providers")}>
                View Providers
              </button>
            </div>

            <div className="service-card">
              <h3>Home Cleaning</h3>
              <p>Find cleaning professionals.</p>
              <button onClick={() => navigate("/providers")}>
                View Providers
</button>
            </div>

          </div>

        </section>

      </main>

    </div>
  );
}

export default CustomerDashboard;