import { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import "../App.css";
import { apiRequest } from "../api";

function RequestService() {

  const navigate = useNavigate();
  const { name } = useParams();
  const [searchParams] = useSearchParams();

  const providerName = decodeURIComponent(name ?? "");
  const service = searchParams.get("service");
  const location = searchParams.get("location") || "Eluru";
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [preferences, setPreferences] = useState({
    date: "",
    time: "",
    notes: ""
  });

  useEffect(() => {
    const savedUser = localStorage.getItem("localfixUser");
    const user = savedUser ? JSON.parse(savedUser) : null;
    if (user?.role === "provider") {
      navigate("/providers-dashboard", { replace: true });
      return;
    }
    if (!user || user.role !== "customer" || !localStorage.getItem("localfixToken")) {
      navigate("/login", { state: { from: window.location.pathname + window.location.search } });
    }
  }, [navigate]);

  const handleRequest = () => {

    setIsSubmitting(true);
    setError("");
    apiRequest("/requests", {
      method: "POST",
      body: JSON.stringify({
        provider: providerName,
        service,
        location,
        preferredDate: preferences.date,
        preferredTime: preferences.time,
        notes: preferences.notes
      })
    })
      .then(() => navigate("/my-requests"))
      .catch((requestError) => setError(requestError.message))
      .finally(() => setIsSubmitting(false));
  };

  return (
    <div className="dashboard">

      <main className="dashboard-content">

        <div className="service-card request-confirmation">
          <p className="eyebrow">FINAL STEP</p>
          <h1>Confirm your request</h1>
          <p className="request-lead">Review the details below. The professional will respond to your request shortly.</p>
          <div className="confirmation-details">
            <div><span>Professional</span><strong>{providerName}</strong></div>
            <div><span>Service</span><strong>{service}</strong></div>
            <div><span>Location</span><strong>{location}</strong></div>
          </div>
          <div className="booking-preferences">
            <h3>Your preferences</h3>
            <p>Tell the provider when you would like the service and what help you need.</p>
            <div className="booking-preference-grid">
              <label>
                Preferred date
                <input
                  type="date"
                  value={preferences.date}
                  onChange={(event) => setPreferences({ ...preferences, date: event.target.value })}
                  required
                />
              </label>
              <label>
                Preferred time
                <input
                  type="time"
                  value={preferences.time}
                  onChange={(event) => setPreferences({ ...preferences, time: event.target.value })}
                  required
                />
              </label>
            </div>
            <label>
              Job notes
              <textarea
                value={preferences.notes}
                onChange={(event) => setPreferences({ ...preferences, notes: event.target.value })}
                placeholder="Describe the work you need..."
                rows="3"
              />
            </label>
          </div>
          {error && <p className="api-error">{error}. Start the backend and MongoDB before submitting.</p>}
          <button className="primary-action" onClick={handleRequest} disabled={isSubmitting}>
            {isSubmitting ? "Sending..." : "Confirm request"} {!isSubmitting && <span aria-hidden="true">→</span>}
          </button>
          <button className="secondary-action" onClick={() => navigate(-1)}>Go back</button>
        </div>

      </main>

    </div>
  );
}

export default RequestService;