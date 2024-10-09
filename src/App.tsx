import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage.tsx";
import CoordinatorMeetingCreationPage from "./pages/CoordinatorMeetingCreationPage.tsx";
import ParticipantWaitingPage from "./pages/ParticipantWaitingPage.tsx";
import './App.css'

function App() {
  return (
    <>
        <Router>
            <Routes>
                <Route path="/meetup/" element={<LoginPage />} />
                <Route path="/meetup/coordinator" element={<CoordinatorMeetingCreationPage />} />
                <Route path="/meetup/participant" element={<ParticipantWaitingPage />} />
            </Routes>
        </Router>
    </>
  )
}

export default App
