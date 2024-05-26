import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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
  const { register, handleSubmit } = useForm("");
  const [error, setError] = useState("");

  const login = async (data) => {
    setError("");
    try {
      const session = await authService.login(data);
      console.log(` Login Session :: `, session);
      if (session) {
        const userData = await authService.getCurrentUser();
        if (userData) dispatch(authLogin({ userData }));
        navigate("/");
      }
    } catch (error) {}
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
            {error && <p>{error}</p>}
            <form action="" onSubmit={handleSubmit(login)}>
              <div>
                <Input
                  label="Email"
                  placeholder="Enter your Email"
                  type="email"
                  isMandatory={true}
                  {...register("email", {
                    required: true,
                    validate: {
                      matchPattern: (value) =>
                        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
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
                  <Button className="form-btn" type="submit">
                    Log In
                  </Button>
              </div>
            </form>
            <div className="login-form-footer">
            <p>Don't have a account??</p><Link to="/signup">Sign up</Link>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}

export default Login;
