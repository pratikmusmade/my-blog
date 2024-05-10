import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login as authLogin } from "../../store/authSlice";
import { Button, Input } from "../index";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import authService from "../../appwrite/auth";

function Login() {
  // const navigate = useNavigate();
  // const dispatch = useDispatch();
  // const { register, handelSubmit } = useForm("");
  // const [error, setError] = useState("");

  // const login = async (data) => {
  //   setError("");
  //   try {
  //     const session = await authService.login(data);
  //     console.log(` Login Session ::  ${session}`);
  //     if (session) {
  //       const userData = await authService.getCurrentUser();
  //       console.log(` Current user Session ::  ${userData}`);
  //       if (userData) dispatch(authLogin(userData));
  //       navigate("/");
  //     }
  //   } catch (error) {}
  // };

  return (
    <div className="login-form-container">
      <h2>Sign In to your account</h2>
      <p>Don't have a account</p> <Link to="/signup"> Sign up</Link>
      {error && <p>{error}</p>}
      <form action="" onSubmit={handelSubmit(login)}>
        <div>
          <Input
            label="Email"
            placeholder="Enter your Email"
            type="email"
            {...register("email", {
              required: true,
              validate: {
                mathchPatern: (value) =>
                  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.text(
                    value
                  ) || "Email address must be a valid address",
              },
            })}
          />

          <Input
            label="Password"
            placeholder="Enter Password"
            type="password"
            {...register("password", {
              required: true,
              pattern:
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
            })}
          />

          <Button type="submit">Login In</Button>
        </div>
      </form>
    </div>
  );
}

export default Login;
