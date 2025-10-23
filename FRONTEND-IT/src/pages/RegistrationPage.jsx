import { useContext, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { Logic } from "../store/Context";

const RegistrationPage = () => {
  const { setIsLoggedIn } = useContext(Logic);
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
      const res = await fetch(`${import.meta.env.VITE_API_URL}/user/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullname, email, password }),
      });

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
    <div className="bg-[url(/loginInventoryTrackor.jpg)] min-h-screen bg-cover">
      <div className="h-full flex flex-col gap-4 justify-center items-center px-2 py-2 min-w-[300px]">
        <h1 className="text-3xl font-bold">Create Your Account</h1>
        {err && (
          <div className="font-extrabold">
            <p className="text-red-600 text-center px-4 py-2 rounded-lg">
              {err.message}
            </p>
            {err.errors
              ? err.errors.map((item) => (
                  <p className="text-red-600 bg-yellow-300 px-4 py-2 rounded-lg mb-1">
                    -{item.msg}{" "}
                  </p>
                ))
              : null}
          </div>
        )}
        <form
          onSubmit={handleRegisteration}
          className="border max-w-[1000px] min-w-[350px] rounded-xl flex flex-col backdrop-blur-xl border-white items-center mt-2 px-2 py-4 hover:border-green-500 hover:shadow-xl hover:shadow-gray-700"
        >
          <div className="flex flex-col p-4 w-full mb-4 mt-2 gap-4">
            <label htmlFor="firstname lastname">Full Name</label>
            <input
              value={firstname}
              type="text"
              name="firstname"
              id="firstname"
              placeholder="Firstname"
              className="mb-1"
              onChange={(e) => setFirstname(e.target.value)}
            />
            <input
              value={lastname}
              type="text"
              name="lastname"
              id="lastname"
              onChange={(e) => setLastname(e.target.value)}
              placeholder="lastname (optional)"
            />

            <label htmlFor="email">Email:</label>
            <input
              value={email}
              type="email"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="eg. test@example.com"
            />

            <label htmlFor="password">Password:</label>
            <input
              value={password}
              type="password"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="your password"
            />
          </div>

          <p className="mb-1">
            ~ already have an
            <Link className="text-blue-600" to={"/user/login"}>
              Account
            </Link>
            ?
          </p>
          <button className="bg-green-500 font-bold text-white w-25 mb-2 py-2 cursor-pointer rounded-[10px] inline hover:bg-green-600">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegistrationPage;
