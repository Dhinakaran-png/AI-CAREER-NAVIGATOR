import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { loginUser } from "../api/auth";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await loginUser(formData);

      if (data.token) {
        localStorage.setItem("token", data.token);

        if (data.user) {
          localStorage.setItem(
            "user",
            JSON.stringify(data.user)
          );
        }

        setMessage("Login successful");

        setTimeout(() => {
          navigate("/dashboard");
        }, 500);
      } else {
        setMessage(data.message || "Login failed");
      }

    } catch (error) {
      console.error("Login Error:", error);

      setMessage(
        error.response?.data?.message || "Login failed"
      );
    }
  };

  return (
    <div className="auth-shell">

      <div className="auth-card">

        <h1>
          Welcome Back
        </h1>

        <p>
          Login to AI Career Navigator
        </p>

        <form onSubmit={handleSubmit}>

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <button type="submit">
            Login
          </button>

        </form>

        {message && (
          <p className="message">
            {message}
          </p>
        )}

        <p>
          Don't have an account?{" "}

          <Link to="/signup">
            Signup
          </Link>
        </p>

      </div>

    </div>
  );
}

export default Login;