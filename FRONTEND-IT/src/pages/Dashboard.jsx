import { useContext } from "react";
import { AuthContext } from "../store/AuthContext";
import { StockContext } from "../store/StockContext";
import { MdAddCircle } from "react-icons/md";
import { Link } from "react-router-dom";
import Loader from "../components/layout/Loader";
import InfoCard from "../components/ui/InfoCard";
import CategoryCard from "../components/ui/CategoryCard";

const Dashboard = () => {
  const { isLoggedIn, user } = useContext(AuthContext);
  if (!isLoggedIn) return <Loader />;

  return (
    <main className="flex flex-col items-center min-h-screen w-auto bg-gradient-to-r from-blue-100 via-white to-green-100 px-4 py-4 text-center">
      <h1 className="text-2xl mb-4 font-bold text-blue-500">
        Welcome,
        <span className="font-extrabold text-3xl text-green-500">
          {user.fullname.firstname}
        </span>
      </h1>

      <InfoCard />
      <CategoryCard />

      <div className="w-full flex justify-end max-w-4xl mt-6 mr-6">
        <Link
          to="/home/add-item"
          className="bg-red-500 flex gap-2 items-center text-2xl text-white px-6 py-3 rounded-lg font-bold shadow"
        >
          <MdAddCircle /> <span>Add </span>
        </Link>
      </div>
    </main>
  );
};

export default Dashboard;
