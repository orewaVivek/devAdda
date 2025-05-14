/* eslint-disable no-unused-vars */
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { BASE_URL } from "../utils/constants";
import Skills from "./Skills";
import { useSelector } from "react-redux";

function UserProfile() {
  const userr = useSelector((state) => state.user);
  const navigate = useNavigate();

  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [showMore, setShowMore] = useState(false);

  const toggleShowMore = () => setShowMore((prev) => !prev);

  const getUserProfile = async () => {
    try {
      const res = await axios.get(BASE_URL + "/getProfile/" + userId, {
        withCredentials: true,
      });
      if (res) {
        setUser(res.data);
      }
    } catch (err) {
      console.log("Error" + err.message);
    }
  };

  useEffect(function () {
    getUserProfile();
  }, []);

  if (!user) {
    return <p className="text-center mt-10 text-xl">Loading...</p>;
  }

  const { firstName, lastName, age, gender, about, skills, photoURL } =
    user.data;
  console.log(user.data.skills);
  return (
    <div className="flex justify-center mt-10 mb-20">
      <div className="card bg-base-300 w-96 shadow-sm overflow-hidden">
        {/* Fixed height image */}
        <figure className="h-90 w-full overflow-hidden">
          <img
            src={photoURL}
            className="w-full h-full object-cover"
            alt="User Profile"
          />
        </figure>
        {/* Content section */}
        <div className="pl-4 pr-4 pb-6 pt-2 flex flex-col gap-2">
          <h2 className="card-title text-3xl  flex justify-center mb-1">
            {firstName} {lastName}
          </h2>

          <p>
            {age}
            {age ? "," : ""} {gender}
          </p>

          {/* About with toggle */}
          <div className="relative">
            <p
              className={`text-sm ${
                !showMore ? "line-clamp-3" : ""
              } transition-all duration-200`}
            >
              {about}
            </p>
            {about.length > 100 && (
              <button
                onClick={toggleShowMore}
                className="text-blue-500 text-xs mt-1 underline"
              >
                {showMore ? "Show less" : "Show more"}
              </button>
            )}
          </div>
          <div className="flex flex-col w-full my-1 mt-2 items-start">
            {skills.length > 0 ? (
              <>
                <span className="font-semibold block mb-2">Skills:</span>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill) => (
                    <span
                      key={skill}
                      className="text-sm bg-blue-100 text-blue-800 px-3 py-1 rounded-full shadow-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </>
            ) : (
              <div className="mt-10 ml-20 mr-10">No Skills Yet</div>
            )}
          </div>
        </div>
      </div>
      <button
        className="btn btn-secondary   "
        onClick={() => navigate(-1)} // navigates to previous page
      >
        ← Back
      </button>
    </div>
  );
}

export default UserProfile;
