import React from "react";

function Login() {
  return (
    <>
      <div className="LoginWrapper">
        <form action="/user/login" method="POST">
          <input type="email" name="email" placeholder="Enter email" />
          <input type="password" name="password" placeholder="Enter password" />
          <button>Login</button>
        </form>
      </div>
    </>
  );
}

export default Login;
