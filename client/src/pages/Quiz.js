import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import PORT_API from "./api/PortAPI";
import Security from "./security/Security";
import "./security/Security.css";

function Quiz() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60); // Waktu countdown dalam detik
  const [isAnswered, setIsAnswered] = useState(false);
  const nama_tim = localStorage.getItem("nama_tim");
  const navigate = useNavigate();
  Security();

  useEffect(() => {
    axios
      .get(PORT_API + "/current-session")
      .then((response) => {
        const session = response.data.session;
        if (session) {
          // Ambil pertanyaan berdasarkan sesi
          axios
            .get(`${PORT_API}/questions/${session}`)
            .then((response) => setQuestions(response.data))
            .catch((error) => console.error(error));
        } else {
          // Tangani kasus jika tidak ada sesi
          console.log("No active session found");
        }
      })
      .catch((error) => console.error(error));
  }, []);

  // Load currentQuestionIndex and timeLeft from localStorage on mount
  useEffect(() => {
    const savedQuestionIndex = localStorage.getItem("currentQuestion");
    const savedTimeLeft = localStorage.getItem("timeLeft");
    const savedScore = localStorage.getItem("score");
    const lastStartTime = localStorage.getItem("lastStartTime");

    if (savedQuestionIndex) {
      setCurrentQuestionIndex(parseInt(savedQuestionIndex));
    }

    if (savedTimeLeft) {
      setTimeLeft(parseInt(savedTimeLeft));
    }
    if (savedScore) {
      setScore(parseInt(savedScore - 500));
      localStorage.setItem("score", savedScore - 500);
    }
    if (savedTimeLeft && lastStartTime) {
      const timeElapsed = (Date.now() - parseInt(lastStartTime, 10)) / 1000;
      const newTimeLeft = parseInt(savedTimeLeft, 10) - timeElapsed;
      setTimeLeft(Math.max(newTimeLeft, 0)); // Ensure timeLeft is not negative
    }
  }, []);

  // Update localStorage whenever question index or time changes
  useEffect(() => {
    if (questions.length === 0) return; // Menunggu data pertanyaan

    setStartTime(Date.now());

    localStorage.setItem("currentQuestion", currentQuestionIndex);
    localStorage.setItem("timeLeft", timeLeft);
    localStorage.setItem("lastStartTime", Date.now());

    // Set up countdown
    const countdownInterval = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 0) {
          clearInterval(countdownInterval);
          handleAnswerSubmit(); // Panggil handleAnswerSubmit ketika waktu habis
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    // Cleanup interval on component unmount
    return () => clearInterval(countdownInterval);
  }, [currentQuestionIndex, questions, timeLeft]);

  const handleAnswerSubmit = () => {
    if (questions.length === 0) return; // Menunggu data pertanyaan

    const currentQuestion = questions[currentQuestionIndex];
    if (!currentQuestion) return; // Pastikan currentQuestion tidak undefined

    // Cek apakah jawaban benar
    const correctAnswer = currentQuestion.answer;

    const endTime = Date.now();
    const timeTaken = (endTime - startTime) / 1000; // Menghitung waktu dalam detik
    let points = 0;

    if (selectedAnswer === correctAnswer) {
      points = 6000 - Math.floor(timeTaken * 100);
      if (points < 0) {
        points = 0; // Pastikan poin tidak negatif
      }
    }

    setScore((prevScore) => prevScore + points);
    setIsAnswered(true);

    if (currentQuestionIndex < questions.length - 1) {
      if (timeLeft <= 0) {
        setSelectedAnswer(null);
        setIsAnswered(false); // Reset state isAnswered untuk soal berikutnya
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setStartTime(Date.now()); // Reset waktu untuk soal berikutnya
        setTimeLeft(60); // Reset countdown untuk soal berikutnya
        localStorage.setItem("score", score + points);
      }
    } else {
      navigate("/82276690-c57d-4fa7-8180-2bca4968564b");
      localStorage.setItem("score", score + points);
      localStorage.setItem("getAllPoints", "true");
      localStorage.setItem("answerAll", "true");
    }
  };

  // Auto di Diskualifikasi
  useEffect(() => {
    // Periksa nilai 'getAllPoints' dalam localStorage
    if (localStorage.getItem("getAllPoints") === "false") {
      const handleVisibilityChange = () => {
        if (document.visibilityState === "hidden") {
          navigate("/82276690-c57d-4fa7-8180-2bca4968564b");
        }
      };

      document.addEventListener("visibilitychange", handleVisibilityChange);
      return () => {
        document.removeEventListener(
          "visibilitychange",
          handleVisibilityChange
        );
      };
    }
  }, [navigate]);

  useEffect(() => {
    if (timeLeft <= 0) {
      handleAnswerSubmit(); // Submit jawaban jika waktu habis
    }
  }, [timeLeft, selectedAnswer]);
  useEffect(() => {
    if (selectedAnswer !== null) {
      handleAnswerSubmit();
    }
  }, [selectedAnswer]);

  if (questions.length === 0) {
    return <div>Loading...</div>;
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="p-6 max-w-lg mx-auto bg-white shadow-md rounded-lg">
      <span className="text-xl font-semibold text-primary">
        Nama Tim :
        <br />
        {nama_tim}
      </span>
      <div className="p-6 border border-sage-300 rounded-lg bg-white mb-6 shadow-sm">
        <h3 className="text-xl font-semibold text-sage-700 mb-4">
          {currentQuestion.question}
        </h3>
        <div className="grid grid-cols-1 gap-2">
          {[
            currentQuestion.option1,
            currentQuestion.option2,
            currentQuestion.option3,
            currentQuestion.option4,
          ].map((option, index) => (
            <button
              key={index}
              onClick={() => setSelectedAnswer(option)}
              disabled={isAnswered}
              className={
                "w-full text-left py-3 px-4 rounded-lg mb-2 bg-sage-400 text-white"
              }
            >
              {option}
            </button>
          ))}
        </div>
      </div>
      <div className="flex justify-between text-lg font-semibold">
        <p className="text-sage-700">Current Score: {score}</p>
        <p className="text-red-500 font-bold">
          Time Left: {Math.round(timeLeft)}s
        </p>
      </div>
    </div>
  );
}

export default Quiz;
