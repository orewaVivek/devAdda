import { Navigate, useLocation } from "react-router-dom";

/* eslint-disable react/prop-types */
export default function RequireWelcomeRedirect({ isLoggedIn, children }) {
  const location = useLocation();

  // If user is NOT logged in and trying to go to home
  if (!isLoggedIn && location.pathname === "/") {
    return <Navigate to="/welcome" replace />;
  }

  // If user IS logged in and somehow lands on /welcome, redirect back to /
  if (isLoggedIn && location.pathname === "/welcome") {
    return <Navigate to="/" replace />;
  }

  return children;
}
