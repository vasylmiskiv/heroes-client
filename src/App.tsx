import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HeroesPage from "./pages/HeroesPage";
import CreateHeroPage from "./pages/CreateHeroPage";
import EditHeroPage from "./pages/EditHeroPage";
import HeroPage from "./pages/HeroPage";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <div id="app">
      <Router>
        <Navbar />

        <Routes>
          <Route path="/" element={<HeroesPage />} />
          <Route path="/hero/:id" element={<HeroPage />} />
          <Route path="/create" element={<CreateHeroPage />} />
          <Route path="/edit/:id" element={<EditHeroPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
