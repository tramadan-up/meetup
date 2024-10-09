import { BrowserRouter as Router, Route, Routes, Link} from "react-router-dom";
import LoginPage from "./pages/LoginPage.tsx";
import CoordinatorMeetingCreationPage from "./pages/CoordinatorMeetingCreationPage.tsx";
import ParticipantWaitingPage from "./pages/ParticipantWaitingPage.tsx";
import './App.css'

function App() {
  return (
    <>
        <Router>
            <nav>
                <ul>
                    <li><Link to="/meetup/">Home</Link></li>
                    <li><Link to="/meetup/coordinator">About</Link></li>
                    <li><Link to="/meetup/participant">Contact</Link></li>
                </ul>
            </nav>

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
