import { Link } from "react-router-dom";

const NotFoundPage = () => (
  <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-blue-300">
    <h1 className="text-7xl font-extrabold text-blue-700 mb-4">404</h1>
    <h2 className="text-2xl font-bold text-blue-900 mb-2">Page Not Found</h2>
    <p className="text-lg text-blue-800 mb-6">
      Sorry, the page you are looking for does not exist.
    </p>
    <Link
      to="/"
      className="px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold shadow hover:bg-white hover:text-blue-600 border border-blue-600 transition-all duration-300"
    >
      Go Home
    </Link>
  </div>
);

export default NotFoundPage;
