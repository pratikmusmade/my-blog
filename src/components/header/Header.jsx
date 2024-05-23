import React, { useEffect, useState } from "react";
import { Container, LogoutBtn } from "../index";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import authService from "../../appwrite/auth";
import { login } from "../../store/authSlice";

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
      name: "Home",
      slug: "/",
      active: true,
    },
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
  ];

  useEffect(() => {
    (async () => {
      if (!data.userData && authStatus) {
        const userSession = await authService.getCurrentUser();
        if (userSession) dispatch(login({ userData: userSession }));
      }
    })();
  }, [authStatus]);
  return (
    <header>
      <Container>
        <nav>
          <div className="logo">
            <Link to="/">
              <h3>Logo</h3>
            </Link>
          </div>

          <ul>
            {navItems.map((item) =>
              item.active ? (
                <li key={item.name}>
                  <button onClick={() => navigate(item.slug)}>
                    {item.name}
                  </button>
                </li>
              ) : null
            )}

            {authStatus && (
              <li>
                <LogoutBtn />
              </li>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  );
}

export default Header;
