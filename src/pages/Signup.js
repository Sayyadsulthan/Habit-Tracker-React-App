import React from "react";

function Signup() {
  return (
    <>
      <div className="LoginWrapper">
        <form action="/user/login" method="POST">
          <input type="text" name="name" placeholder="Enter name" />
          <input type="email" name="email" placeholder="Enter email" />
          <input type="password" name="password" placeholder="Enter password" />
          <input
            type="password"
            name="confirm_password"
            placeholder="Enter confirm password"
          />
          <button>Signup</button>
        </form>
      </div>
    </>
  );
}

export default Signup;
