import { useState } from "react";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Logic } from "../store/Context";

const LoginPage = () => {
  const { LoggedInStatus } = useContext(Logic);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");

  const loginHandler = async (e) => {
    e.preventDefault();
    const data = await LoggedInStatus(email, password);
    setErr(data?.message);

    if (data.message === "Login successful") {
      setEmail("");
      setPassword("");
      setErr("");
      navigate("/home/dashboard");
    }
  };

  return (
    <div className="bg-[url(/loginInventoryTrackor.jpg)] min-h-screen bg-cover">
      <div className="h-full flex flex-col gap-4 justify-center items-center min-h-screen px-2 py-2 min-w-[350px] sm:min-w-[450px] ">
        <h1 className="text-2xl font-bold sm:text-3xl">
          Login to your <u>INVENTORY</u>
        </h1>
        {err && (
          <div className="font-extrabold">
            <p className="text-red-600 bg-yellow-400 px-4 py-2 rounded-lg">
              - {err}
            </p>
          </div>
        )}
        <form
          onSubmit={(e) => loginHandler(e)}
          className="border max-w-[1000px] min-w-[300px] rounded-xl flex flex-col backdrop-blur-xl border-white items-center mt-2 px-2 py-4 hover:border-green-500 hover:shadow-xl hover:shadow-gray-700"
        >
          <div className="flex flex-col p-4 w-full mb-4 mt-2 gap-4">
            <label htmlFor="email">Email</label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type="email"
              name="email"
              placeholder="eg. test@example.com"
            />

            <label htmlFor="password">Password</label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type="password"
              name="password"
              placeholder="eg. 123456"
            />
          </div>

          <div className="mb-1 text-left w-full">
            ~New uesr?
            <p>
              <Link to={"/user/register"} className="text-blue-600 px-3">
                REGISTER yourself
              </Link>
            </p>
          </div>
          <button className="bg-green-500 font-bold text-white w-25 mb-2 py-2 cursor-pointer rounded-[10px] inline hover:bg-green-600">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
