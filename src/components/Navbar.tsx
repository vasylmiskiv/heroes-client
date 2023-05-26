import { Link } from "react-router-dom";
import { AiOutlinePlus } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentPage } from "../redux/heroesSlice";

const Navbar = () => {
  const { currentPage } = useSelector((state: RootState) => state.heroes);

  const dispatch = useDispatch();

  const handleResetPages = () => {
    if (currentPage > 1) {
      dispatch(setCurrentPage(1));
    }
  };

  return (
    <header className="sticky top-0 z-20 bg-slate-900">
      <nav className="container mx-auto px-7 py-4">
        <div className="flex items-center justify-between">
          <Link
            to="/"
            className="logo-nav-gradient text-4xl font-bold"
            onClick={() => handleResetPages()}
          >
            Heroes
          </Link>
          <Link
            to="/create"
            className="py-2 px-4 text-white flex items-center gap-2 font-semibold rounded-lg bg-green-500 hover:bg-green-600 transition-all duration-200"
          >
            <AiOutlinePlus size={20} />
            Add a hero
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
