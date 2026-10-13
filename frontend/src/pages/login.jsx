import { useNavigate } from "react-router-dom";
import "../App.css";

function Login() {
  const navigate = useNavigate();

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1>Welcome Back</h1>
        <p>Login to your LocalFix account</p>
        <form>
          <input
            type="email"
            placeholder="Enter your email"/>
          <input
            type="password"
            placeholder="Enter your password"/>
          <button type="submit">
            Login
          </button>
        </form>
        <p className="auth-switch">
          Don't have an account?
          <button onClick={() => navigate("/register")}>
            Register
          </button>
        </p>

      </div>

    </div>
  );
}

export default Login;