import { useContext } from "react";
import { Logic } from "../store/Context";
import { FaArrowRight } from "react-icons/fa";
import Loader from "../components/layout/Loader";
import { Link } from "react-router-dom";

const LandingPage = () => {
  const { isLoggedIn } = useContext(Logic);

  return (
    !isLoggedIn && (
      <main className="min-h-full bg-gradient-to-r from-blue-100 via-white to-green-100 flex flex-col items-center px-4 py-4 text-center hero">
        <h1 className="text-2xl font-extrabold text-blue-800">
          Welcome to Inventory Trackor
        </h1>

        <div className="mt-4 mb-4 flex flex-col justify-evenly sm:flex-row gap-5">
          <div className="max-w-[500px]">
            <img
              className="rounded-2xl img"
              src="./loginInventoryTrackor.jpg"
              alt="role-photo"
            />
          </div>

          <span className="flex flex-col justify-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-700 drop-shadow-lg text-center qoutes">
              <i>"Your Inventory, Your Space."</i>
            </h2>
          </span>
        </div>

        <div className="w-full flex justify-center">
          <div className="text-xl text-wrap sm:text-2xl text-gray-700 font-medium mb-8 text-center max-w-2xl quotes2">
            A personal inventory dashboard where only, you can
            <p className="quotes3 sm:text-3xl text-green-500">
              add, edit, or manage your items
            </p>
            <span className="text-green-700 font-semibold">
              Fast, private, and secure.
            </span>
          </div>
        </div>

        <div className="flex flex-col items-center sm:flex-row gap-6 mb-10">
          <FaArrowRight className="hidden sm:block"/>
          <Link
            to={"/user/login"}
            className="px-8 py-4 bg-green-500 text-white rounded-xl font-bold text-lg shadow-lg hover:bg-green-600 transition link"
          >
            🔐 Login to Your Inventory
          </Link>
          <Link
            to={"/user/register"}
            className="px-8 py-4 bg-blue-600 text-white rounded-xl font-bold text-lg shadow-lg hover:bg-blue-700 transition text-center link"
          >
            📝 Sign Up
          </Link>
        </div>
      </main>
    )
  );
};
export default LandingPage;
