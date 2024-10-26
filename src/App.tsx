import { HashRouter as Router, Route, Routes } from "react-router-dom";
import LoginView from "./pages/LoginView.tsx";
import CreationView from "./pages/CreationView.tsx";
import WaitingView from "./pages/WaitingView.tsx";
import CMainView from "./pages/CMainView.tsx";
import MainView from "./pages/MainView.tsx";
import CSlideView from "./pages/CSlideView.tsx";
import SlideView from "./pages/SlideView.tsx";
import CReviewView from "./pages/CReviewView.tsx";
import ReviewView from "./pages/ReviewView.tsx";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<LoginView />} />

          /* Coordinator Routing */
          <Route path="/coordinator" element={<CreationView />} />
          <Route path="/coordinator/main" element={<CMainView />} />
          <Route path="/coordinator/slides" element={<CSlideView />} />
          <Route path="/coordinator/review" element={<CReviewView />} />

          /* Participant Routing */
          <Route path="/participant" element={<WaitingView />} />
          <Route path="/participant/main" element={<MainView />} />
          <Route path="/participant/slides" element={<SlideView />} />
          <Route path="/participant/review" element={<ReviewView />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
