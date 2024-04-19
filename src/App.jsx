import "./App.css";
import authService from "./appwrite/auth.js";
import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { login, logout } from "./store/authSlice.js";
import {Footer, Header} from "./components"

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

  return loading ? null : <div>
    <Header/>
    <Footer/>
  </div>;
}

export default App;
