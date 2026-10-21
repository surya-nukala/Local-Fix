import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate
} from "react-router-dom";

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


function Home() {
  const navigate = useNavigate();

  return (
    <div className="app">

      {/* Navbar */}
      <nav className="navbar">

        <img src={logo} alt="LocalFix Logo" className="site-logo" />

        <div className="nav-links">

          <a href="#">Home</a>
          <a href="#">Services</a>
          <a href="#">Providers</a>
          <a href="#">About</a>
          <a href="#">Contact</a>

          <button onClick={() => navigate("/profile")}>
            Profile
          </button>

          <button onClick={() => navigate("/login")}>
            Login
          </button>

          <button onClick={() => navigate("/provider-login")}>
            Provider Login
          </button>

          <button onClick={() => navigate("/register")}>
            Register
          </button>

        </div>

      </nav>


      {/* Home Content */}
      <main className="app-content">

        <section className="hero">

          <h1>
            Find Trusted Local Services
          </h1>

          <p>
            Connect with reliable service providers nearby.
          </p>

          <div className="search-box">

            <input
              type="text"
              placeholder="Enter your service name"
            />

            <button>
              Search
            </button>

          </div>

        </section>


        {/* Popular Services */}
        <section className="services-offered">

          <h2>Mostly Used</h2>

          <div className="service-container">

            <div className="service-card">
              <h3>Electrician</h3>
              <p>
                Find electricians for your electrical needs.
              </p>
            </div>

            <div className="service-card">
              <h3>Plumber</h3>
              <p>
                Connect with local plumbing professionals.
              </p>
            </div>

            <div className="service-card">
              <h3>AC Repair</h3>
              <p>
                Find professionals for AC servicing and repair.
              </p>
            </div>

            <div className="service-card">
              <h3>Home Cleaning</h3>
              <p>
                Find trusted professionals for home cleaning.
              </p>
            </div>

          </div>

        </section>

      </main>

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