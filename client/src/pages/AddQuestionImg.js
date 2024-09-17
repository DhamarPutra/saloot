import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import PORT_API from './api/PortAPI';
import SecurityAdmin from './security/SecurityAdmin';

function AddQuestionImg() {
  const [questionText, setQuestionText] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [option1, setOption1] = useState('');
  const [option2, setOption2] = useState('');
  const [option3, setOption3] = useState('');
  const [option4, setOption4] = useState('');
  const [answer, setAnswer] = useState('');
  SecurityAdmin();

  const handleSubmit = (e) => {
      e.preventDefault();

      const questionData = {
          question_text: questionText,
          image_url: imageUrl,
          option1,
          option2,
          option3,
          option4,
          answer,
      };

      axios
          .post(PORT_API + '/questions_img', questionData)
          .then((response) => {
              console.log(response.data.message);
              // Reset form setelah submit
              setQuestionText('');
              setImageUrl('');
              setOption1('');
              setOption2('');
              setOption3('');
              setOption4('');
              setAnswer('');
          })
          .catch((error) => {
              console.error('There was an error adding the question!', error);
          });
  };

  return (
      <div className="p-6 max-w-lg mx-auto bg-white shadow-md rounded-lg">
        <Link
        to="/bed56435-7544-417a-991e-caf2ed848307"
        className="bg-sage-500 text-white py-2 px-4 rounded hover:bg-sage-600 transition duration-300 inline-block"
      >
        AdminPage
      </Link>
          <h2 className="text-2xl font-semibold text-sage-600 mb-6">Add New Question</h2>
          <form onSubmit={handleSubmit}>
              <div className="mb-4">
                  <label className="block text-sage-700 text-sm font-bold mb-2" htmlFor="questionText">
                      Question Text
                  </label>
                  <input
                      type="text"
                      id="questionText"
                      value={questionText}
                      onChange={(e) => setQuestionText(e.target.value)}
                      required
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-sage-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
              </div>
              <div className="mb-4">
                  <label className="block text-sage-700 text-sm font-bold mb-2" htmlFor="imageUrl">
                      Image URL
                  </label>
                  <input
                      type="text"
                      id="imageUrl"
                      value={imageUrl}
                      onChange={(e) => setImageUrl(e.target.value)}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-sage-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
              </div>
              <div className="mb-4">
                  <label className="block text-sage-700 text-sm font-bold mb-2" htmlFor="option1">
                      Option 1
                  </label>
                  <input
                      type="text"
                      id="option1"
                      value={option1}
                      onChange={(e) => setOption1(e.target.value)}
                      required
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-sage-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
              </div>
              <div className="mb-4">
                  <label className="block text-sage-700 text-sm font-bold mb-2" htmlFor="option2">
                      Option 2
                  </label>
                  <input
                      type="text"
                      id="option2"
                      value={option2}
                      onChange={(e) => setOption2(e.target.value)}
                      required
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-sage-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
              </div>
              <div className="mb-4">
                  <label className="block text-sage-700 text-sm font-bold mb-2" htmlFor="option3">
                      Option 3
                  </label>
                  <input
                      type="text"
                      id="option3"
                      value={option3}
                      onChange={(e) => setOption3(e.target.value)}
                      required
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-sage-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
              </div>
              <div className="mb-4">
                  <label className="block text-sage-700 text-sm font-bold mb-2" htmlFor="option4">
                      Option 4
                  </label>
                  <input
                      type="text"
                      id="option4"
                      value={option4}
                      onChange={(e) => setOption4(e.target.value)}
                      required
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-sage-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
              </div>
              <div className="mb-4">
                  <label className="block text-sage-700 text-sm font-bold mb-2" htmlFor="answer">
                      Correct Answer
                  </label>
                  <input
                      type="text"
                      id="answer"
                      value={answer}
                      onChange={(e) => setAnswer(e.target.value)}
                      required
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-sage-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
              </div>
              <button
                  type="submit"
                  className="bg-sage-500 hover:bg-sage-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                  Add Question
              </button>
          </form>
      </div>
  );
}

export default AddQuestionImg;