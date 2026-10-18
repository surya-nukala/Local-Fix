import { useNavigate, useParams } from "react-router-dom";
import "../App.css";

function Providers() {

  const navigate = useNavigate();

  // Get the service name from the URL
  const { service } = useParams();

  // Provider data
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

  // Filter providers according to selected service
  const filteredProviders = providers.filter(
    (provider) => provider.service === service
  );

  // Convert URL name into readable service name
  let serviceName = service;

  if (service === "ac-repair") {
    serviceName = "AC Repair";
  }
  else if (service === "home-cleaning") {
    serviceName = "Home Cleaning";
  }
  else if (service === "electrician") {
    serviceName = "Electrician";
  }
  else if (service === "plumber") {
    serviceName = "Plumber";
  }

  return (
    <div className="dashboard">

      {/* Navigation bar */}
      <nav className="dashboard-navbar">

        <h2 className="logo">
          Local<span>Fix</span>
        </h2>

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

      {/* Provider section */}
      <main className="dashboard-content">

        <h1>{serviceName} Providers</h1>

        <p>
          Find trusted {serviceName} professionals near you.
        </p>

        <div className="service-container">

          {filteredProviders.length > 0 ? (

            filteredProviders.map((provider) => (

              <div className="service-card" key={provider.name}>

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
                  onClick={() => navigate("/provider-profile")}
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