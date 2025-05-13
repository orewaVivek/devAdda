// import { useState } from 'react'
import "./App.css";
import Profile from "./components/Profile";
import Home from "./pages/Home";
import Login from "./components/Login";

function App() {
  return (
    <>
      <Provider store={appStore}>
        <BrowserRouter basename="/">
          <Routes>
            <Route path="/" element={<Home />}>
              <Route path="/" element={<Feed />} />
              <Route path="login" element={<Login />} />
              <Route path="signup" element={<SignUp />} />
              <Route path="profile" element={<Profile />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  );
}
import { BrowserRouter, Route, Routes } from "react-router";
import { Provider } from "react-redux";
import { appStore } from "./utils/appStore";
import Feed from "./pages/Feed";
import SignUp from "./components/SignUp";

export default App;
