import { useMemo, useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";
import logo from "../assets/logo_img.png";
import { apiRequest } from "../api";

function ProvidersDashboard() {
  const navigate = useNavigate();
  const savedUser = localStorage.getItem("localfixUser");
  const currentUser = savedUser ? JSON.parse(savedUser) : null;
  const currentProvider = currentUser?.name;
  const [filter, setFilter] = useState("All");
  const [requests, setRequests] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    if (currentProvider) {
      apiRequest(`/requests?provider=${encodeURIComponent(currentProvider)}`)
        .then(setRequests)
        .catch((requestError) => setError(requestError.message));
    }
  }, [currentProvider]);

  const providerRequests = useMemo(
    () => requests.filter((request) => request.provider === currentProvider),
    [requests, currentProvider]
  );

  const visibleRequests = filter === "All"
    ? providerRequests
    : providerRequests.filter((request) => request.status === filter);

  const pendingCount = providerRequests.filter((request) => request.status === "Pending").length;
  const acceptedCount = providerRequests.filter((request) => request.status === "Accepted").length;

  const updateStatus = (id, status) => {
    apiRequest(`/requests/${id}/status`, {
      method: "PATCH",
      body: JSON.stringify({ status })
    })
      .then((updatedRequest) => {
        setRequests((currentRequests) =>
          currentRequests.map((request) =>
            request._id === updatedRequest._id ? updatedRequest : request
          )
        );
      })
      .catch((requestError) => setError(requestError.message));
  };

  if (!currentProvider) {
    return (
      <div className="dashboard">
        <nav className="dashboard-navbar">
          <button className="dashboard-brand" onClick={() => navigate("/")}>
            <img src={logo} alt="LocalFix Logo" />
            <span>LocalFix</span>
          </button>
        </nav>
        <main className="dashboard-content">
          <div className="service-card dashboard-empty-state">
            <span className="empty-state-icon">🔐</span>
            <p className="eyebrow">PROVIDER CONSOLE</p>
            <h1>Sign in to view your dashboard</h1>
            <p>Your incoming requests and business tools will appear here after provider login.</p>
            <button className="primary-action" onClick={() => navigate("/provider-login")}>
              Provider login <span aria-hidden="true">→</span>
            </button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <nav className="dashboard-navbar">
        <button className="dashboard-brand" onClick={() => navigate("/")}>
          <img src={logo} alt="LocalFix Logo" />
          <span>LocalFix <small>PRO</small></span>
        </button>
        <div className="dashboard-links">
          <button className="active-nav" onClick={() => navigate("/providers-dashboard")}>Dashboard</button>
          <button onClick={() => navigate("/customer-dashboard")}>Customer view</button>
          <button
            className="nav-logout"
            onClick={() => {
              localStorage.removeItem("localfixToken");
              localStorage.removeItem("localfixUser");
              navigate("/");
            }}
          >
            Log out
          </button>
        </div>
      </nav>

      <main className="dashboard-content provider-workspace">
        {error && <div className="service-card api-error">{error}. Start the backend and MongoDB to load provider requests.</div>}
        <div className="dashboard-intro">
          <div>
            <p className="eyebrow">PROVIDER CONSOLE</p>
            <h1>Good morning, {currentProvider}</h1>
            <p>Keep your requests moving and your customers informed.</p>
          </div>
          <button className="secondary-action profile-action" onClick={() => navigate("/customer-dashboard")}>
            Preview marketplace
          </button>
        </div>

        <section className="provider-summary-grid" aria-label="Business summary">
          <div className="summary-card summary-highlight">
            <span className="summary-icon">◷</span>
            <div><strong>{pendingCount}</strong><span>Pending requests</span></div>
          </div>
          <div className="summary-card">
            <span className="summary-icon">✓</span>
            <div><strong>{acceptedCount}</strong><span>Accepted jobs</span></div>
          </div>
          <div className="summary-card">
            <span className="summary-icon">★</span>
            <div><strong>4.8</strong><span>Customer rating</span></div>
          </div>
          <div className="summary-card">
            <span className="summary-icon">↗</span>
            <div><strong>{providerRequests.length}</strong><span>Total requests</span></div>
          </div>
        </section>

        <section className="provider-requests-section">
          <div className="section-heading request-section-heading">
            <div>
              <p>WORK QUEUE</p>
              <h2>Service requests</h2>
            </div>
            <div className="request-filters" role="group" aria-label="Filter requests">
              {["All", "Pending", "Accepted", "Rejected"].map((option) => (
                <button
                  className={filter === option ? "filter-active" : ""}
                  key={option}
                  onClick={() => setFilter(option)}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          {visibleRequests.length > 0 ? (
            <div className="provider-request-grid">
              {visibleRequests.map((request) => (
                <article className="service-card request-card provider-request-card" key={request._id}>
                  <div className="request-card-header">
                    <div>
                      <p className="eyebrow">SERVICE REQUEST</p>
                      <h3>{request.service}</h3>
                    </div>
                    <span className={`status-pill status-${request.status.toLowerCase()}`}>
                      {request.status}
                    </span>
                  </div>
                  <div className="request-info-row">
                    <span>⌖</span>
                    <div><small>Service location</small><strong>{request.location}</strong></div>
                  </div>
                  <div className="request-info-row">
                    <span>◷</span>
                    <div><small>Request ID</small><strong>#{String(request._id).slice(-6)}</strong></div>
                  </div>
                  {request.status === "Pending" && (
                    <div className="request-actions">
                      <button onClick={() => updateStatus(request._id, "Accepted")}>Accept request</button>
                      <button onClick={() => updateStatus(request._id, "Rejected")}>Decline</button>
                    </div>
                  )}
                </article>
              ))}
            </div>
          ) : (
            <div className="service-card dashboard-empty-state compact-empty">
              <span className="empty-state-icon">📬</span>
              <h3>{filter === "All" ? "Your queue is clear" : `No ${filter.toLowerCase()} requests`}</h3>
              <p>New customer requests will appear here when they are sent to you.</p>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default ProvidersDashboard;
