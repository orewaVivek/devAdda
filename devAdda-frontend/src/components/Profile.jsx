import { useEffect, useState } from "react";
import Skills from "./Skills";
import axios from "axios";
import { useSelector } from "react-redux";
import UserCard from "./UserCard";
import { BASE_URL } from "../utils/constants";

function Profile() {
  const [editMode, setEditMode] = useState(false);
  const user = useSelector((store) => store.user);

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
      await setEditMode(false);
    } catch (err) {
      console.log("Error " + err.message);
    }
  };

  return (
    <div className="flex justify-center items-center gap-5">
      <div className="flex justify-center items-center h-screen">
        <div className="h-auto w-[500px] bg-base-300 flex flex-col gap-7 justify-center items-center border p-5 rounded-md pb-10">
          <div className="relative w-full">
            <h1 className="text-3xl font-bold text-center">Profile</h1>
            {!editMode && (
              <button
                className="absolute right-5 top-1/2 -translate-y-1/2 border h-10 w-10 rounded-full flex justify-center items-center text-xl cursor-pointer"
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
                  className={`textarea h-24 w-100 rounded-md px-2 border ${
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
      <div className="border rounded-md border-green-500">
        <UserCard
          user={{ firstName, lastName, age, gender, about, photoURL }}
        />
      </div>
    </div>
  );
}

export default Profile;
