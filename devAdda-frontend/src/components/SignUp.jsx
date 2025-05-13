import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { BASE_URL } from "../utils/constants";
import { addUser } from "../utils/userSlice";

function SignUp() {
  const [emailId, setEmailId] = useState("vivekdesai1205@gmail.com");
  const [password, setPassword] = useState("itsMyPassword@1215");
  const [firstName, setFirstName] = useState("Vivek");
  const [lastName, setLastName] = useState("Desai02");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleNewEmailId = (e) => {
    setEmailId(e.target.value);
  };
  const handleNewPassoword = (e) => {
    setPassword(e.target.value);
  };
  const handleSignUpSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        BASE_URL + "/signup",
        { firstName: firstName, lastName: lastName, emailId, password },
        { withCredentials: true }
      );
      dispatch(addUser(res.data.data));
      console.log("Login successful");
      navigate("/");
      // console.log(res.data.data);
    } catch (err) {
      console.log("Error :", err.message);
    }
  };

  return (
    <div className="flex justify-center my-10 ">
      <div className="bg-base-300 p-10 rounded  shadow-xl w-130">
        <h1 className="text-2xl font-bold text-center pb-6">Sign Up</h1>
        <form className="grid gap-6" onSubmit={handleSignUpSubmit}>
          <div className="flex flex-col gap-2 ">
            <label htmlFor="firstName">First Name : </label>
            <input
              id="firstName"
              type="text"
              className="border p-2 text-sm rounded "
              placeholder=""
              value={firstName}
              onChange={(value) => setFirstName(value.target.value)}
            />
          </div>
          <div className="flex flex-col gap-2 ">
            <label htmlFor="lastName">Last Name : </label>
            <input
              id="lastName"
              type="text"
              className="border p-2 text-sm rounded "
              placeholder=""
              value={lastName}
              onChange={(val) => setLastName(val.target.value)}
            />
          </div>
          <div className="flex flex-col gap-2 ">
            <label htmlFor="email">Email Id : </label>
            <input
              id="email"
              type="email"
              className="border p-2 text-sm rounded "
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

          <div className="flex justify-center">
            <button className="btn btn-primary w-full mt-4">Sign Up</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
