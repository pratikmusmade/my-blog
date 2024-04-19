import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function ProtectedRoute({ childern, authenticaion = true }) {
  const navigate = useNavigate();
  const [loader, setLoader] = useState();
  const authStatus = useSelector((state) => state.auth.status);

  useEffect(() => {
    if (authenticaion && authStatus !== authenticaion) {
      navigate("/login");
    } else if (!authenticaion && authStatus !== authenticaion) {
      navigate("/");
    }
  }, [authStatus, navigate, authenticaion]);

  return <div>ProtectedRoute</div>;
}

export default ProtectedRoute;
