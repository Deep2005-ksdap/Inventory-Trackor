import { useContext, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { AuthContext } from "../store/AuthContext";
import { api } from "../store/api";

const RegistrationPage = () => {
  const { setIsLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState();

  const fullname = {
    firstname: firstname,
    lastname: lastname,
  };

  const registeration = async (fullname, email, password) => {
    if(email || password || fullname){
        alert("Fill your Details")
      }
    try {
      const res = await api("/user/register",{
        method: "POST",
        body: {fullname, email, password}
      }
      )

      const data = await res.json();
      if (res.status === 400) {
        setErr(data);
      }
      if (res.ok) {
        setIsLoggedIn(true);
        navigate("/user/login");
      }
    } catch (err) {
      console.error("error in submit the Detail:", err);
    }
  };

  const handleRegisteration = async (e) => {
    e.preventDefault();

    await registeration(fullname, email, password);

    setFirstname("");
    setLastname("");
    setEmail("");
    setPassword("");
    setErr("");
  };

  return (
    <div className="bg-[url(/loginInventoryTrackor.jpg)] min-h-screen bg-cover bg-center flex items-center justify-center px-4">
  <div className="backdrop-blur-lg rounded-2xl shadow-2xl max-w-md w-full p-8 flex flex-col items-center">
    <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-6 text-center">
      Create Your <span className="text-green-600">Account</span>
    </h1>

    {err && (
      <div className="w-full mb-4">
        <p className="text-red-600 text-center bg-red-100 px-4 py-2 rounded-lg font-semibold">
          {err.message}
        </p>
        {err.errors &&
          err.errors.map((item, index) => (
            <p
              key={index}
              className="text-red-700 bg-yellow-100 px-4 py-2 rounded-lg mb-1 font-medium"
            >
              - {item.msg}
            </p>
          ))}
      </div>
    )}

    <form
      onSubmit={handleRegisteration}
      className="w-full flex flex-col gap-5"
    >
      <div className="flex flex-col gap-4">
        <div className="flex flex-col">
          <label htmlFor="firstname" className="text-gray-700 font-medium mb-1">
            First Name
          </label>
          <input
            type="text"
            name="firstname"
            id="firstname"
            placeholder="Firstname"
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
            className="px-4 py-2 rounded-lg border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition"
            required
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="lastname" className="text-gray-700 font-medium mb-1">
            Last Name (optional)
          </label>
          <input
            type="text"
            name="lastname"
            id="lastname"
            placeholder="Lastname"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
            className="px-4 py-2 rounded-lg border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="email" className="text-gray-700 font-medium mb-1">
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="eg. test@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="px-4 py-2 rounded-lg border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition"
            required
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="password" className="text-gray-700 font-medium mb-1">
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="px-4 py-2 rounded-lg border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition"
            required
          />
        </div>
      </div>

      <p className="text-sm text-gray-700 mt-1 mb-4 text-center">
        ~ Already have an{" "}
        <Link to="/user/login" className="text-blue-600 font-semibold hover:underline">
          Account
        </Link>
        ?
      </p>

      <button
        type="submit"
        className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 rounded-lg transition"
      >
        Submit
      </button>
    </form>
  </div>
</div>

  );
};

export default RegistrationPage;
