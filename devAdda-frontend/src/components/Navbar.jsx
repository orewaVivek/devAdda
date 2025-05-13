import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router";
import { BASE_URL } from "../utils/constants";
import { removeUser } from "../utils/userSlice";

export default function NavBar() {
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  //   console.log(user);

  const handleLogOut = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/logout", // Make sure this endpoint exists in your backend
        {},
        { withCredentials: true } // Send credentials to clear the cookie
      );

      // Clear the user from Redux store
      dispatch(removeUser()); // This should reset user-related state in Redux

      // After successful logout, navigate to login page
      if (res.status === 200) {
        navigate("/login");
      }
    } catch (err) {
      console.log("Error during logout: ", err.message);
    }
  };

  return (
    <>
      <div
        className="navbar bg-neutral shadow-sm mt-2 pt-2 pb-2 rounded-lg"
        style={{ border: "0.7px solid #ccc" }}
      >
        <div className="flex-1">
          <div className="text-2xl font-mono tracking-wide flex items-center gap-3 no-underline hover:bg-transparent hover:text-inherit focus:outline-none">
            <div className="bg-gradient-to-r from-cyan-400 to-blue-600 p-[2px] rounded-full inline-block">
              <Link to="/">
                <span className="text-4xl bg-base-100 rounded-full p-2 flex items-center justify-center">
                  🕸️
                </span>
              </Link>
            </div>{" "}
            <Link to="/">
              <span className="bg-gradient-to-r from-cyan-400 to-blue-600 text-transparent bg-clip-text font-extrabold">
                devAdda
              </span>
            </Link>
          </div>
        </div>
        <div className="flex gap-2">
          {/* <input
              type="text"
              placeholder="Search..."
              className="input input-bordered w-104 md:w-auto"
            /> */}
          {user && (
            <div className="dropdown dropdown-end mx-7 ">
              Welcome, {user.firstName}{" "}
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  <img
                    alt="Tailwind CSS Navbar component"
                    src={user.photoURL}
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
              >
                <li>
                  <Link to="/profile" className="justify-between">
                    Profile
                    <span className="badge">New</span>
                  </Link>
                </li>
                <li>
                  <a>Settings</a>
                </li>
                <li>
                  <a onClick={handleLogOut}>Logout</a>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
