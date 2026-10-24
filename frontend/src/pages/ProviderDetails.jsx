import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../App.css";
import logo from "../assets/logo_img.png";
import { apiRequest } from "../api";

function ProviderDetails() {

  const navigate = useNavigate();

  // Get provider name from URL
  const { name } = useParams();

  const [provider, setProvider] = useState(null);
  const [error, setError] = useState("");
  const providerName = decodeURIComponent(name ?? "");

  useEffect(() => {
    apiRequest("/providers")
      .then((providers) => {
        setProvider(providers.find((candidate) => candidate.name === providerName) || null);
      })
      .catch((requestError) => setError(requestError.message));
  }, [providerName]);

  return (
    <div className="dashboard">

      {/* Navigation Bar */}
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

      {/* Main Content */}
      <main className="dashboard-content">

        <p className="eyebrow">PROVIDER PROFILE</p>
        {error && <div className="service-card api-error">{error}. Start the backend and seed MongoDB to load this profile.</div>}

        {provider ? (
          <div className="profile-card provider-profile-card">
            <div className="profile-hero">
              <div className="profile-avatar">{provider.name.charAt(0)}</div>
              <div>
                <h1>{provider.name}</h1>
                <p className="provider-rating">★ 4.8 <span>· Highly rated local professional</span></p>
              </div>
              <span className="verified-badge">✓ Verified</span>
            </div>
            <div className="profile-details">
              <div><span>Service</span><strong>{provider.service}</strong></div>
              <div><span>Experience</span><strong>{provider.experience}</strong></div>
              <div><span>Location</span><strong>{provider.location}</strong></div>
            </div>
            <div className="profile-about">
              <h3>About this professional</h3>
              <p>Reliable local service with transparent communication and quality workmanship.</p>
            </div>

            <button
              className="primary-action"
              onClick={() =>
                navigate(
                  `/request-service/${encodeURIComponent(provider.name)}?service=${encodeURIComponent(provider.service)}`
                  + `&location=${encodeURIComponent(provider.location)}`
                )
              }
            >
              Request this service <span aria-hidden="true">→</span>
            </button>

          </div>
        ) : (
          <div className="profile-card">

            <p>This provider could not be found.</p>

            <button onClick={() => navigate("/customer-dashboard")}>
              Back to Services
            </button>

          </div>
        )}

      </main>

    </div>
  );
}

export default ProviderDetails;