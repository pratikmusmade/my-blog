import "./App.css";
import authService from "./appwrite/auth.js";
import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { login, logout } from "./store/authSlice.js";
import {Footer, Header} from "./components"
import { Outlet } from "react-router-dom";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const curre̥ntUser = authService.getCurrentUser();
    curre̥ntUser
      .then((userData) => {
        if (userData) {
          dispatch(login(userData));
        } else {
          dispatch(logout());
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return loading ? <h1>Not Authenticated</h1> : <div>
    <Header/>
    <Outlet />
    <Footer/>
  </div>;
}

export default App;
