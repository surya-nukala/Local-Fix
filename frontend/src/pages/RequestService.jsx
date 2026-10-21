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

        <div className="service-card">

          <h1>Send Service Request</h1>

          <p>
            <strong>Provider:</strong> {providerName}
          </p>

          <p>
            <strong>Service:</strong> {service}
          </p>

          <p>
            <strong>Location:</strong> Eluru
          </p>

          <p>
            Please confirm your request for this service provider.
          </p>

          <button onClick={handleRequest}>
            Confirm Request
          </button>

          <br />
          <br />

          <button onClick={() => navigate(-1)}>
            Back
          </button>

        </div>

      </main>

    </div>
  );
}

export default RequestService;