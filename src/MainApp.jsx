import App from "./App.jsx";
import ProtectedRoutes from "./components/ProtectedRoute.jsx";
import store from "./store/store.js";
import { useEffect, useState } from "react";
import { Provider, useSelector } from "react-redux";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { AddPost, EditPost, Home, LoginPage, AllPosts, Signup } from "./pages";
import Post from "./pages/Post.jsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: (
          <ProtectedRoutes authentication={false}>
            <LoginPage />
          </ProtectedRoutes>
        ),
      },
      {
        path: "/signup",
        element: (
          <ProtectedRoutes authentication={false}>
            <Signup />
          </ProtectedRoutes>
        ),
      },
      {
        path: "/all-posts",
        element: (
          <ProtectedRoutes authentication>
            {" "}
            <AllPosts />
          </ProtectedRoutes>
        ),
      },
      {
        path: "/add-post",
        element: (
          <ProtectedRoutes authentication>
            {" "}
            <AddPost />
          </ProtectedRoutes>
        ),
      },
      {
        path: "/edit-post/:slug",
        element: (
          <ProtectedRoutes authentication>
            {" "}
            <EditPost />
          </ProtectedRoutes>
        ),
      },
        {
          path: "/post/:slug",
          element: <Post/>,
        },
    ],
  },
]);

function MainApp() {

  return (
    <>
        <Provider store={store}>
          <RouterProvider router={router} />
        </Provider>
    </>
  );
}

export default MainApp;
