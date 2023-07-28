import React from "react";

function Home() {
  return (
    <>
      <h1>Home</h1>

      <div className="home-container">
        <a href="/api/user/dashboard">
          <h1>Dashboard</h1>
        </a>
        <div className="create-habit">
          <input type="text" />
          <button> Create</button>
        </div>

        <div className="habits-container">
          <div className="habit-name">
            <span> habit-name</span>
          </div>

          <div className="habit-body">
            <div className="habit-content">
              <span> habit-content</span>
            </div>
            <div className="habit-date">
              <span>habit-name</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
