import React, { useState } from "react";
import authService from "../../appwrite/auth";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../store/authSlice";
import { Button, Input } from "../index";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";

function Register() {
  const navigate = useNavigate();
  const [error, setError] = useState();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();

  const create = async (data) => {
    setError("");
    try {
      const userData = await authService.createAccount(data);
      console.log("User Data ==> ", userData);

      if (userData) {
        const userData = await authService.getCurrentUser();
        console.log("Current User Data ==> ", userData);
        if (userData) dispatch(login(userData));
        navigate("/");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="register-up-container">
      <h2>Register</h2>
      <p>Already have an account??</p> <Link to="/login">Log In</Link>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit(create)}>
        <div>
          <Input
            label="Full Name"
            placeholder="Enter your full Name"
            {...register("name", {
              required: true,
            })}
          />

          <Input
            label="Email"
            placeholder="Enter your Email"
            type="email"
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

          <Button type="submit">Register</Button>
        </div>
      </form>
    </div>
  );
}

export default Register;
