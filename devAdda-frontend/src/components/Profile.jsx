/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import Skills from "./Skills";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import UserCard from "./UserCard";
import { BASE_URL } from "../utils/constants";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router";

function Profile() {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);

  const [editMode, setEditMode] = useState(false);

  // Avoid using the user properties before user is available
  const [firstName, setFirstName] = useState(user?.firstName || "");
  const [lastName, setLastName] = useState(user?.lastName || "");
  const [age, setAge] = useState(user?.age || "");
  const [gender, setGender] = useState(user?.gender || "");
  const [emailID, setEmailID] = useState(user?.emailId || "");
  const [about, setAbout] = useState(user?.about || "");
  const [skill, setSkill] = useState("");
  const [skillSet, setSkillSet] = useState(user?.skills || []);
  const [photoURL, setPhotoURL] = useState(user?.photoURL || "");
  const [alertSuccess, setAlertSuccess] = useState(false);

  useEffect(() => {
    if (user) {
      setFirstName(user.firstName);
      setLastName(user.lastName);
      setAge(user.age);
      setGender(user.gender);
      setEmailID(user.emailId);
      setAbout(user.about);
      setSkillSet(user.skills);
      setPhotoURL(user.photoURL);
    }
  }, [user]);

  const dispatch = useDispatch();

  const handleProfileEdit = async () => {
    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        {
          firstName,
          lastName,
          gender,
          age,
          about,
          skills: skillSet,
          photoURL,
        },
        { withCredentials: true }
      );
      dispatch(addUser(res?.data));
      await setEditMode(false);
      if (res) setAlertSuccess(true);
      setTimeout(() => {
        setAlertSuccess(false);
      }, 4000);
    } catch (err) {
      console.log("Error " + err.message);
    }
  };

  return (
    <div className="flex justify-center items-center gap-5 mt-5">
      {/* Profile Edit */}
      <div className="flex justify-center items-start min-h-screen mt-5">
        <div className="h-auto w-[550px] bg-base-300 flex flex-col gap-7 justify-center items-center border p-5 rounded-md pb-10">
          {/* Alert for updating*/}
          {alertSuccess && (
            <div className="toast toast-top toast-center w-70  my-20">
              <div className="alert alert-success">
                <span className="text-md font-semibold">
                  Profile Saved Successfully. !! ✌️
                </span>
              </div>
            </div>
          )}

          <div className="relative w-full">
            <h1 className="text-3xl font-bold text-center">Profile</h1>
            {!editMode && (
              <button
                className="absolute right-5 top-1/2 -translate-y-1/2 border h-10 w-10 rounded-full flex justify-center items-center text-xl cursor-pointer hover:bg-emerald-700 "
                onClick={() => setEditMode(true)}
              >
                ✎
              </button>
            )}
            {editMode && (
              <button
                className="absolute right-5 top-1/2 -translate-y-1/2 border h-8 w-18 rounded-md flex justify-center items-center text-md cursor-pointer bg-green-600"
                onClick={handleProfileEdit}
              >
                Save
              </button>
            )}
          </div>

          <form className="flex flex-col gap-5 w-full">
            <div className="flex items-center mb-4">
              <label className="w-32 text-md">First Name : </label>
              <input
                type="text"
                className="border h-8 px-2 w-[400px] rounded-md"
                value={firstName}
                onChange={(val) => setFirstName(val.target.value)}
                disabled={!editMode}
              />
            </div>

            <div className="flex items-center mb-4">
              <label className="w-32 text-md">Last Name : </label>
              <input
                type="text"
                className="border h-8 px-2 w-[400px] rounded-md"
                value={lastName}
                onChange={(val) => setLastName(val.target.value)}
                disabled={!editMode}
              />
            </div>

            <div className="flex justify-around w-full">
              <div className="flex items-center mb-4">
                <label className="w-10">Age : </label>
                <input
                  type="number"
                  className="border h-8 px-2 w-[100px] text-center rounded-md"
                  value={age}
                  onChange={(val) => setAge(val.target.value)}
                  disabled={!editMode}
                />
              </div>
              <div className="flex items-center mb-4">
                <label className="w-18">Gender : </label>
                <select
                  className="border p-2 rounded-md text-sm w-[130px]"
                  value={gender}
                  onChange={(val) => setGender(val.target.value)}
                  disabled={!editMode}
                >
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select>
              </div>
            </div>

            {/* <div className="flex items-center mb-2">
              <label className="w-32 text-md">Change Profile Image : </label>
              <input
                type="file"
                accept="image/*" // To restrict file selection to images only
                className="border h-8 px-2 w-[400px] rounded-md"
                onChange={(val)=>setPhotoURL(val.t)} // Handler for when a file is selected
              />
            </div> */}

            <div className="flex items-center mb-2">
              <label className="w-32 text-md">Email Id : </label>
              <input
                type="email"
                disabled
                className="border h-8 px-2 w-[400px] rounded-md "
                value={emailID}
              />
            </div>

            {/* About section */}
            <div className="mb-4 w-full">
              <fieldset className="fieldset text-lg">
                <div className="flex justify-between">
                  <label className="w-32 text-md">About : </label>
                </div>
                <textarea
                  className={`textarea h-24 w-125 rounded-md px-2 border ${
                    !editMode
                      ? "text-white border-white bg-transparent cursor-not-allowed"
                      : ""
                  }`}
                  placeholder="About"
                  value={about}
                  onChange={(e) => setAbout(e.target.value)}
                  readOnly={!editMode}
                />
              </fieldset>
            </div>

            <div className="w-full">
              <Skills
                skill={skill}
                setSkill={setSkill}
                skillSet={skillSet}
                setSkillSet={setSkillSet}
                editMode={editMode}
              />
            </div>
          </form>
        </div>
      </div>
      {/* User Card View */}
      <div className="border rounded-md border-green-500">
        <UserCard
          user={{ firstName, lastName, age, gender, about, photoURL }}
        />
      </div>
    </div>
  );
}

export default Profile;
