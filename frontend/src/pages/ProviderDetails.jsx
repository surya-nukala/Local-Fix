import { useNavigate, useParams } from "react-router-dom";
import "../App.css";
import logo from "../assets/logo_img.png";

function ProviderDetails() {

  const navigate = useNavigate();

  // Get provider name from URL
  const { name } = useParams();

  // Provider details
  const providers = [
    {
      name: "Ravi Electrical Services",
      service: "electrician",
      experience: "5 years",
      location: "Eluru"
    },
    {
      name: "Venkat Electrical Works",
      service: "electrician",
      experience: "8 years",
      location: "Eluru"
    },
    {
      name: "Suresh Plumbing Services",
      service: "plumber",
      experience: "7 years",
      location: "Eluru"
    },
    {
      name: "Ramesh Plumbing Works",
      service: "plumber",
      experience: "4 years",
      location: "Eluru"
    },
    {
      name: "CoolCare Services",
      service: "ac-repair",
      experience: "4 years",
      location: "Eluru"
    },
    {
      name: "Sri AC Solutions",
      service: "ac-repair",
      experience: "6 years",
      location: "Eluru"
    },
    {
      name: "CleanPro Services",
      service: "home-cleaning",
      experience: "6 years",
      location: "Eluru"
    },
    {
      name: "HomeCare Experts",
      service: "home-cleaning",
      experience: "3 years",
      location: "Eluru"
    }
  ];

  const provider = providers.find(
    (candidate) => candidate.name === decodeURIComponent(name ?? "")
  );

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

        <h1>{provider ? provider.name : "Provider Not Found"}</h1>

        {provider ? (
          <div className="profile-card">

            <h3>{provider.name}</h3>

            <p>Service: {provider.service}</p>
            <p>Experience: {provider.experience}</p>
            <p>Location: {provider.location}</p>

            <button
              onClick={() =>
                navigate(
                  `/request-service/${encodeURIComponent(provider.name)}?service=${encodeURIComponent(provider.service)}`
                )
              }
            >
              Send Service Request
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