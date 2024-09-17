import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AddQuestion from "./pages/AddQuestion";
import AddTim from "./pages/AddTim";
import AdminPage from "./pages/AdminPage";
import Index from "./pages/Index";
import IndexAdmin from "./pages/IndexAdmin";
import LeaderboardPage from "./pages/LeaderboardPage";
import Quiz from "./pages/Quiz";
import ImgQuiz from "./pages/ImgQuiz";
import AddQuestionImg from "./pages/AddQuestionImg";
import Results from "./pages/Results";
import UserJoin from "./pages/UserJoin";
import UserList from "./pages/UserList";
import WaitingPage from "./pages/WaitingPage";

function App() {
  return (
    <Router>
      <div className="pt-4 pb-14 App bg-sage-50 min-h-screen">
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/fc6151ce-6515-4556-a132-4002a241659f" element={<IndexAdmin />} />
          <Route
            path="/d50d5447-c282-47a5-b39b-0be2e69538c9"
            element={<AddQuestion />}
          />
          <Route
            path="/c7f7930d-fd69-4d0b-9eba-6cde4c09e509"
            element={<AddQuestionImg />}
          />
          <Route
            path="/8668cd59-e17d-4525-9f51-619d7537f108"
            element={<AddTim />}
          />
          <Route
            path="/bed56435-7544-417a-991e-caf2ed848307"
            element={<AdminPage />}
          />
          <Route
            path="/36a69f26-521f-45aa-aa6f-41c924825713"
            element={<LeaderboardPage />}
          />
          <Route
            path="/1c307e20-8dbd-4f8d-968c-a9968d751834"
            element={<Quiz />}
          />
          <Route
            path="/af5c0277-4796-4511-af62-e738650566ce"
            element={<ImgQuiz />}
          />
          <Route
            path="/82276690-c57d-4fa7-8180-2bca4968564b"
            element={<Results />}
          />
          <Route
            path="/895a9612-662f-41bf-a664-96d700b6c713"
            element={<UserJoin />}
          />
          <Route
            path="/00fd0a7f-1af6-444a-a314-30c762d97752"
            element={<UserList />}
          />
          <Route
            path="/3a59ebd6-e207-4510-b13d-f300922f8237"
            element={<WaitingPage />}
          />
        </Routes>
        <footer className="fixed bottom-0 w-full bg-sage-200 px-4 py-2 text-black text-center">Damar X ISC &copy;2024</footer>
        {/* <footer className="fixed bottom-0 w-full bg-sage-200 px-4 py-2 text-black text-center">
          <div>Damar X ISC &copy; 2024</div>
          <div>Sponsored by</div>
          <div>
            <marquee>
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGHKgqfMK3KafCxHDfvNuP-Uae77fOdMC-XQ&s"
                alt="Sponsor 1"
                className="inline mx-2"
              />
              <img
                src="https://w7.pngwing.com/pngs/670/422/png-transparent-mercedes-hd-logo.png"
                alt="Sponsor 2"
                className="inline mx-2"
              />
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQm2az2eypspmikzH229KHadDnSGLUJwO7mRQ&s"
                alt="Sponsor 3"
                className="inline mx-2"
              />
              <img
                src="https://w7.pngwing.com/pngs/153/624/png-transparent-rolls-royce-holdings-plc-car-rolls-royce-phantom-vii-rolls-royce-wraith-rolls-text-rectangle-trademark-thumbnail.png"
                alt="Sponsor 4"
                className="inline mx-2"
              />
            </marquee>
          </div>
        </footer> */}
      </div>
    </Router>
  );
}

export default App;
