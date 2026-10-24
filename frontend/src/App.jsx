import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate
} from "react-router-dom";
import { useState } from "react";

import Login from "./pages/login";
import Register from "./pages/register";
import CustomerDashboard from "./pages/CustomerDashboard";
import MyRequests from "./pages/MyRequests";
import Profile from "./pages/Profile";
import Providers from "./pages/Providers";
import logo from "./assets/logo_img.png";
import ProviderProfile from "./pages/ProviderDetails";
import RequestService from "./pages/RequestService";
import ProvidersDashboard from "./pages/ProvidersDashboard";
import ProviderLogin from "./pages/ProviderLogin";
import "./App.css";

const services = [
  { slug: "electrician", icon: "⚡", name: "Electrician", description: "Repairs & installations" },
  { slug: "plumber", icon: "🔧", name: "Plumbing", description: "Fix leaks & fittings" },
  { slug: "ac-repair", icon: "❄️", name: "AC & Appliance", description: "Service & maintenance" },
  { slug: "home-cleaning", icon: "🧹", name: "Home Cleaning", description: "Clean & comfortable home" },
  { slug: "carpenter", icon: "🪚", name: "Carpentry", description: "Furniture & woodwork" },
  { slug: "painting", icon: "🎨", name: "Painting", description: "Fresh walls, beautiful spaces" },
  { slug: "pest-control", icon: "🛡️", name: "Pest Control", description: "Safe, effective protection" },
  { slug: "salon", icon: "✂️", name: "Salon at Home", description: "Beauty and wellness" }
];

