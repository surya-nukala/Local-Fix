import { useState } from "react";
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

  const handleRequest = () => {

    setIsSubmitting(true);
    setError("");
    apiRequest("/requests", {
      method: "POST",
      body: JSON.stringify({ provider: providerName, service, location })
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