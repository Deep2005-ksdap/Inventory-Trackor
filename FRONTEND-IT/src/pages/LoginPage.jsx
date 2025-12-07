import { useState } from "react";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../store/AuthContext";
import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import Loader from "../components/layout/Loader";

const LoginPage = () => {
  const { login, loading } = useContext(AuthContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleDemoLogin = async () => {
    const { data, ok } = await login("test@example.com", "123456");
    setErr(data?.message);

    if (ok) {
      navigate("/home/dashboard");
    }
  };

  const loginHandler = async (e) => {
    e.preventDefault();

    const { ok, data } = await login(email, password);
    console.log({ ok });
    setErr(data?.message);

    if (ok) {
      navigate("/home/dashboard");
    }
  };

  return (
    <div className="bg-[url(/loginInventoryTrackor.jpg)] min-h-screen bg-cover bg-center flex items-center justify-center px-4">
      <div className="backdrop-blur-lg rounded-2xl shadow-2xl max-w-md w-full p-8 flex flex-col items-center">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-6 text-center">
          Login to your <span className="text-green-600">INVENTORY</span>
        </h1>

        {err && (
          <p className="w-full bg-red-100 text-red-600 px-4 py-2 rounded-lg mb-4 font-semibold text-center">
            - {err}
          </p>
        )}

        <form
          onSubmit={(e) => loginHandler(e)}
          className="w-full flex flex-col gap-5"
        >
          <div className="flex flex-col gap-4">
            <div className="flex flex-col">
              <label htmlFor="email" className="text-gray-700 font-medium mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                placeholder="eg. test@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="px-4 py-2 rounded-lg border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition"
                required
              />
            </div>

            <div className="flex flex-col">
              <div className="w-full flex justify-between">
                <label
                  htmlFor={showPassword ? "text" : "password"}
                  className="text-gray-700 font-medium mb-1"
                >
                  Password
                </label>
                <span
                  className="cursor-pointer font-semibold"
                  onClick={() => {
                    if (showPassword) {
                      setShowPassword(false);
                    } else {
                      setShowPassword(true);
                    }
                  }}
                >
                  {showPassword ? (
                    <FaEyeSlash className="text-2xl" />
                  ) : (
                    <FaEye className="text-2xl" />
                  )}
                </span>
              </div>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="eg. 123456"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="px-4 py-2 rounded-lg border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition"
                required
              />
            </div>
          </div>

          <div className="mt-4 mb-1">
            <div className="text-sm text-gray-700 ">
              ~New user?
              <Link
                to="/user/register"
                className="text-blue-600 font-semibold ml-1 hover:underline"
              >
                REGISTER
              </Link>{" "}
              yourself
            </div>
            <button
              type="button"
              onClick={handleDemoLogin}
              className={`w-full mb-3 mt-3 bg-blue-400/10 hover:bg-blue-600 text-black hover:text-white font-bold py-2 rounded-lg transition ${
                loading ? "cursor-wait opacity-70 hover:bg-blue-500" : ""
              }`}
            >
              {loading ? <Loader type="button" /> : "Demo Login"}
            </button>

            <button
              type="submit"
              className={`w-full bg-green-500 hover:bg-green-600 text-white 
  font-bold py-2 rounded-lg transition 
  ${loading ? "cursor-wait opacity-70 hover:bg-green-500" : ""}`}
            >
              {loading ? <Loader type="button" /> : "Login"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
