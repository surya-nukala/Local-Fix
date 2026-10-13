import { useNavigate } from "react-router-dom";
import "../App.css";

function Providers() {
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

          <button onClick={() => navigate("/providers")}>
            Providers
          </button>

          <button onClick={() => navigate("/")}>
            Logout
          </button>

        </div>

      </nav>

      <main className="dashboard-content">

        <h1>Service Providers</h1>

        <p>
          Find trusted professionals for your service needs.
        </p>

        <div className="service-container">

          {/* Provider 1 */}
          <div className="service-card">

            <h3>Ravi Electrical Services</h3>

            <p>Service: Electrician</p>

            <p>Experience: 5 years</p>

            <p>Location: Eluru</p>

            <button onClick={() => navigate("/provider-profile")}>
              View Profile
            </button>

          </div>


          {/* Provider 2 */}
          <div className="service-card">

            <h3>Suresh Plumbing Services</h3>

            <p>Service: Plumber</p>

            <p>Experience: 7 years</p>

            <p>Location: Eluru</p>

            <button onClick={() => navigate("/provider-profile")}>
              View Profile
            </button>

          </div>


          {/* Provider 3 */}
          <div className="service-card">

            <h3>CoolCare Services</h3>

            <p>Service: AC Repair</p>

            <p>Experience: 4 years</p>

            <p>Location: Eluru</p>

            <button onClick={() => navigate("/provider-profile")}>
              View Profile
            </button>

          </div>


          {/* Provider 4 */}
          <div className="service-card">

            <h3>CleanPro Services</h3>

            <p>Service: Home Cleaning</p>

            <p>Experience: 6 years</p>

            <p>Location: Eluru</p>

            <button onClick={() => navigate("/provider-profile")}>
              View Profile
            </button>

          </div>


          {/* Provider 5 */}
          <div className="service-card">

            <h3>Venkat Electrical Works</h3>

            <p>Service: Electrician</p>

            <p>Experience: 8 years</p>

            <p>Location: Eluru</p>

            <button onClick={() => navigate("/provider-profile")}>
              View Profile
            </button>

          </div>


          {/* Provider 6 */}
          <div className="service-card">

            <h3>HomeCare Experts</h3>

            <p>Service: Home Cleaning</p>

            <p>Experience: 3 years</p>

            <p>Location: Eluru</p>

            <button onClick={() => navigate("/provider-profile")}>
              View Profile
            </button>

          </div>

        </div>

      </main>

    </div>
  );
}

export default Providers;