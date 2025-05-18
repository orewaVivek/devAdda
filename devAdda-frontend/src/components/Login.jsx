import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";
import { Link, useNavigate } from "react-router";
import { BASE_URL } from "../utils/constants";

function Login() {
  const user = useSelector((store) => store.user);
  const navigate = useNavigate();
  useEffect(
    function () {
      if (user !== null) navigate("/");
    },
    [user]
  );

  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  if (user !== null) {
    return null;
  }

  const handleNewEmailId = (e) => {
    setEmailId(e.target.value);
  };
  const handleNewPassoword = (e) => {
    setPassword(e.target.value);
  };
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        {
          emailId,
          password,
        },
        { withCredentials: true }
      );
      dispatch(addUser(res.data.data));
      console.log("reaching navigation code");
      navigate("/");
    } catch (err) {
      if (err.response && err.response.data) {
        // Update the error state to display the custom error message
        setError(err.response.data.message);
        console.log("Error:", err.response.data.message);
      } else {
        // Handle general errors
        setError("Something went wrong. Please try again.");
        console.log("Error:", err.message);
      }
    }
  };

  return (
    <div className="flex justify-center my-10">
      <div className="bg-base-300 p-10 rounded w-96 shadow-xl border-[2px]">
        <h1 className="text-2xl font-bold text-center pb-6">Login</h1>
        <form className="grid gap-6" onSubmit={handleLoginSubmit}>
          <div className="flex flex-col gap-2">
            <label htmlFor="email">Email Id </label>
            <input
              id="email"
              type="email"
              className="border p-2 text-sm rounded"
              placeholder="you@example.com"
              value={emailId}
              onChange={handleNewEmailId}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="password">Password </label>
            <input
              id="password"
              type="password"
              className="border p-2 rounded text-sm"
              placeholder="••••••••"
              value={password}
              onChange={handleNewPassoword}
            />
          </div>
          <p className="text-red-500"> {error}</p>
          <div className="flex justify-center">
            <button className="btn btn-primary w-full mt-4">Login</button>
          </div>
        </form>
        <div className="mt-5 flex justify-around ml-15 mr-15">
          <p>New User ? &nbsp; 👉</p>
          <Link
            to="/signup"
            className="text-blue-300 hover:text-blue-500 transition"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
