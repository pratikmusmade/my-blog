import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function ProtectedRoute({ children, authenticaion = true }) {
  const navigate = useNavigate();
  const [loader, setLoader] = useState();
  // const authStatus = useSelector((state) => state.auth.status);
  const authStatus = true

  useEffect(() => {
    if (authenticaion && authStatus !== authenticaion) {
      navigate("/login");
    } else if (!authenticaion && authStatus !== authenticaion) {
      navigate("/");
    }
    setLoader(false);
  }, [authStatus, navigate, authenticaion]);

  return loader ? <h1>Loading...</h1> : <>{children}</>;
}

export default ProtectedRoute;
