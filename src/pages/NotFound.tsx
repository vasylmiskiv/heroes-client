import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <section className="py-48 flex justify-center">
      <div className="text-center px-20 py-10 rounded-lg bg-white bg-opacity-50">
        <div className="mb-10 text-4xl font-semibold">404 | Not found</div>
        <Link to="/" className="text-sm text-green-700 hover:underline">
          Go home
        </Link>
      </div>
    </section>
  );
};

export default NotFound;
