import React from "react";
import { auth } from "../../firebase";
import { Navigate } from "react-router-dom";

export default function Protected({ children }) {
  const user = auth.currentUser;
  if (user) {
    return <>{children}</>;
  }

  return <Navigate to={"/login"} />;
}
