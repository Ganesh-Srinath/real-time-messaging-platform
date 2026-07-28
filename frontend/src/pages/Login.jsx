import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../services/authService.js";

function Login() {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleLogin() {
    try {
      await login(identifier, password);

      console.log("Login Successful");
      navigate("/dashboard");
    } catch (error) {
      console.error(error.response?.data || error.message);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200">
      <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="text-3xl font-bold text-center">
            Login
          </h2>

          <input
            type="text"
            placeholder="Username or Email"
            className="input input-bordered w-full"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="input input-bordered w-full"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            className="btn btn-primary w-full"
            onClick={handleLogin}
          >
            Login
          </button>

          <p>
            Don't have an account?{" "}
            <Link to="/register">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;