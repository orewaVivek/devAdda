/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";
import { useNavigate } from "react-router";

function Connections() {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  const connections = useSelector((store) => store.connections);
  console.log("connecctionreducer data : ", connections);
  const dispatch = useDispatch();

  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      //   setConnections(res.data.data);
      dispatch(addConnections(res.data.data));
      console.log(res.data.data);
    } catch (err) {
      console.log("Error encountered in fetchConnections fn" + err.message);
    }
  };

  useEffect(function () {
    fetchConnections();
  }, []);

  if (!connections) return;
  if (connections.length === 0)
    return (
      <p className="flex justify-center items-center text-4xl font-bold ">
        No Connections found
      </p>
    );

  return (
    <div className="flex justify-center flex-col items-center gap-10 mt-10 mb-20">
      <p className="text-3xl font-bold">Connections</p>
      {connections.map((connection) => (
        <ConnectionCard key={connection._id} connection={connection} />
      ))}
    </div>
  );
}

function ConnectionCard({ connection }) {
  const navigate = useNavigate();

  return (
    <div className="bg-base-300 h-30 w-160 rounded-md border-t-[0.5px] border-b-[0.5px]">
      <div className="flex justify-between ">
        <div className="flex gap-4">
          <img
            src={connection.photoURL || "/default-avatar.png"}
            className="h-30 w-30 object-cover rounded-lg"
            alt="User"
          />

          <div className="mt-4 flex flex-col gap-2 w-45">
            <p className="text-xl  font-bold mr-4">
              {connection.firstName} {connection.lastName}
            </p>
            <p className="text-sm ">
              {connection.age}
              {connection.age ? "," : ""} {connection.gender}
            </p>
          </div>
        </div>

        {/* Skills Section */}
        <div className="w-70 my-1 h-25 overflow-hidden border-lef flex flex-col items-start">
          <span className="font-semibold block mb-2">Skills:</span>
          <div className="flex flex-wrap gap-2">
            {connection.skills.slice(0, 6).map((skill) => (
              <span
                key={skill}
                className="text-sm bg-blue-100 text-blue-800 px-3 py-1 rounded-full shadow-sm"
              >
                {skill}
              </span>
            ))}

            {connection.skills.length > 6 && (
              <span className="text-sm bg-gray-200 text-gray-700 px-3 py-1 rounded-full shadow-sm">
                +{connection.skills.length - 6} more
              </span>
            )}
          </div>
        </div>

        <button
          className="h-30 w-25 text-sm border rounded-md btn btn-primary"
          onClick={() => {
            navigate(`/getProfile/${connection._id}`);
            console.log(connection);
          }}
        >
          View Profile
        </button>
      </div>
    </div>
  );
}

export default Connections;
