import { useContext, useEffect } from "react";
import { Logic } from "../store/Context";
import { Link, Outlet, useNavigate } from "react-router-dom";
import NavBar from "../components/layout/NavBar";
import Footer from "../components/layout/Footer";

const Home = () => {
  const { isLoggedIn } = useContext(Logic);
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/home/dashboard");
    }
  }, [isLoggedIn]);

  return (
    <>
      {/* <Loader /> */}
      <NavBar />
      <Outlet />
      <Footer />
    </>
  );
};

export default Home;
