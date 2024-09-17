import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Security from "./security/Security";
import "./security/Security.css";

function IndexAdmin() {
  const [nama_tim, setnama_tim] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  Security();

  const handleLogin = () => {
    localStorage.setItem("nama_tim", nama_tim);
    localStorage.setItem("password", password);
    if (nama_tim === "admin" && password === "Damar-X-ISC@2024") {
      localStorage.setItem("admin", "true");
      localStorage.setItem("full_access", "true");
      navigate("/bed56435-7544-417a-991e-caf2ed848307"); // Arahkan ke halaman Admin
    } else {
      navigate("/"); // Arahkan ke halaman Index
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white shadow-lg rounded-lg text-center">
      <h1 className="text-3xl font-bold text-sage-700 mb-4">
        Welcome to Saloot App
      </h1>
      <p className="text-sage-600 mb-6">Inspired by Kahoot App</p>
      <h2 className="text-xl font-semibold mb-4">Login</h2>
      <form onSubmit={handleLogin} className="space-y-4">
        <input
          type="text"
          value={nama_tim}
          onChange={(e) => setnama_tim(e.target.value)}
          placeholder="Nama Tim*"
          className="w-full border border-sage-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-sage-500"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password*"
          className="w-full border border-sage-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-sage-500"
          required
        />
        <div className="mt-6 flex justify-center">
          <button
            type="submit"
            className="w-full mx-2 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-150 ease-in-out"
          >
            Login
          </button>
          <a
            href="/"
            className="w-full mx-2 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-150 ease-in-out"
          >
            User Login
          </a>
        </div>
      </form>
    </div>
  );
}

export default IndexAdmin;
