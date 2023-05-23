import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Navbar from "./components/Navbar";
import HeroesPage from "./pages/HeroesPage";
import CreateHeroPage from "./pages/CreateHeroPage";
import UpdateHeroPage from "./pages/UpdateHeroPage";
import HeroPage from "./pages/HeroPage";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HeroesPage />} />
        <Route path="/hero/:id" element={<HeroPage />} />
        <Route path="/create" element={<CreateHeroPage />} />
        <Route path="/edit" element={<UpdateHeroPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