function Home() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const searchServices = (event) => {
    event.preventDefault();
    const normalizedSearch = searchTerm.trim().toLowerCase();
    const matchingService = normalizedSearch
      ? services.find((service) =>
        `${service.name} ${service.slug}`.toLowerCase().includes(normalizedSearch)
      )
      : null;

    navigate(
      matchingService
        ? `/providers/${matchingService.slug}`
        : "/customer-dashboard"
    );
  };

  return (
    <div className="home-page">

      <div className="home-announcement">
        <span>Local services, made simple</span>
        <span>Trusted professionals · Easy booking · Nearby support</span>
      </div>

      <nav className="home-navbar">

        <div className="brand">
          <img src={logo} alt="LocalFix Logo" />
          <span>LocalFix</span>
        </div>

        <div className="home-location">
          <span className="location-pin">⌖</span>
          <div>
            <small>Service location</small>
            <strong>Eluru, Andhra Pradesh</strong>
          </div>
        </div>

        <div className="home-links">
          <button onClick={() => navigate("/customer-dashboard")}>
            Explore services
          </button>

          <button onClick={() => navigate("/provider-login")}>
            For Providers
          </button>

          <button onClick={() => navigate("/login")}>
            Login
          </button>

          <button
            className="register-btn"
            onClick={() => navigate("/register")}
          >
            Get Started
          </button>
        </div>

      </nav>

      {/* Hero Section */}
      <section className="hero-section">

        <div className="hero-content">

          <div className="hero-kicker"><span>✦</span> Everyday services, thoughtfully delivered</div>

          <h1>
            Your home.
            <br />
            <em>Our expertise.</em>
          </h1>

          <p className="hero-text">
            From quick fixes to complete home care, book reliable local
            professionals who treat your space like their own.
          </p>

          <form className="hero-search" onSubmit={searchServices}>
            <span aria-hidden="true">⌕</span>
            <input
              type="text"
              placeholder="What service do you need today?"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              aria-label="Search for a service"
            />

            <button type="submit">
              Search
            </button>

          </form>

          <div className="quick-services">

            <span>Popular near you</span>

            {services.slice(0, 3).map((service) => (
              <button
                key={service.slug}
                onClick={() => navigate(`/providers/${service.slug}`)}
              >
                {service.icon} {service.name}
              </button>
            ))}

          </div>

        </div>

        <div className="hero-visual">

          <div className="hero-card main-card">

            <div className="hero-card-label"><span className="live-dot" /> AVAILABLE NEAR YOU</div>
            <div className="card-icon">🔧</div>

            <h3>
              Trusted hands, right at home
            </h3>

            <p>
              Connect with skilled professionals
              in your area.
            </p>

            <div className="mini-provider">

              <div className="provider-avatar">
                R
              </div>

              <div>
                <strong>
                  Ravi Electrical Services
                </strong>

                <small>
                  ⭐ 4.8 · Eluru
                </small>
              </div>

              <span className="verified">
                ✓
              </span>

            </div>

          </div>

          <div className="floating-card location-card">
            📍
            <div>
              <strong>Local & Nearby</strong>
              <small>Professionals around you</small>
            </div>
          </div>

          <div className="floating-card trust-card">
            ✓
            <div>
              <strong>Verified</strong>
              <small>Trusted providers</small>
            </div>
          </div>

        </div>

      </section>

      <section className="trust-strip">
        <div><strong>4.8<span>★</span></strong><small>Average rating</small></div>
        <div><strong>100%</strong><small>Verified providers</small></div>
        <div><strong>24/7</strong><small>Local support</small></div>
        <div><strong>10+</strong><small>Service categories</small></div>
      </section>

      {/* Services */}
      <section className="services-section">

        <div className="section-heading">

          <div>
            <p>EXPLORE LOCALFIX</p>
            <h2>Services for every corner of your home</h2>
          </div>

          <button
            onClick={() =>
              navigate("/customer-dashboard")
            }
          >
            View all →
          </button>

        </div>

        <div className="service-grid">

          {services.map((service) => (
            <button
              className="service-box"
              key={service.slug}
              onClick={() => navigate(`/providers/${service.slug}`)}
            >
              <span className="service-icon" aria-hidden="true">{service.icon}</span>
              <h3>{service.name}</h3>
              <p>{service.description}</p>
              <span className="service-arrow" aria-hidden="true">→</span>
            </button>
          ))}

        </div>

      </section>

      {/* Why LocalFix */}
      <section className="why-section">

        <div className="why-content">

          <p>WHY LOCALFIX</p>

          <h2>
            Local service,
            <br />
            built on trust.
          </h2>

          <p>
            We make it easier to discover reliable
            professionals in your neighbourhood.
          </p>

        </div>

        <div className="why-features">

          <div>
            <span>✓</span>
            <h3>Verified Professionals</h3>
            <p>
              Connect with trusted local service providers.
            </p>
          </div>

          <div>
            <span>📍</span>
            <h3>Nearby Services</h3>
            <p>
              Find professionals available in your locality.
            </p>
          </div>

          <div>
            <span>⚡</span>
            <h3>Quick Requests</h3>
            <p>
              Send a service request in just a few clicks.
            </p>
          </div>

        </div>

      </section>

      {/* Footer */}
      <footer className="home-footer">

        <div className="brand">
          <img src={logo} alt="LocalFix Logo" />
          <span>LocalFix</span>
        </div>

        <p>
          Reliable help from your local community.
        </p>

      </footer>

    </div>
  );
}
function App() {

  return (
    <BrowserRouter>

      <Routes>

        {/* Home */}
        <Route
          path="/"
          element={<Home />}
        />

        {/* Authentication */}
        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        {/* Customer Dashboard */}
        <Route
          path="/customer-dashboard"
          element={<CustomerDashboard />}
        />

        {/* Customer Pages */}
        <Route
          path="/my-requests"
          element={<MyRequests />}
        />

        <Route
          path="/profile"
          element={<Profile />}
        />
        <Route
          path="/provider-profile/:name"
          element={<ProviderProfile />}
        />

        <Route
          path="/providers/:service"
          element={<Providers />}
        />
        <Route
          path="/request-service/:name"
          element={<RequestService />}
        />
        <Route
          path="/providers-dashboard"
          element={<ProvidersDashboard/>}
        />
        <Route
          path="/provider-login"
          element={<ProviderLogin/>}
        />
      </Routes>

    </BrowserRouter>
  );
}


export default App;