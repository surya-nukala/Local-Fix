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

        <p className="eyebrow">PROVIDER PROFILE</p>

        {provider ? (
          <div className="profile-card provider-profile-card">
            <div className="profile-hero">
              <div className="profile-avatar">{provider.name.charAt(0)}</div>
              <div>
                <h1>{provider.name}</h1>
                <p className="provider-rating">★ 4.8 <span>· Highly rated local professional</span></p>
              </div>
              <span className="verified-badge">✓ Verified</span>
            </div>
            <div className="profile-details">
              <div><span>Service</span><strong>{provider.service}</strong></div>
              <div><span>Experience</span><strong>{provider.experience}</strong></div>
              <div><span>Location</span><strong>{provider.location}</strong></div>
            </div>
            <div className="profile-about">
              <h3>About this professional</h3>
              <p>Reliable local service with transparent communication and quality workmanship.</p>
            </div>

            <button
              className="primary-action"
              onClick={() =>
                navigate(
                  `/request-service/${encodeURIComponent(provider.name)}?service=${encodeURIComponent(provider.service)}`
                  + `&location=${encodeURIComponent(provider.location)}`
                )
              }
            >
              Request this service <span aria-hidden="true">→</span>
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