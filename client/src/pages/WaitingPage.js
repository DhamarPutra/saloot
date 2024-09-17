import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import PORT_API from "./api/PortAPI";
import Security from "./security/Security";
import "./security/Security.css";

function WaitingPage() {
  const navigate = useNavigate();
  const nama_tim = localStorage.getItem("nama_tim");
  Security();

  useEffect(() => {
    const checkQuizStatus = () => {
      axios
        .get(PORT_API + "/quiz-status")
        .then((response) => {
          const joinable = localStorage.getItem("quiz");
          if (response.data.isQuizStarted && joinable === "joinable") {
            navigate("/1c307e20-8dbd-4f8d-968c-a9968d751834"); // Arahkan ke halaman kuis jika kuis dimulai
          }
        })
        .catch((error) => console.error("Error fetching quiz status:", error));
    };

    const intervalId = setInterval(checkQuizStatus, 1000); // Cek status setiap detik

    // Cleanup function untuk menghapus interval saat komponen di-unmount
    return () => clearInterval(intervalId);
  }, [navigate]);

  return (
    <div className="p-4 max-w-md mx-auto bg-white shadow-lg rounded-lg flex items-center justify-center">
      <div className="text-center p-4">
        <span className="text-xl font-semibold text-primary">
          Nama Tim :
          <br />
          {nama_tim}
        </span>
        {/* <img
          src={waitingGif}
          alt="Loading animation"
          className="w-full h-auto max-w-sm mx-auto mt-3"
        /> */}
        <span className="loader text-primary"></span>
        <span className="loader2 text-primary mt-4"></span>
      </div>
    </div>
  );
}

export default WaitingPage;
