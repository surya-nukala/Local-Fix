import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import Login from "./pages/login";
import Register from "./pages/register";
import "./App.css";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="app">
      <nav className="navbar">
        <h2 className="logo">
          Local<span>Fix</span>
        </h2>

        <div className="nav-links">
          <a href="#">Home</a>
          <a href="#">Services</a>
          <a href="#">Providers</a>
          <a href="#">About</a>
          <a href="#">Contact</a>

          <button onClick={() => navigate("/login")}>
            Login
          </button>

          <button onClick={() => navigate("/register")}>
            Register
          </button>
        </div>
      </nav>

      <main className="app-content">
        <section className="hero">
          <h1>Find Trusted Local Services</h1>

          <p>
            Connect with reliable service providers nearby.
          </p>

          <div className="search-box">
            <input
              type="text"
              placeholder="Enter your service name"
            />

            <button>Search</button>
          </div>
        </section>

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

        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;