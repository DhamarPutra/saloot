import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import PORT_API from "./api/PortAPI";
import Security from "./security/Security";
import './security/Security.css';

function ImgQuiz() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60); // Waktu countdown dalam detik
  const [isAnswered, setIsAnswered] = useState(false);
  const navigate = useNavigate();
  Security();

  useEffect(() => {
    axios
      .get(PORT_API + "/quiz-status")
      .then((response) => {
        if (!response.data.isQuizStarted) {
          navigate("/3a59ebd6-e207-4510-b13d-f300922f8237"); // Redirect ke waiting jika kuis belum dimulai
        } else {
          axios
            .get(PORT_API + "/questions_img")
            .then((response) => setQuestions(response.data))
            .catch((error) => console.error(error));
        }
      })
      .catch((error) => console.error(error));
  }, [navigate]);

  useEffect(() => {
    if (questions.length === 0) return; // Menunggu data pertanyaan

    setStartTime(Date.now());

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
  }, [currentQuestionIndex, questions]);

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
      }
    } else {
      navigate("/82276690-c57d-4fa7-8180-2bca4968564b", {
        state: { score: score + points },
      });
      const handleSubmitToDatabase = () => {
        const nama_tim = localStorage.getItem("nama_tim");
        const totalScore = score + points;

        axios
          .post(PORT_API + "/save-score", {
            nama_tim: nama_tim,
            score: totalScore,
          })
          .then((response) => {
            console.log("Score successfully saved:", response.data);
            // Redirect or any other action
            navigate("/82276690-c57d-4fa7-8180-2bca4968564b", {
              state: { score: totalScore },
            });
          })
          .catch((error) => {
            console.error("Error saving score:", error);
          });
      };
      handleSubmitToDatabase();
      localStorage.clear();
    }
  };

  // Auto di Diskualifikasi
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "hidden") {
      navigate("/82276690-c57d-4fa7-8180-2bca4968564b", {
        state: { score: 0 },
      });
      const handleSubmitToDatabase = () => {
        const nama_tim = localStorage.getItem("nama_tim");
        const totalScore = 0;

        axios
          .post(PORT_API + "/save-score", {
            nama_tim: nama_tim,
            score: totalScore,
          })
          .then((response) => {
            console.log("Score successfully saved:", response.data);
            // Redirect or any other action
            navigate("/82276690-c57d-4fa7-8180-2bca4968564b", {
              state: { score: totalScore },
            });
          })
          .catch((error) => {
            console.error("Error saving score:", error);
          });
      };
      handleSubmitToDatabase();
      localStorage.clear();
    }
  });

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
  const correctAnswer = currentQuestion.answer;

  return (
    <div className="p-6 max-w-lg mx-auto bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold text-sage-600 mb-6">Quiz</h2>
      <div className="p-6 border border-sage-300 rounded-lg bg-white mb-6 shadow-sm">
        {currentQuestion.image_url && (
          <img
            src={currentQuestion.image_url}
            alt="Question"
            className="mb-4 w-full h-auto"
          />
        )}
        <h3 className="text-xl font-semibold text-sage-700 mb-4">
          {currentQuestion.question_text}
        </h3>
        <div className="grid grid-cols-2 gap-4">
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
              className={`w-full text-left py-3 px-4 rounded-lg mb-2 ${
                selectedAnswer !== null
                  ? option === correctAnswer
                    ? "bg-green-500 text-white"
                    : selectedAnswer === option
                    ? "bg-red-500 text-white"
                    : "bg-sage-400 text-white"
                  : "bg-sage-400 text-white"
              }`}
            >
              <img src={option} alt={`Option ${index + 1}`} className="w-full h-auto"/>
            </button>
          ))}
        </div>
      </div>
      <div className="flex justify-between text-lg font-semibold">
        <p className="text-sage-700">Current Score: {score}</p>
        <p className="text-red-500 font-bold">Time Left: {timeLeft}s</p>
      </div>
    </div>
  );
}

export default ImgQuiz;
