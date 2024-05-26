import React, { useEffect, useState } from "react";
import { Button, Container, LogoutBtn } from "../index";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import authService from "../../appwrite/auth";
import { login } from "../../store/authSlice";
import "./header.css";
function Header() {
  const dispatch = useDispatch();
  const authStatus = useSelector((state) => state.auth.status);
  const data = useSelector((state) => state.auth);
  console.log(
    "User Data in header --> ",
    data,
    " User status --> ",
    authStatus
  );
  const navigate = useNavigate();

  const navItems = [
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
    },
   
  ];

  const navitem2 = [
    {
      name: "Home",
      slug: "/",
      active: true,
    },
    {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
    },
    {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
    },
  ]

  useEffect(() => {
    (async () => {
      if (!data.userData && authStatus) {
        const userSession = await authService.getCurrentUser();
        if (userSession) dispatch(login({ userData: userSession }));
      }
    })();
  }, [authStatus]);
  return (
    <header className="nav-bar">
      <div className="logo">
        <Link to="/">
          <h3>My-Blog</h3>
        </Link>
      </div>


      <ul className="navigation-items">
      {navitem2.map((item) =>
          item.active ? (
            <li key={item.name}>
              <Button className="navbar-btn-style" onClick={() => navigate(item.slug)}>{item.name}</Button>
            </li>
          ) : null
        )}
      </ul>
      <ul className="navigation-items">
        {navItems.map((item) =>
          item.active ? (
            <li key={item.name}>
              <Button className="navbar-btn-style" onClick={() => navigate(item.slug)}>{item.name}</Button>
            </li>
          ) : null
        )}

       <li></li>
          {authStatus && (
            <li>
              <LogoutBtn />
            </li>
          )}
      </ul>
    </header>
  );
}

export default Header;
