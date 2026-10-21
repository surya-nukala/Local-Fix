import { useNavigate } from "react-router-dom";
import "../App.css";
import logo from "../assets/logo_img.png";

function ProvidersDashboard() {
  const navigate = useNavigate();

  // Get logged-in provider
  const currentProvider =
    localStorage.getItem("loggedInProvider");

  // Get all requests
  const savedRequests =
    localStorage.getItem("serviceRequests");

  const allRequests = savedRequests
    ? JSON.parse(savedRequests)
    : [];

  // Show only this provider's requests
  const providerRequests = allRequests.filter(
    (request) =>
      request.provider === currentProvider
  );

  // Accept or reject request
  const updateStatus = (id, newStatus) => {
    const updatedRequests = allRequests.map(
      (request) =>
        request.id === id
          ? { ...request, status: newStatus }
          : request
    );

    localStorage.setItem(
      "serviceRequests",
      JSON.stringify(updatedRequests)
    );

    window.location.reload();
  };

  return (
    <div className="dashboard">

      <nav className="dashboard-navbar">

        <img
          src={logo}
          alt="LocalFix Logo"
          className="logo-image"
        />

        <div className="dashboard-links">

          <button
            onClick={() =>
              navigate("/providers-dashboard")
            }
          >
            Home
          </button>

          <button
            onClick={() =>
              navigate("/customer-dashboard")
            }
          >
            Customer View
          </button>

          <button
            onClick={() => {
              localStorage.removeItem("loggedInProvider");
              navigate("/");
            }}
          >
            Logout
          </button>

        </div>

      </nav>

      <main className="dashboard-content">

        <h1>Provider Dashboard</h1>

        <p>
          Welcome, {currentProvider}
        </p>

        <p>
          View service requests sent to you.
        </p>

        {providerRequests.length > 0 ? (

          <div className="service-container">

            {providerRequests.map((request) => (

              <div
                className="service-card"
                key={request.id}
              >

                <h3>Service Request</h3>

                <p>
                  <strong>Service:</strong>{" "}
                  {request.service}
                </p>

                <p>
                  <strong>Location:</strong>{" "}
                  {request.location}
                </p>

                <p>
                  <strong>Status:</strong>{" "}
                  {request.status}
                </p>

                {request.status === "Pending" && (

                  <div className="request-actions">

                    <button
                      onClick={() =>
                        updateStatus(
                          request.id,
                          "Accepted"
                        )
                      }
                    >
                      Accept Request
                    </button>

                    <button
                      onClick={() =>
                        updateStatus(
                          request.id,
                          "Rejected"
                        )
                      }
                    >
                      Reject Request
                    </button>

                  </div>

                )}

              </div>

            ))}

          </div>

        ) : (

          <div className="service-card">

            <h3>No Requests</h3>

            <p>
              No service requests have been sent to you.
            </p>

          </div>

        )}

      </main>

    </div>
  );
}

export default ProvidersDashboard;