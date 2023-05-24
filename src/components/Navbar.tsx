import { Link } from "react-router-dom";
import { AiOutlinePlus } from "react-icons/ai";

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-20 bg-gradient-to-r bg-slate-900">
      <div className="container mx-auto px-8 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="logo-nav-gradient text-4xl font-bold">
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
      </div>
    </nav>
  );
};

export default Navbar;
