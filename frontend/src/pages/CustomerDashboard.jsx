import { useNavigate } from "react-router-dom";
import "../App.css";
import logo from "../assets/logo_img.png";

const services = [
  ["electrician", "⚡", "Electrician", "Repairs & installations"],
  ["plumber", "🔧", "Plumbing", "Fix leaks & fittings"],
  ["ac-repair", "❄️", "AC & Appliance", "Service & maintenance"],
  ["home-cleaning", "🧹", "Home Cleaning", "A spotless home, every time"],
  ["carpenter", "🪚", "Carpentry", "Furniture & woodwork"],
  ["painting", "🎨", "Painting", "Fresh walls, beautiful spaces"],
  ["pest-control", "🛡️", "Pest Control", "Safe, effective protection"],
  ["salon", "✂️", "Salon at Home", "Beauty and wellness"]
];

function DashboardNav({ navigate }) {
  return (
    <nav className="dashboard-navbar">
      <button className="dashboard-brand" onClick={() => navigate("/")}>
        <img src={logo} alt="LocalFix Logo" />
        <span>LocalFix</span>
      </button>
      <div className="dashboard-links">
        <button onClick={() => navigate("/customer-dashboard")}>Services</button>
        <button onClick={() => navigate("/my-requests")}>My Requests</button>
        <button onClick={() => navigate("/profile")}>Profile</button>
        <button className="nav-logout" onClick={() => navigate("/")}>Log out</button>
      </div>
    </nav>
  );
}

function CustomerDashboard() {
  const navigate = useNavigate();

  return (
    <div className="dashboard">
      <DashboardNav navigate={navigate} />
      <main className="dashboard-content">
        <div className="dashboard-intro">
          <div>
            <p className="eyebrow">CUSTOMER DASHBOARD</p>
            <h1>What can we help you with?</h1>
            <p>Book trusted local professionals for your everyday needs.</p>
          </div>
          <div className="dashboard-stat">
            <strong>4.8/5</strong>
            <span>Average provider rating</span>
          </div>
        </div>
        <div className="service-container">
          {services.map(([slug, icon, name, description]) => (
            <article className="service-card dashboard-service-card" key={slug}>
              <span className="service-icon" aria-hidden="true">{icon}</span>
              <h3>{name}</h3>
              <p>{description}</p>
              <button onClick={() => navigate(`/providers/${slug}`)}>
                View providers <span aria-hidden="true">→</span>
              </button>
            </article>
          ))}
        </div>
      </main>
    </div>
  );
}

export { DashboardNav };
export default CustomerDashboard;
