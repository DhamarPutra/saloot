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
import sponsor from "./pages/Sponsor";

function App() {
  return (
    <Router>
      <div className="pt-4 pb-14 App bg-sage-50 min-h-screen">
        <Routes>
          <Route path="/" element={<Index />} />
          <Route
            path="/fc6151ce-6515-4556-a132-4002a241659f"
            element={<IndexAdmin />}
          />
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
        {/* <footer className="fixed bottom-0 w-full bg-sage-200 px-4 py-2 text-black text-center">Damar X ISC &copy;2024</footer> */}
        <footer className="fixed bottom-0 w-full bg-sage-200 px-4 py-2 text-black text-center">
          <div>Damar X ISC &copy; 2024</div>
          <div>Sponsored by</div>
          <div>
            <marquee>
              <img
                src={sponsor.bmw}
                alt="Sponsor 1"
                className="inline mx-2 sponsor-s"
              />
              <img
                src={sponsor.chevrolet}
                alt="Sponsor 1"
                className="inline mx-2 sponsor-m"
              />
              <img
                src={sponsor.ferrari}
                alt="Sponsor 1"
                className="inline mx-2 sponsor-l"
              />
              <img
                src={sponsor.honda}
                alt="Sponsor 1"
                className="inline mx-2 sponsor-s"
              />
              <img
                src={sponsor.hondaM}
                alt="Sponsor 1"
                className="inline mx-2 sponsor-m"
              />
              <img
                src={sponsor.mercedes}
                alt="Sponsor 1"
                className="inline mx-2 sponsor-l"
              />
              <img
                src={sponsor.mitsu}
                alt="Sponsor 1"
                className="inline mx-2 sponsor-s"
              />
              <img
                src={sponsor.nissan}
                alt="Sponsor 1"
                className="inline mx-2 sponsor-m"
              />
              <img
                src={sponsor.porsche}
                alt="Sponsor 1"
                className="inline mx-2 sponsor-l"
              />
              <img
                src={sponsor.shell}
                alt="Sponsor 1"
                className="inline mx-2 sponsor-s"
              />
              <img
                src={sponsor.suzuki}
                alt="Sponsor 1"
                className="inline mx-2 sponsor-m"
              />
              <img
                src={sponsor.toyota}
                alt="Sponsor 1"
                className="inline mx-2 sponsor-l"
              />
              <img
                src={sponsor.volkswagen}
                alt="Sponsor 1"
                className="inline mx-2 sponsor-s"
              />
              <img
                src={sponsor.volvo}
                alt="Sponsor 1"
                className="inline mx-2 sponsor-m"
              />
              <img
                src={sponsor.yamaha}
                alt="Sponsor 1"
                className="inline mx-2 sponsor-l"
              />
            </marquee>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
