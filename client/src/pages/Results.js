import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import PORT_API from "./api/PortAPI";
import Security from "./security/Security";

function Results() {
  const answerAll = localStorage.getItem("answerAll");
  const [score, setScore] = useState("");
  const navigate = useNavigate();
  const nama_tim = localStorage.getItem("nama_tim");
  Security();

  useEffect(() => {
    // Function to check quiz status
    const checkQuizStatus = () => {
      axios
        .get(PORT_API + "/quiz-status")
        .then((response) => {
          if (!response.data.isQuizStarted) {
            navigate("/"); // Arahkan ke halaman login jika kuis selesai
          } else {
            navigate("/82276690-c57d-4fa7-8180-2bca4968564b");
          }
        })
        .catch((error) => console.error("Error fetching quiz status:", error));
    };

    // Function to submit score to database
    const handleSubmitToDatabase = () => {
      if (answerAll === "true") {
        setScore(localStorage.getItem("score"));
      } else {
        setScore(localStorage.setItem("score", 0));
        setScore(localStorage.getItem("score"));
      }
      const totalScore = score; // Gunakan skor yang diterima dari state

      axios
        .post(PORT_API + "/save-score", {
          nama_tim: nama_tim,
          score: totalScore,
        })
        .then((response) => {
          console.log("Score successfully saved:", response.data);
        })
        .catch((error) => {
          console.error("Error saving score:", error);
        });
    };

    // Call handleSubmitToDatabase once when component mounts
    handleSubmitToDatabase();

    // Set up interval to check quiz status every second
    const intervalId = setInterval(checkQuizStatus, 1000);

    // Cleanup function to clear interval when component unmounts
    return () => clearInterval(intervalId);
  }, [navigate, score, nama_tim]);

  const getWarningMessage = () => {
    if (score === "0") {
      return <div className="fw-bold text-danger">Mau curang ya...!!!</div>;
    }
    return null;
  };

  return (
    <div className="wrapper result text-xl">
      <span className="text-xl font-semibold text-primary">
        Nama Tim :
        <br />
        {nama_tim}
      </span>
      <p className="d-flex align-items-center justify-content-center mt-3 mb-3 text-primary text-xl">
        Your final score is :{" "}
        <span className="fw-bold score">&nbsp;{score}</span>
      </p>
      {getWarningMessage()}
      <p className="d-flex align-items-center justify-content-center mt-3 mb-3 text-primary text-xl">
        You may now exit the page.
      </p>
    </div>
  );
}

export default Results;
