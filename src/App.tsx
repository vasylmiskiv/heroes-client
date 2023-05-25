import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HeroesPage from "./pages/HeroesPage";
import CreateHeroPage from "./pages/CreateHeroPage";
import EditHeroPage from "./pages/EditHeroPage";
import HeroPage from "./pages/HeroPage";
import NotFound from "./pages/NotFound";
import Footer from "./components/Footer";

function App() {
  return (
    <div id="app" className="flex flex-col min-h-screen">
      <Router>
        <Navbar />
        <main className="flex-grow min-h-screen">
          <Routes>
            <Route path="/" element={<HeroesPage />} />
            <Route path="/hero/:id" element={<HeroPage />} />
            <Route path="/create" element={<CreateHeroPage />} />
            <Route path="/edit/:id" element={<EditHeroPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
