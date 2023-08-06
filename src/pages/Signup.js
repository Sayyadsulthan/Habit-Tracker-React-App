import React, { useState } from "react";
import { useAuth } from "../hooks";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

function Signup() {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm_password, setConfirm_Password] = useState("");
  const history = useNavigate();

  const auth = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Signup page form");
    let response = await auth.signup(
      userName,
      email,
      password,
      confirm_password
    );
    if (response.success) {
      console.log("user created successfully");
      toast.success("Signup Successfull...");
      history("/login");
    } else {
      console.log("error in signup", response.message);
      console.log("error in signup", response);
    }
  };

  return (
    <>
      <div className="loginWrapper">
        <div className="loginContainer">
          <h2>SignUp</h2>
          <form action="/user/login" method="POST" onSubmit={handleSubmit}>
            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              name="name"
              placeholder="Enter name"
            />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              name="email"
              placeholder="Enter email"
            />
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              name="password"
              placeholder="Enter password"
            />
            <input
              value={confirm_password}
              onChange={(e) => setConfirm_Password(e.target.value)}
              type="password"
              name="confirm_password"
              placeholder="Enter confirm password"
            />
            <button>Signup</button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Signup;
