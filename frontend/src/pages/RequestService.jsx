import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import "../App.css";

function RequestService() {

  const navigate = useNavigate();
  const { name } = useParams();
  const [searchParams] = useSearchParams();

  const providerName = decodeURIComponent(name);
  const service = searchParams.get("service");

  const handleRequest = () => {

    const newRequest = {
      id: Date.now(),
      provider: providerName,
      service: service,
      location: "Eluru",
      status: "Pending"
    };

    const savedRequests = localStorage.getItem("serviceRequests");

    const requests = savedRequests
      ? JSON.parse(savedRequests)
      : [];

    requests.push(newRequest);

    localStorage.setItem(
      "serviceRequests",
      JSON.stringify(requests)
    );

    alert("Service request sent successfully!");

    navigate("/my-requests");
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
            <div><span>Location</span><strong>Eluru</strong></div>
          </div>
          <button className="primary-action" onClick={handleRequest}>
            Confirm request <span aria-hidden="true">→</span>
          </button>
          <button className="secondary-action" onClick={() => navigate(-1)}>Go back</button>
        </div>

      </main>

    </div>
  );
}

export default RequestService;