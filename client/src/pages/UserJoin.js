import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import PORT_API from "./api/PortAPI";
import SecurityAdmin from "./security/SecurityAdmin";

function UserJoin() {
  const [timJoin, setTimJoin] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSession, setSelectedSession] = useState("");
  SecurityAdmin();

  useEffect(() => {
    const fetchTimJoin = async () => {
      try {
        const response = await axios.get(PORT_API + "/user-join");
        setTimJoin(response.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchTimJoin();

    const intervalFetchData = setInterval(fetchTimJoin, 1000); // Fetch data every second

    // Cleanup function to clear interval on component unmount
    return () => clearInterval(intervalFetchData);
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error fetching User: {error.message}</div>;

  const rows = [];
  for (let i = 0; i < timJoin.length; i += 5) {
    rows.push(timJoin.slice(i, i + 5));
  }

  const startQuiz = () => {
    axios
      .post(PORT_API + "/start-quiz")
      .then((response) => {
        console.log(response.data.message);
      })
      .catch((error) => {
        console.error("Error starting quiz:", error);
      });
  };

  function clearLogin() {
    axios
      .get(PORT_API + "/empty-login")
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => console.error("Error:", error));
  }
  const handleSetSession = (sessionNumber) => {
    axios
      .post(PORT_API + "/set-session", { sessionNumber })
      .then((response) => {
        console.log(response.data.message);
        setSelectedSession(sessionNumber);
      })
      .catch((error) => console.error(error));
  };

  const handleSessionChange = (event) => {
    const newSession = event.target.value;
    handleSetSession(newSession);
  };

  return (
    <div className="p-6 max-w mx-auto bg-white shadow-md rounded-lg">
      <div className="flex w-full pb-2">
        <marquee>
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGHKgqfMK3KafCxHDfvNuP-Uae77fOdMC-XQ&s"
            alt="Sponsor 1"
            className="inline mx-2 sponsor-s"
          />
          <img
            src="https://w7.pngwing.com/pngs/670/422/png-transparent-mercedes-hd-logo.png"
            alt="Sponsor 2"
            className="inline mx-2 sponsor-m"
          />
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQm2az2eypspmikzH229KHadDnSGLUJwO7mRQ&s"
            alt="Sponsor 3"
            className="inline mx-2 sponsor-l"
          />
          <img
            src="https://w7.pngwing.com/pngs/153/624/png-transparent-rolls-royce-holdings-plc-car-rolls-royce-phantom-vii-rolls-royce-wraith-rolls-text-rectangle-trademark-thumbnail.png"
            alt="Sponsor 4"
            className="inline mx-2"
          />
        </marquee>
      </div>
      <div className="flex justify-center mb-3">
        <Link
          to="/bed56435-7544-417a-991e-caf2ed848307"
          className="mx-2 bg-sage-500 text-white py-2 px-6 rounded-lg text-center hover:bg-sage-600 transition duration-150 ease-in-out"
        >
          AdminPage
        </Link>
        <Link
          to="/36a69f26-521f-45aa-aa6f-41c924825713"
          className="mx-2 bg-sage-500 text-white py-2 px-6 rounded-lg text-center hover:bg-sage-600 transition duration-150 ease-in-out"
        >
          Leaderboard
        </Link>
        <Link
          onClick={startQuiz}
          className="mx-2 bg-sage-500 text-white py-2 px-6 rounded-lg text-center hover:bg-sage-600 transition duration-150 ease-in-out"
        >
          Start Quiz
        </Link>
        <Link
          onClick={clearLogin}
          className="mx-2 bg-sage-500 text-white py-2 px-6 rounded-lg text-center hover:bg-sage-600 transition duration-150 ease-in-out"
        >
          Clear Login
        </Link>
      </div>
      <div className="my-3">
        <select className="mr-4" onChange={handleSessionChange}>
          <option value="" selected hidden>
            Pilih Sesi
          </option>
          <option value="1">1</option>
          <option value="2">2</option>
        </select>
        <span>Tim Joined : {timJoin.length}/50</span>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full border-separate border-spacing-0 border border-sage-200">
          <thead>
            <tr className="bg-sage-500 text-white">
              <th className="border border-sage-300 py-2">Nama Tim</th>
              <th className="border border-sage-300 py-2">Nama Tim</th>
              <th className="border border-sage-300 py-2">Nama Tim</th>
              <th className="border border-sage-300 py-2">Nama Tim</th>
              <th className="border border-sage-300 py-2">Nama Tim</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, rowIndex) => (
              <tr key={rowIndex} className="bg-gray-100 odd:bg-white">
                {row.map((name, colIndex) => (
                  <td
                    key={colIndex}
                    className="font-bold border border-sage-300 text-center px-1"
                  >
                    {name.nama_tim.length > 20
                      ? `${name.nama_tim.slice(0, 20)}...`
                      : name.nama_tim}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default UserJoin;
