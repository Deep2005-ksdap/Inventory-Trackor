import { useContext } from "react";
import { FaArrowRight, FaShieldAlt, FaBolt, FaUserLock } from "react-icons/fa";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { AuthContext } from "../store/AuthContext";

const LandingPage = () => {
  // const { isLoggedIn } = useContext(AuthContext);

  // return (
  //   !isLoggedIn && (
  //     <motion.main
  //       initial={{ opacity: 0, y: -20 }}
  //       animate={{ opacity: 1, y: 0 }}
  //       transition={{ ease: "easeOut", duration: 1 }}
  //       className="min-h-screen bg-gradient-to-r from-blue-100 via-white to-green-100 flex flex-col items-center px-4 py-10 text-center"
  //     >
  //       {/* ---------- Hero Section ---------- */}
  //       <h1 className="text-3xl md:text-4xl font-extrabold text-blue-800 mb-4">
  //         Welcome to Inventory Trackor
  //       </h1>

  //       <div className="mt-6 mb-10 flex flex-col justify-evenly sm:flex-row gap-8 max-w-5xl">
  //         <div className="max-w-[480px]">
  //           <img
  //             className="rounded-2xl shadow-xl"
  //             src="./loginInventoryTrackor.jpg"
  //             alt="role-photo"
  //           />
  //         </div>

  //         <span className="flex flex-col justify-center">
  //           <h2 className="text-3xl sm:text-4xl font-bold text-gray-700 drop-shadow-lg text-center italic">
  //             “Your Inventory, Your Space.”
  //           </h2>
  //           <p className="mt-3 text-gray-600 text-lg">
  //             Manage everything you own — effortlessly and securely, all in one dashboard.
  //           </p>
  //         </span>
  //       </div>

  //       {/* ---------- Feature Section ---------- */}
  //       <motion.section
  //         initial={{ opacity: 0, y: 30 }}
  //         whileInView={{ opacity: 1, y: 0 }}
  //         transition={{ duration: 0.8 }}
  //         viewport={{ once: true }}
  //         className="w-full max-w-6xl px-4 py-10 grid grid-cols-1 sm:grid-cols-3 gap-8 text-center"
  //       >
  //         <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition">
  //           <FaBolt className="text-green-500 text-4xl mb-4 mx-auto" />
  //           <h3 className="text-xl font-semibold mb-2 text-gray-800">Fast & Easy</h3>
  //           <p className="text-gray-600">
  //             Add, edit, and organize items in seconds with a clean, intuitive interface.
  //           </p>
  //         </div>

  //         <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition">
  //           <FaShieldAlt className="text-blue-600 text-4xl mb-4 mx-auto" />
  //           <h3 className="text-xl font-semibold mb-2 text-gray-800">Secure & Private</h3>
  //           <p className="text-gray-600">
  //             Your inventory data stays only with you — encrypted and never shared.
  //           </p>
  //         </div>

  //         <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition">
  //           <FaUserLock className="text-green-700 text-4xl mb-4 mx-auto" />
  //           <h3 className="text-xl font-semibold mb-2 text-gray-800">Personal Dashboard</h3>
  //           <p className="text-gray-600">
  //             Built just for you — your own private space to track your belongings anytime.
  //           </p>
  //         </div>
  //       </motion.section>

  //       {/* ---------- Call to Action Section ---------- */}
  //       <div className="w-full flex flex-col items-center gap-6 mt-8 mb-16">
  //         <div className="text-2xl sm:text-3xl font-semibold text-gray-800">
  //           Ready to take control of your inventory?
  //         </div>
  //         <div className="flex flex-col sm:flex-row gap-6">
  //           <Link
  //             to={"/user/login"}
  //             className="px-8 py-4 bg-green-500 text-white rounded-xl font-bold text-lg shadow-lg hover:bg-green-600 transition"
  //           >
  //             🔐 Login to Your Inventory
  //           </Link>
  //           <Link
  //             to={"/user/register"}
  //             className="px-8 py-4 bg-blue-600 text-white rounded-xl font-bold text-lg shadow-lg hover:bg-blue-700 transition"
  //           >
  //             📝 Sign Up
  //           </Link>
  //         </div>
  //       </div>
  //     </motion.main>
  //   )
  // );

  return (
    <motion.main
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ ease: "easeOut", duration: 1 }}
      className="min-h-screen bg-gradient-to-r from-blue-100 via-white to-green-100 flex flex-col items-center px-4 py-10 text-center"
    >
      {/* ---------- Hero Section ---------- */}
      <h1 className="text-3xl md:text-4xl font-extrabold text-blue-800 mb-4">
        Welcome to Inventory Trackor
      </h1>

      <div className="mt-6 mb-10 flex flex-col justify-evenly sm:flex-row gap-8 max-w-5xl">
        <div className="max-w-[480px]">
          <img
            className="rounded-2xl shadow-xl"
            src="./loginInventoryTrackor.jpg"
            alt="role-photo"
          />
        </div>

        <span className="flex flex-col justify-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-700 drop-shadow-lg text-center italic">
            “Your Inventory, Your Space.”
          </h2>
          <p className="mt-3 text-gray-600 text-lg">
            Manage everything you own — effortlessly and securely, all in one
            dashboard.
          </p>
        </span>
      </div>

      {/* ---------- Feature Section ---------- */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="w-full max-w-6xl px-4 py-10 grid grid-cols-1 sm:grid-cols-3 gap-8 text-center"
      >
        <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition">
          <FaBolt className="text-green-500 text-4xl mb-4 mx-auto" />
          <h3 className="text-xl font-semibold mb-2 text-gray-800">
            Fast & Easy
          </h3>
          <p className="text-gray-600">
            Add, edit, and organize items in seconds with a clean, intuitive
            interface.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition">
          <FaShieldAlt className="text-blue-600 text-4xl mb-4 mx-auto" />
          <h3 className="text-xl font-semibold mb-2 text-gray-800">
            Secure & Private
          </h3>
          <p className="text-gray-600">
            Your inventory data stays only with you — encrypted and never
            shared.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition">
          <FaUserLock className="text-green-700 text-4xl mb-4 mx-auto" />
          <h3 className="text-xl font-semibold mb-2 text-gray-800">
            Personal Dashboard
          </h3>
          <p className="text-gray-600">
            Built just for you — your own private space to track your belongings
            anytime.
          </p>
        </div>
      </motion.section>

      {/* ---------- Call to Action Section ---------- */}
      <div className="w-full flex flex-col items-center gap-6 mt-8 mb-16">
        <div className="text-2xl sm:text-3xl font-semibold text-gray-800">
          Ready to take control of your inventory?
        </div>
        <div className="flex flex-col sm:flex-row gap-6">
          <Link
            to={"/user/login"}
            className="px-8 py-4 bg-green-500 text-white rounded-xl font-bold text-lg shadow-lg hover:bg-green-600 transition"
          >
            🔐 Login to Your Inventory
          </Link>
          <Link
            to={"/user/register"}
            className="px-8 py-4 bg-blue-600 text-white rounded-xl font-bold text-lg shadow-lg hover:bg-blue-700 transition"
          >
            📝 Sign Up
          </Link>
        </div>
      </div>
    </motion.main>
  );
};

export default LandingPage;
