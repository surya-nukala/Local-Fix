import { useNavigate } from "react-router-dom";
import "../App.css";
import logo from "../assets/logo_img.png";

function MyRequests() {

  const navigate = useNavigate();

  const savedRequests = localStorage.getItem("serviceRequests");

  const requests = savedRequests
    ? JSON.parse(savedRequests)
    : [];

  return (
    <div className="dashboard">

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

      <main className="dashboard-content">

        <p className="eyebrow">CUSTOMER ACTIVITY</p>
        <h1>My requests</h1>
        <p>Track the services you have requested from LocalFix professionals.</p>

        {requests.length > 0 ? (

          <div className="service-container">

            {requests.map((request) => (

              <article className="service-card request-card" key={request.id}>
                <div className="request-card-header">
                  <div>
                    <p className="eyebrow">SERVICE REQUEST</p>
                    <h3>{request.provider}</h3>
                  </div>
                  <span className={`status-pill status-${request.status.toLowerCase()}`}>
                    {request.status}
                  </span>
                </div>

                <p>
                  <strong>Service:</strong> {request.service}
                </p>

                <p>
                  <strong>Location:</strong> {request.location}
                </p>

              </article>

            ))}

          </div>

        ) : (

          <div className="service-card">

            <h3>No Requests Yet</h3>

            <p>
              You haven't requested any services yet.
            </p>

          </div>

        )}

      </main>

    </div>
  );
}

export default MyRequests;