import React, { useEffect, useState } from "react";
import { useAuth } from "../hooks";
import Loader from "../components/Loader";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useNavigate();
  const auth = useAuth();
  useEffect(() => {
    if (auth.user) {
      return history("/");
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("password", password);
    console.log("email", email);

    let response = await auth.login(email, password);
    if (response.success) {
      console.log("success");
    } else {
      console.log("error", response.message);
    }
  };

  if (auth.loading) {
    return <Loader />;
  }
  console.log(auth.loading);

  return (
    <>
      <div className="loginWrapper">
        <div className="loginContainer">
          <h1>Sign In</h1>

          <form action="/user/login" method="POST" onSubmit={handleSubmit}>
            <input
              type="email"
              value={email}
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email"
            />
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              name="password"
              placeholder="Enter password"
            />
            <button>Login</button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
