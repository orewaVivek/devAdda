import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import { useEffect } from "react";
import UserCard from "../components/UserCard";
import { useNavigate } from "react-router";

function Feed() {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  const dispatch = useDispatch();
  const feed = useSelector((store) => store.feed) || []; // Fallback to an empty array

  const getFeed = async () => {
    try {
      if (feed.length > 0) return; // ✅ only fetch if empty
      const res = await axios.get(BASE_URL + "/user/feed", {
        withCredentials: true,
      });
      dispatch(addFeed(res.data));
    } catch (err) {
      console.log("Error: " + err.message);
    }
  };

  useEffect(() => {
    getFeed();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex justify-center my-12">
      {feed.length > 0 ? (
        <UserCard key={feed[0]._id} user={feed[0]} />
      ) : (
        <p className="text-2xl font-bold">No New Users Found !</p>
      )}
    </div>
  );
}

export default Feed;
