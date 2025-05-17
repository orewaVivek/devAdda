import { useEffect, useState } from "react";
import Typewriter from "typewriter-effect";
import WelcomeContent from "../components/WelcomeContent";

function Welcome() {
  const [showOverlay, setShowOverlay] = useState(true);
  const [showText, setShowText] = useState(true);

  useEffect(() => {
    const totalDuration = 1000 + 1500 + 5000 + 1000;
    const cleanup = setTimeout(() => {
      setShowText(false);
      setShowOverlay(false);
    }, totalDuration + 2000);

    return () => clearTimeout(cleanup);
  }, []);

  return (
    <div
      className={`absolute h-screen w-full bg-contain bg-center transition-all duration-1000 ${
        showOverlay ? "" : "blur-none"
      }`}
      style={{
        backgroundImage: "url('/devAdda_background.png')",
      }}
    >
      {/* Gradient & blur overlay */}
      {showOverlay && (
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 to-black/40 backdrop-blur-sm transition-opacity duration-1000 " />
      )}
      {/* Centered typewriter text with glass effect */}
      {showText && (
        <div className="relative z-10 flex justify-center items-center h-full w-full">
          <div className="bg-white/10 backdrop-blur-lg px-6 py-4 rounded-xl shadow-xl animate-fade-in max-w-3/4 h-auto md:h-[180px] flex items-center justify-center">
            <h1
              className="text-white text-4xl md:text-6xl font-mono text-center leading-relaxed"
              style={{ fontFamily: "'Courier New', Courier, monospace" }}
            >
              <Typewriter
                options={{
                  loop: false,
                  delay: 65,
                  deleteSpeed: 40,
                }}
                onInit={(typewriter) => {
                  typewriter
                    .typeString(`Welcome to <span class="glow">devAdda</span>`)
                    .pauseFor(1500)
                    .deleteAll()
                    .typeString(
                      `<span class="sub-text">Enjoy Connecting with other developers!</span>`
                    )
                    .pauseFor(2000)
                    .start();
                }}
              />
            </h1>
          </div>
        </div>
      )}
      {/* Custom styles for the glow and sub-text */}
      <style>
        {`
          .glow {
  color: #ffffff;
  background: linear-gradient(to right, #00b4d8, #0077b6);
  padding: 2px 10px;
  font-weight: 800;
  border-radius: 6px;
  -webkit-text-stroke: 0.5px #000;
  box-shadow: 0 2px 8px rgba(0, 183, 255, 0.4);
  transition: all 0.3s ease-in-out;
}

          .sub-text {
            color: #ccc;
            font-weight: 600;
            text-shadow: 0 0 3px #000;
          }
          .animate-fade-in {
            animation: fadeIn 1.5s ease-out;
          }
          @keyframes fadeIn {
            0% { opacity: 0; transform: scale(0.95); }
            100% { opacity: 1; transform: scale(1); }
          }
        `}
      </style>
      {!showText && <WelcomeContent />}
    </div>
  );
}

export default Welcome;
