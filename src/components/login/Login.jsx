import React, { useState } from "react";
import { Link, matchPath, useNavigate } from "react-router-dom";
import { login as authLogin } from "../../store/authSlice";
import { Button, Input } from "../index";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import authService from "../../appwrite/auth";
import loginImage from "../../assets/luffy-zoro.jpg";
import "./login.css";
function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors,isSubmitting },
    setError,
  } = useForm("");

  const login = async (data) => {
    try {
      const session = await authService.login(data);
      console.log(` Login Session :: `, session);
      if (session) {
        const userData = await authService.getCurrentUser();
        if (userData) dispatch(authLogin({ userData }));
        navigate("/");
      }
    } catch (error) {
      setError("root", {
        message: error.message,
      });
    }
  };

  return (
    <>
      <div className="login-comp-wrapper">
        <main className="login-main-content">
          <section className="login-image-section">
            <div className="login-image-container">
              <img src={loginImage} alt="" />
            </div>
          </section>
          <section className="login-form-section">
            <header>
              <h1>Login</h1>
              <h2
                style={{ color: "grey", fontWeight: "500", marginTop: ".5rem" }}
              >
                Welcome Back !!!
              </h2>
            </header>
            <form action="" onSubmit={handleSubmit(login)}>
              {errors.root && (
                <p style={{ color: "red" }}>{errors.root.message}</p>
              )}
              <div>
                <Input
                disabled={isSubmitting}
                  label="Email"
                  placeholder="Enter your Email"
                  type="email"
                  isMandatory={true}
                  {...register("email", {
                    required: "Please Enter Email",
                    validate: {
                      matchPattern: (value) =>
                        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
                          value
                        ) || "Email address must be a valid address",
                    },
                  })}
                />
                {errors.email && (
                  <div style={{ color: "red", paddingInline: ".5rem" }}>
                    {errors.email.message}
                  </div>
                )}

                <Input
                disabled={isSubmitting}
                  label="Password"
                  placeholder="Enter Password"
                  type="password"
                  {...register("password", {
                    required: "Please Enter the password",
                    validate: {
                      myFunc: (value) =>
                        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
                          value
                        ) ||
                        "Password must contain -> capital letter,a number and no special symbols",
                    },
                    // pattern:
                    //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                  })}
                />
                {errors.password && (
                  <div style={{ color: "red", paddingInline: ".5rem" }}>
                    {errors.password.message}
                  </div>
                )}

                <Button disabled={isSubmitting}className="form-btn" type="submit">
                 {isSubmitting ?"Please Wait " : "Log In"}
                </Button>
              </div>
            </form>
            <div className="login-form-footer">
              <p>Don't have a account??</p>
              <Link to="/signup">Sign up</Link>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}

export default Login;
