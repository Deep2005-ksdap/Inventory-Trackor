import { useContext } from "react";
import { AuthContext } from "../store/AuthContext";
import { StockContext } from "../store/StockContext";
import { MdAddCircle } from "react-icons/md";
import { Link } from "react-router-dom";
import Loader from "../components/layout/Loader";
import InfoCard from "../components/ui/InfoCard";
import CategoryCard from "../components/ui/CategoryCard";
import { useEffect } from "react";

const Dashboard = () => {
  const { isLoggedIn, user, checkAuth } = useContext(AuthContext);

    useEffect(() => {
      // run once on app mount
      checkAuth();
    }, [checkAuth]);

  return isLoggedIn ? (
    <main className="min-h-screen bg-gradient-to-r from-blue-100 via-white to-green-100 px-4 py-4 text-center">
      <h1 className="text-2xl mb-4 font-bold text-blue-500">
        Welcome,
        <span className="font-extrabold text-3xl text-green-500">
          {user.fullname.firstname}
        </span>
      </h1>
      <div className="w-full flex flex-col items-center mb-10">
        <InfoCard />
      </div>
      
      <CategoryCard />

      <div className="w-full flex justify-end max-w-4xl mt-6 mr-6">
        <Link
          to="/home/add-item"
          className="bg-red-500 flex gap-2 items-center text-2xl text-white px-6 py-3 rounded-lg font-bold shadow"
        >
          <MdAddCircle /> <span>Add</span>
        </Link>
      </div>
    </main>
  ) : (
    <div className="w-screen h-screen flex items-center justify-center">
      <span className="inline-block bg-red-500/10 text-red-600 border border-red-400/40 px-3 py-1.5 rounded-lg text-sm font-medium backdrop-blur-sm shadow-sm">
        ⚠️ Please login to continue
      </span>
    </div>
  );
};

export default Dashboard;
