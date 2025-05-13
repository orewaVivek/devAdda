/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
function UserCard({ user }) {
  const { firstName, lastName, photoURL, age, gender, about } = user;
  console.log(user);
  return (
    <div>
      <div className="card bg-base-300 w-96 shadow-sm p-4">
        <figure>
          <img src={photoURL || null} alt="User Profile" />
        </figure>
        <div className="card-body">
          <h2 className="card-title flex justify-center">
            {firstName} {lastName}
          </h2>
          <p>
            {age && <span>{age}</span>}
            {age && gender && ", "}
            {gender && <span>{gender}</span>}
          </p>
          <p>{about}</p>
          {/* <p>Age : {age}</p>
          <p>gender : {gender} </p> */}
          <div className="card-actions flex justify-around mt-2 ">
            <button className="btn btn-primary w-30">Ignore</button>
            <button className="btn btn-secondary w-30">Interested</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserCard;
