import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import PORT_API from "./api/PortAPI";
import Security from "./security/Security";
import "./security/Security.css";
import iscLogo from "./assets/image/logo.png";

function Index() {
  const [nama_tim, setnama_tim] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  Security();

  // Reset login session
  const resetnama_tim = localStorage.getItem("nama_tim"); // Ambil nama_tim dari localStorage
  localStorage.clear();
  if (resetnama_tim) {
    axios
      .post(PORT_API + "/users/resetLogin", { resetnama_tim }) // Kirim nama_tim ke server
      .then((response) => {
        console.log(response.data.message);
      })
      .catch((error) => {
        console.error("Error resetting login:", error);
      });
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(PORT_API + "/users/login", {
        nama_tim: nama_tim.toUpperCase(),
      });
      if (response.data.success) {
        localStorage.setItem("nama_tim", nama_tim.toUpperCase());
        localStorage.setItem("quiz", "joinable");
        localStorage.setItem("getAllPoints", "false");
        localStorage.setItem("answerAll", "false");
        navigate("/3a59ebd6-e207-4510-b13d-f300922f8237"); // Arahkan ke halaman waiting
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      console.error("Error login:", error);
      setError("Terjadi kesalahan");
    }
  };

  return (
    <div className="wrapper">
      <div class="logo">
        <img width="64" height="64" src={iscLogo} alt="login-rounded-right" />
      </div>
      <div className="text-center mt-4 name text-primary fs-4 fw-bold text-border">
        Welcome to Saloot App
      </div>
      <p className="text-center fw-light fs-6 text-primary">
        Inspired by Kahoot App
      </p>
      <form onSubmit={handleLogin} className="p-3 mt-3">
        <div className="form-field d-flex align-items-center">
          <span class="far fa-user"></span>
          <input
            type="text"
            value={nama_tim}
            onChange={(e) => setnama_tim(e.target.value)}
            placeholder="Nama Tim*"
            required
          />
        </div>
        <button type="submit" className="btn mt-3">
          Login
        </button>
        <a href="/fc6151ce-6515-4556-a132-4002a241659f">
          <span className="btn mt-3">Admin Login</span>
        </a>
        {error && <p className="text-red-500 text-center mt-2">{error}</p>}
      </form>
    </div>
  );
}

export default Index;
