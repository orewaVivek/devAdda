import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

function WelcomeContent() {
  const user = useSelector((store) => store.user);
  const isLoggedIn = Boolean(user);

  const handleGetStarted = () => {
    if (isLoggedIn) {
      navigate("/"); // Send to home/feed
    } else {
      navigate("/login"); // Send to login
    }
  };
  const navigate = useNavigate();
  return (
    <div className="mt-10 flex flex-col justify-center items-center px-4">
      {/* Fancy devAdda Heading */}

      <div className="mb-10 px-5 py-3  bg-base-100 rounded-2xl shadow-lg  ">
        <h1
          className="text-5xl font-extrabold bg-gradient-to-r from-cyan-400 to-blue-600 text-transparent bg-clip-text drop-shadow-md "
          style={{ WebkitTextStroke: ".8px white" }}
        >
          devAdda
        </h1>
      </div>

      {/* Glass-style Card Container */}
      <div className="bg-white/10 backdrop-blur-2xl font-semibold border border-white/20 rounded-2xl shadow-lg max-w-2xl w-full p-8 md:p-10 flex flex-col items-center gap-6 text-white">
        <h2 className="text-2xl font-semibold">About this App</h2>
        <p className="text-center text-lg leading-relaxed">
          devAdda is a modern community-driven platform built specifically for
          developers, by developers. Whether you&apos;re a beginner looking to
          learn or a pro seeking collaboration, devAdda connects coders,
          creators, and contributors in one powerful hub.
        </p>

        <div className="w-full mt-4">
          <h3 className="text-xl font-semibold mb-3">Key Features</h3>
          <ul className="list-disc list-inside space-y-2 text-base">
            <li>👤 Developer Profiles</li>
            <li>🤝 Project Collaboration</li>
            <li>💬 Real-time Chat</li>
            <li>🌐 Developer Directory & Networking</li>
            <li>🚀 And many more ...</li>
          </ul>
        </div>
      </div>

      {/* Animated Button */}
      <button
        onClick={handleGetStarted}
        className="mt-5 px-6 py-3 rounded-full cursor-pointer bg-white/80 text-black font-bold  shadow-lg hover:scale-105 hover:shadow-xl transition duration-300"
      >
        Get Started then?
      </button>
    </div>
  );
}

export default WelcomeContent;
