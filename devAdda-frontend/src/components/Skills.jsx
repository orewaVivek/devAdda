/* eslint-disable react/prop-types */
// import { useState } from "react";

export default function Skills({
  skill,
  skillSet,
  setSkill,
  setSkillSet,
  editMode,
}) {
  return (
    <div className="flex flex-col gap-4 items-start">
      <p className="text-md ">Skills:</p>
      <AddSkills
        skill={skill}
        setSkill={setSkill}
        skillSet={skillSet}
        setSkillSet={setSkillSet}
        editMode={editMode}
      />
      <SkillStorage
        skillSet={skillSet}
        setSkillSet={setSkillSet}
        editMode={editMode}
      />
    </div>
  );
}

function AddSkills({ skill, setSkill, skillSet, setSkillSet, editMode }) {
  const handleNewSkillAddition = (skill) => {
    if (!skill.trim()) return;
    else if (skillSet.includes(skill)) {
      alert("Skill already exists !!");
      return;
    } else setSkillSet((val) => [...val, skill]);
    setSkill(""); // Clear the input after adding the skill
  };

  const handleClick = (e) => {
    e.preventDefault(); // Prevent the form from submitting (which causes re-render)
    handleNewSkillAddition(skill);
  };

  return (
    editMode && (
      <div className="flex mx-20">
        <input
          type="text"
          className="h-10 w-70 bg-base-100 text-xs border p-2 rounded-md"
          placeholder="Add a Skill.."
          value={skill}
          onChange={(e) => setSkill(e.target.value)}
        />
        <button
          className="h-10 w-13 border btn btn-primary mx-1"
          onClick={handleClick}
        >
          Add
        </button>
      </div>
    )
  );
}

function SkillStorage({ skillSet, setSkillSet, editMode }) {
  return (
    <div className="w-full flex flex-wrap gap-3 ">
      {skillSet &&
        skillSet.map((skill) => (
          <SkillCard
            key={skill}
            skill={skill}
            setSkillSet={setSkillSet}
            editMode={editMode}
          />
        ))}
    </div>
  );
}

function SkillCard({ skill, setSkillSet, editMode }) {
  const handleDeleteSkill = (curSkill) => {
    setSkillSet((prev) => prev.filter((skill) => skill !== curSkill));
  };

  return (
    <>
      <div className="flex justify-center">
        <div className="w-auto min-w-[125px] h-8 px-4 bg-gray-200 text-gray-800 border-2 border-gray-400 rounded-md text-sm flex justify-center items-center transition-all hover:bg-gray-300 hover:shadow-lg">
          {skill}
        </div>
        {editMode && (
          <button
            className="border h-8 w-7 cursor-pointer rounded-lg btn btn-secondary"
            onClick={(e) => {
              e.preventDefault();
              handleDeleteSkill(skill);
            }}
          >
            x
          </button>
        )}
      </div>
    </>
  );
}
