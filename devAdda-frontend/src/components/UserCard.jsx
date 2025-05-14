/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import axios from "axios";
import { useEffect, useState } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice";

function UserCard({ user }) {
  const { firstName, lastName, photoURL, age, gender, about, _id } = user;
  const [showMore, setShowMore] = useState(false);
  const dispatch = useDispatch();
  console.log("User card : ", user);
  const toggleShowMore = () => setShowMore((prev) => !prev);

  const handleUserCard = async (status, _id) => {
    try {
      const res = await axios.post(
        BASE_URL + `/request/send/${status}/${_id}`,
        {},
        { withCredentials: true }
      );
      dispatch(removeUserFromFeed(_id));
    } catch (err) {
      console.log("Error" + err.message);
    }
  };

  

  return (
    <div>
      <div className="card bg-base-300 w-96 shadow-sm overflow-hidden">
        {/* Fixed height image */}
        <figure className="h-90 w-full overflow-hidden">
          <img
            src={photoURL || "/default-avatar.png"}
            className="w-full h-full object-cover"
            alt="User Profile"
          />
        </figure>

        {/* Content section */}
        <div className="pl-4 pr-4 pb-6 pt-2 flex flex-col gap-2">
          <h2 className="card-title flex justify-center mb-1">
            {firstName} {lastName}
          </h2>

          <p>
            {age && <span>{age}</span>}
            {age && gender && ", "}
            {gender && <span>{gender}</span>}
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

          {/* Action buttons */}
          <div className="card-actions flex justify-around mt-2 ">
            <button
              className="btn btn-primary w-30"
              onClick={() => handleUserCard("ignored", _id)}
            >
              Ignore
            </button>
            <button
              className="btn btn-secondary w-30"
              onClick={() => handleUserCard("interested", _id)}
            >
              Interested
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserCard;
