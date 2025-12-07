import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { AuthContext } from "../../store/AuthContext";
import { StockContext } from "../../store/StockContext";

const NavBar = () => {
  const navigate = useNavigate();
  const [active, setActive] = useState(false);
  const { isLoggedIn, logout } = useContext(AuthContext);

  const handleLogout = async () => {
    try {
      const ok = await logout();

      if (ok) {
        navigate("/");
      } else {
        alert("Logout failed! Try again.");
      }
    } catch (err) {
      alert("Logout failed: " + err.message);
    }
  };

  return (
    <motion.nav
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ ease: "easeOut", duration: 0.8 }}
      className={`flex w-full items-center justify-center  py-2 bg-gradient-to-r from-blue-100 via-white to-green-100 shadow-xl`}
    >
      <div
        style={{ width: "95%" }}
        className="flex justify-between items-center"
      >
        <Link to="/" className="flex flex-col space-x-3">
          <img
            src="/logo.png"
            alt="Inventory-trackor"
            className="h-16 w-auto object-contain sm:h-12 rounded-full ml-4"
          />
          <div className="hidden sm:inline">
            <span className="font-bold text-blue-600 tracking-wide">
              Inventory Trackor
            </span>
          </div>
        </Link>

        <div className="space-x-1 sm:flex sm:space-x-4 sm:mr-4">
          {!isLoggedIn ? (
            <Link
              to={"/user/login"}
              className={`px-4 py-2 text-blue-600 rounded font-semibold hover:bg-blue-100 transition`}
            >
              SIGN-IN
            </Link>
          ) : (
            <Link
              to="/home/dashboard"
              className={`px-4 py-2 text-blue-600 rounded font-semibold hover:bg-blue-100 transition ${
                active ? "border-b-1 border-blue-500 bg-blue-200" : ""
              }`}
            >
              Dashboard
            </Link>
          )}

          {!isLoggedIn ? (
            <Link
              to="/user/register"
              className="px-4 py-2 text-black-600 rounded font-semibold hover:bg-blue-600 hover:text-white transition"
            >
              SIGNUP
            </Link>
          ) : (
            <button
              onClick={handleLogout}
              className="px-4 py-2 text-black-600 rounded font-semibold hover:bg-blue-600 hover:text-white transition"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </motion.nav>
  );
};

export default NavBar;
