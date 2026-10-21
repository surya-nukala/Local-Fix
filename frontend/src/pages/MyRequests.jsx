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

        <h1>My Requests</h1>

        <p>
          You can view your service requests here.
        </p>

        {requests.length > 0 ? (

          <div className="service-container">

            {requests.map((request) => (

              <div
                className="service-card"
                key={request.id}
              >

                <h3>{request.provider}</h3>

                <p>
                  <strong>Service:</strong> {request.service}
                </p>

                <p>
                  <strong>Location:</strong> {request.location}
                </p>

                <p>
                  <strong>Status:</strong> {request.status}
                </p>

              </div>

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