import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../App.css";
import logo from "../assets/logo_img.png";
import { apiRequest } from "../api";

function Providers() {
  const navigate = useNavigate();
  const { service } = useParams();
  const [providers, setProviders] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    apiRequest(`/providers?service=${encodeURIComponent(service)}`)
      .then(setProviders)
      .catch((requestError) => setError(requestError.message));
  }, [service]);

  const filteredProviders = providers;

  // Convert service name into readable format
  let serviceName = service;

  if (service === "electrician") {
    serviceName = "Electrician";
  }
  else if (service === "plumber") {
    serviceName = "Plumber";
  }
  else if (service === "ac-repair") {
    serviceName = "AC Repair";
  }
  else if (service === "home-cleaning") serviceName = "Home Cleaning";
  else if (service === "carpenter") serviceName = "Carpentry";
  else if (service === "painting") serviceName = "Painting";
  else if (service === "pest-control") serviceName = "Pest Control";
  else if (service === "salon") serviceName = "Salon at Home";

  return (
    <div className="dashboard">

      {/* Navigation Bar */}
      <nav className="dashboard-navbar">

        <img
          src={logo}
          alt="LocalFix Logo"
          className="site-logo"
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

      {/* Main Content */}
      <main className="dashboard-content">

        <div className="listing-header">
          <div>
            <p className="eyebrow">LOCALFIX MARKETPLACE</p>
            <h1>{serviceName} providers</h1>
            <p>Professionals near you, verified for quality and reliability.</p>
          </div>
          <span className="result-count">{filteredProviders.length} providers</span>
        </div>

        {error && <div className="service-card api-error">{error}. Start the backend and seed MongoDB to load providers.</div>}

        <div className="service-container">

          {filteredProviders.length > 0 ? (

            filteredProviders.map((provider) => (

              <article className="service-card provider-card" key={provider.name}>
                <div className="provider-card-top">
                  <div className="provider-avatar">{provider.name.charAt(0)}</div>
                  <span className="verified-badge">✓ Verified</span>
                </div>
                <h3>{provider.name}</h3>
                <p className="provider-rating">★ 4.8 <span>· 24 reviews</span></p>
                <p className="provider-meta">● {provider.location} &nbsp; · &nbsp; {provider.experience} experience</p>

                <button
                  onClick={() =>
                    navigate(
                      `/provider-profile/${encodeURIComponent(provider.name)}`
                    )
                  }
                >View profile <span aria-hidden="true">→</span></button>
              </article>

            ))

          ) : (

            <div className="service-card">

              <h3>No Providers Found</h3>

              <p>
                No providers are available for this service.
              </p>

            </div>

          )}

        </div>

      </main>

    </div>
  );
}

export default Providers;