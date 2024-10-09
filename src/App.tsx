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
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/coordinator/">About</Link></li>
                    <li><Link to="/participant">Contact</Link></li>
                </ul>
            </nav>

            <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="/coordinator" element={<CoordinatorMeetingCreationPage />} />
                <Route path="/participant" element={<ParticipantWaitingPage />} />
            </Routes>
        </Router>
    </>
  )
}

export default App
