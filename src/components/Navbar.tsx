import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-gradient-to-r from-blue-500 to-purple-500">
      <div className="container mx-auto py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-white text-xl font-bold">
            Heroes
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
