import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import "../App.css";

function RequestService() {

  const navigate = useNavigate();
  const { name } = useParams();
  const [searchParams] = useSearchParams();

  const providerName = decodeURIComponent(name);
  const service = searchParams.get("service");

  const handleRequest = () => {

    const request = {
      provider: providerName,
      service: service,
      status: "Pending"
    };

    let savedRequests = [];

    try {
      const storedRequests = JSON.parse(
        localStorage.getItem("serviceRequests") || "[]"
      );
      savedRequests = Array.isArray(storedRequests) ? storedRequests : [];
    } catch {
      savedRequests = [];
    }

    localStorage.setItem(
      "serviceRequests",
      JSON.stringify([...savedRequests, request])
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