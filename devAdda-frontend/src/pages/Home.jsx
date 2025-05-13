/* eslint-disable no-unused-vars */
import { Outlet, useNavigate } from "react-router";
import NavBar from "../components/Navbar";
import Footer from "../components/Footer";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { addUser } from "../utils/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

export default function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((store) => store.user);

  const fetchUser = async () => {
    if (userData) return;

    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/,
      "$1"
    );

    if (!token) {
      console.log("No token found, user is not logged in.");
      navigate("/login");
      return;
    }

    try {
      const user = await axios.get(BASE_URL + "/profile/view", {
        withCredentials: true,
      });

      if (!user) {
        navigate("/login");
      } else {
        dispatch(addUser(user.data));
      }
    } catch (err) {
      console.log("Error encountered:", err);

      if (err.response) {
        console.log("Error response status:", err.response.status);
        console.log("Error response data:", err.response.data);

        if (err.response.status === 401) {
          navigate("/login");
        }
      } else {
        console.log("Error message:", err.message);
      }
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <div className="flex-grow">
        <Outlet />
      </div>
      {/* <Footer /> */}
    </div>
  );
}
