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
    },
    {
      name: "WoodCraft Carpentry",
      service: "carpenter",
      experience: "9 years",
      location: "Eluru"
    },
    {
      name: "ColourNest Painters",
      service: "painting",
      experience: "7 years",
      location: "Eluru"
    },
    {
      name: "Shield Pest Solutions",
      service: "pest-control",
      experience: "5 years",
      location: "Eluru"
    },
    {
      name: "GlowUp Home Salon",
      service: "salon",
      experience: "6 years",
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
  else if (service === "home-cleaning") serviceName = "Home Cleaning";
  else if (service === "carpenter") serviceName = "Carpentry";
  else if (service === "painting") serviceName = "Painting";
  else if (service === "pest-control") serviceName = "Pest Control";
  else if (service === "salon") serviceName = "Salon at Home";

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

        <div className="listing-header">
          <div>
            <p className="eyebrow">LOCALFIX MARKETPLACE</p>
            <h1>{serviceName} providers</h1>
            <p>Professionals near you, verified for quality and reliability.</p>
          </div>
          <span className="result-count">{filteredProviders.length} providers</span>
        </div>

        <div className="service-container">

          {filteredProviders.length > 0 ? (

            filteredProviders.map((provider) => (

              <article className="service-card provider-card" key={provider.name}>
                <div className="provider-card-top">
                  <div className="provider-avatar">{provider.name.charAt(0)}</div>
                  <span className="verified-badge">✓ Verified</span>
                </div>
                <h3>{provider.name}</h3>
                <p className="provider-rating">★ 4.8 <span>· 24 reviews</span></p>
                <p className="provider-meta">● {provider.location} &nbsp; · &nbsp; {provider.experience} experience</p>

                <button
                  onClick={() =>
                    navigate(
                      `/provider-profile/${encodeURIComponent(provider.name)}`
                    )
                  }
                >View profile <span aria-hidden="true">→</span></button>
              </article>

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