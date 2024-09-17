import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import PORT_API from "./api/PortAPI";
import SecurityAdmin from "./security/SecurityAdmin";

function LeaderboardPage() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  SecurityAdmin();

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await axios.get(PORT_API + "/leaderboard");
        setLeaderboard(response.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchLeaderboard(); // Fetch leaderboard data initially

    const intervalId = setInterval(fetchLeaderboard, 1000); // Fetch data every second

    // Cleanup function to clear interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error fetching leaderboard: {error.message}</div>;

  function endQuiz() {
    axios
      .post(PORT_API + "/stop-quiz")
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => console.error("Error:", error));
  }

  function endSession() {
    const stopQuizRequest = axios.post(PORT_API + "/stop-quiz");
    const emptyLoginRequest = axios.get(PORT_API + "/empty-login");
    const emptyLeaderboardRequest = axios.get(PORT_API + "/empty-leaderboard");

    Promise.all([stopQuizRequest, emptyLoginRequest, emptyLeaderboardRequest])
      .then((responses) => {
        responses.forEach((response) => {
          console.log(response.data);
        });
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  return (
    <div className="p-6 max-w-2xl mx-auto bg-white shadow-md rounded-lg">
      <h2 className="text-4xl font-bold text-sage-600 mb-4 text-center">
        Leaderboard
      </h2>

      {/* Leaderboard */}
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 bg-sage-600 text-white font-bold text-center">
              Rank
            </th>
            <th className="py-2 px-4 bg-sage-600 text-white font-bold text-center">
              Nama Tim
            </th>
            <th className="py-2 px-4 bg-sage-600 text-white font-bold text-center">
              Score
            </th>
          </tr>
        </thead>
        <tbody>
          {leaderboard.map((user, index) => (
            <tr key={user.id} className="bg-sage-100 even:bg-sage-200">
              <td className="py-2 px-4 text-sage-900 font-bold">{index + 1}</td>
              <td className="py-2 px-4 text-sage-900 font-bold">{user.nama_tim}</td>
              <td className="py-2 px-4 text-sage-700 font-bold">{user.score} points</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Button untuk kembali ke halaman admin */}
      <div className="mt-6 flex justify-center">
        <Link
          onClick={endQuiz}
          className="mx-2 bg-sage-500 text-white py-2 px-6 rounded-lg text-center hover:bg-sage-600 transition duration-150 ease-in-out"
        >
          End Quiz
        </Link>
        <Link
          onClick={endSession}
          className="mx-2 bg-sage-500 text-white py-2 px-6 rounded-lg text-center hover:bg-sage-600 transition duration-150 ease-in-out"
        >
          End Session
        </Link>
        <Link
          to="/895a9612-662f-41bf-a664-96d700b6c713"
          className="mx-2 bg-sage-500 text-white py-2 px-6 rounded-lg text-center hover:bg-sage-600 transition duration-150 ease-in-out"
        >
          Tim Join
        </Link>
        <Link
          to="/bed56435-7544-417a-991e-caf2ed848307"
          className="mx-2 bg-sage-500 text-white py-2 px-6 rounded-lg text-center hover:bg-sage-600 transition duration-150 ease-in-out"
        >
          AdminPage
        </Link>
      </div>
    </div>
  );
}

export default LeaderboardPage;
