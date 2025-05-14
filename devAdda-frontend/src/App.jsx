// import { useState } from 'react'
import "./App.css";
import Profile from "./components/Profile";
import Home from "./pages/Home";
import Login from "./components/Login";
import Connections from "./components/Connections";
// import Requests from "./components/Requests";
import { BrowserRouter, Route, Routes } from "react-router";
import { Provider } from "react-redux";
import { appStore } from "./utils/appStore";
import Feed from "./pages/Feed";
import SignUp from "./components/SignUp";
import Requests from "./components/Requests";
import UserProfile from "./components/UserProfile";

function App() {
  return (
    <>
      <Provider store={appStore}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />}>
              <Route path="/" element={<Feed />} />
              <Route path="login" element={<Login />} />
              <Route path="signup" element={<SignUp />} />
              <Route path="profile" element={<Profile />} />
              <Route path="connections" element={<Connections />} />
              <Route path="requests" element={<Requests />} />
              <Route path="/getProfile/:userId" element={<UserProfile />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
