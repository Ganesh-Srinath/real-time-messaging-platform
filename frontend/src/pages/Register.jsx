import { useState } from "react";
import { register } from "../services/authService.js";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleRegister() {
    try {
      await register(
        username,
        email,
        password
      );

      navigate("/");
    } catch (error) {
      console.error(
        error.response?.data ||
        error.message
      );
    }
  }


  return (
    <div>
      <input
        type="text"
        placeholder="Username"
        className="input input-bordered w-full"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <input
        type="email"
        placeholder="Email"
        className="input input-bordered w-full"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
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
        onClick={handleRegister}
      >
        Register
      </button>

      <p>
        Already have an account? {" "}
        <Link to="/">
          Login
        </Link>
      </p>
    </div>
  );
}

export default Register;