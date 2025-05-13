import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
// import Skills from "./components/Skills.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
    {/* <Skills/> */}
    {/* <SkillCard /> */}
  </StrictMode>
);
