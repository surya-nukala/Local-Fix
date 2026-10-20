import { useNavigate, useParams } from "react-router-dom";
import "../App.css";
import logo from "../assets/logo_img.png";

function Providers() {

  const navigate = useNavigate();

  // Get selected service from URL
  const { service } = useParams();

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

  // Show only providers for selected service
  const filteredProviders = providers.filter(
    (provider) => provider.service === service
  );

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
  else if (service === "home-cleaning") {
    serviceName = "Home Cleaning";
  }

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

        <h1>{serviceName} Providers</h1>

        <p>
          Find trusted {serviceName} professionals near you.
        </p>

        <div className="service-container">

          {filteredProviders.length > 0 ? (

            filteredProviders.map((provider) => (

              <div
                className="service-card"
                key={provider.name}
              >

                <h3>{provider.name}</h3>

                <p>
                  Service: {serviceName}
                </p>

                <p>
                  Experience: {provider.experience}
                </p>

                <p>
                  Location: {provider.location}
                </p>

                <button
                  onClick={() =>
                    navigate(
                      `/provider-profile/${encodeURIComponent(provider.name)}`
                    )
                  }
                >
                  View Profile
                </button>

              </div>

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