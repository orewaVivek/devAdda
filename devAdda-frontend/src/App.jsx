/* eslint-disable no-unused-vars */
// import { useState } from 'react'
import "./App.css";
import Profile from "./components/Profile";
import Home from "./pages/Home";
import Login from "./components/Login";
import Connections from "./components/Connections";
// import Requests from "./components/Requests";
import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import { Provider, useSelector } from "react-redux";
import { appStore } from "./utils/appStore";
import Feed from "./pages/Feed";
import SignUp from "./components/SignUp";
import Requests from "./components/Requests";
import UserProfile from "./components/UserProfile";
import Welcome from "./pages/welcome";
import RequireWelcomeRedirect from "./components/RequireWelcomeRedirect";
import { useEffect } from "react";

function App() {
  const user = useSelector((store) => store.user);
  const isLoggedIn = Boolean(user);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <RequireWelcomeRedirect isLoggedIn={isLoggedIn}>
              <Home />
            </RequireWelcomeRedirect>
          }
        >
          <Route index element={<Feed />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="profile" element={<Profile />} />
          <Route path="connections" element={<Connections />} />
          <Route path="requests" element={<Requests />} />
          <Route path="getProfile/:userId" element={<UserProfile />} />
        </Route>

        <Route
          path="/welcome"
          element={
            <RequireWelcomeRedirect isLoggedIn={isLoggedIn}>
              <Welcome />
            </RequireWelcomeRedirect>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
