/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import axios from "axios";
import { useEffect, useState } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequest, removeRequest } from "../utils/requestSlice";
import { addConnections } from "../utils/connectionSlice";
import { useNavigate } from "react-router";

function Requests() {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  //   const [requests, setRequests] = useState([]);
  const [successMsg, setSuccessMsg] = useState(false);
  const requests = useSelector((store) => store.requests);
  const dispatch = useDispatch();
  const getRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/requests/recieved", {
        withCredentials: true,
      });
      console.log(res.data.data);
      //   setRequests(res.data.data);
      dispatch(addRequest(res.data.data));
    } catch (err) {
      console.log("Error: " + err.message);
    }
  };

  useEffect(() => {
    getRequests();
  }, []);

  if (!requests) return;
  if (requests.length === 0)
    return (
      <p className="flex justify-center items-center text-4xl font-bold ">
        No Requests Yet
      </p>
    );

  return (
    <div className="flex flex-col items-center ">
      <p className="mt-10 font-bold text-3xl">Connection Requests</p>

      {successMsg && (
        <div className="toast toast-top toast-end mt-6 mr-6">
          <div className="alert alert-success">
            <span>Request Sent Successfully</span>
          </div>
        </div>
      )}

      {requests.map((request) => (
        <RequestCard
          key={request._id}
          request={request}
          setSuccessMsg={setSuccessMsg}
        />
      ))}
    </div>
  );
}

function RequestCard({ request, setSuccessMsg }) {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.requests);
  const sender = request.senderId;
  console.log("sender : ", sender._id);
  const navigate = useNavigate();

  const handleProfileView = () => {
    navigate(`/getProfile/${sender._id}`);
  };

  useEffect(() => {
    console.log("Updated requests:", requests);
  }, [requests]);

  const handleReview = async (status, userId) => {
    try {
      const res = await axios.post(
        BASE_URL + `/request/review/${status}/${userId}`,
        {},
        { withCredentials: true }
      );
      console.log("reaching dispatch function");
      dispatch(removeRequest(userId));
      setSuccessMsg(true);
      setTimeout(() => {
        setSuccessMsg(false);
      }, 3000);
    } catch (err) {
      console.log("Error encountered while accepting request" + err.message);
    }
  };
  return (
    <div className="flex justify-center mt-5">
      <div className="h-30 w-180 bg-base-300 rounded-xl flex flex-row justify-between items-center ">
        <div
          className="cursor-pointer flex gap-3 w-80"
          onClick={handleProfileView}
        >
          <img
            src={sender.photoURL || "/default-avatar.png"}
            className="h-30 w-30 object-cover rounded-lg"
            alt="User"
          />

          <div className="flex flex-col justify-center w-70 items-start pl-3">
            <span className="text-2xl font-bold ">
              {sender.firstName} {sender.lastName}
            </span>
            <span>
              {sender.age ? `${sender.age}, ` : ""}
              {sender.gender || ""}
            </span>
          </div>
        </div>

        <div className="flex flex-col w-70 my-1 h-30 mt-2  overflow-hidden items-start">
          {sender.skills.length > 0 && (
            <>
              <span className="font-semibold block mb-2">Skills:</span>
              <div className="flex flex-wrap gap-2 max-h-24 overflow-hidden">
                {sender.skills.slice(0, 5).map((skill) => (
                  <span
                    key={skill}
                    className="text-sm bg-blue-100 text-blue-800 px-3 py-1 rounded-full shadow-sm"
                  >
                    {skill}
                  </span>
                ))}

                {sender.skills.length > 5 && (
                  <span className="text-sm bg-gray-200 text-gray-700 px-3 py-1 rounded-full shadow-sm">
                    +{sender.skills.length - 5} more
                  </span>
                )}
              </div>
            </>
          )}
          {sender.skills.length === 0 && (
            <div className="mt-10 ml-20 mr-10"> No Skills Yet</div>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <button
            className="bg-green-500 h-13 w-23  rounded-md text-white cursor-pointer"
            onClick={() => handleReview("accepted", sender._id)}
          >
            Accept
          </button>
          <button
            className="bg-red-500 h-13 w-23  rounded-md text-white cursor-pointer"
            onClick={() => handleReview("accepted", sender._id)}
          >
            Reject
          </button>
        </div>
      </div>
    </div>
  );
}

export default Requests;
