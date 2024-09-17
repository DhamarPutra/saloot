import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import PORT_API from './api/PortAPI';
import SecurityAdmin from './security/SecurityAdmin';

function AddQuestion() {
  const [question, setQuestion] = useState("");
  const [option1, setOption1] = useState("");
  const [option2, setOption2] = useState("");
  const [option3, setOption3] = useState("");
  const [option4, setOption4] = useState("");
  const [answer, setAnswer] = useState("");
  SecurityAdmin();

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post(PORT_API + "/questions", {
        question,
        option1,
        option2,
        option3,
        option4,
        answer,
      })
      .then((response) => {
        alert(response.data.message);
        // Reset form after successful submission
        setQuestion("");
        setOption1("");
        setOption2("");
        setOption3("");
        setOption4("");
        setAnswer("");
      })
      .catch((error) => console.error("Error adding question:", error));
  };

  return (
    <div className="p-6 max-w-xl mx-auto bg-white shadow-lg rounded-lg">
      <Link
        to="/bed56435-7544-417a-991e-caf2ed848307"
        className="bg-sage-500 text-white py-2 px-4 rounded hover:bg-sage-600 transition duration-300 inline-block"
      >
        AdminPage
      </Link>
      <h2 className="text-2xl font-bold text-sage-700 my-3">Add Question</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sage-700 text-sm font-semibold mb-1">
            Question:
          </label>
          <textarea
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            className="w-full p-3 border border-sage-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sage-400 transition duration-300"
            rows="4"
            required
          />
        </div>
        <div>
          <label className="block text-sage-700 text-sm font-semibold mb-1">
            Option 1:
          </label>
          <input
            type="text"
            value={option1}
            onChange={(e) => setOption1(e.target.value)}
            className="w-full p-3 border border-sage-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sage-400 transition duration-300"
            required
          />
        </div>
        <div>
          <label className="block text-sage-700 text-sm font-semibold mb-1">
            Option 2:
          </label>
          <input
            type="text"
            value={option2}
            onChange={(e) => setOption2(e.target.value)}
            className="w-full p-3 border border-sage-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sage-400 transition duration-300"
            required
          />
        </div>
        <div>
          <label className="block text-sage-700 text-sm font-semibold mb-1">
            Option 3:
          </label>
          <input
            type="text"
            value={option3}
            onChange={(e) => setOption3(e.target.value)}
            className="w-full p-3 border border-sage-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sage-400 transition duration-300"
            required
          />
        </div>
        <div>
          <label className="block text-sage-700 text-sm font-semibold mb-1">
            Option 4:
          </label>
          <input
            type="text"
            value={option4}
            onChange={(e) => setOption4(e.target.value)}
            className="w-full p-3 border border-sage-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sage-400 transition duration-300"
            required
          />
        </div>
        <div>
          <label className="block text-sage-700 text-sm font-semibold mb-1">
            Correct Answer:
          </label>
          <input
            type="text"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            className="w-full p-3 border border-sage-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sage-400 transition duration-300"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-sage-500 text-white py-2 px-4 rounded-lg hover:bg-sage-600 focus:outline-none focus:ring-2 focus:ring-sage-400 transition duration-300 w-full"
        >
          Add Question
        </button>
      </form>
    </div>
  );
}

export default AddQuestion;
