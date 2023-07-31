import React from "react";
import { Link } from "react-router-dom";
import Loader from "../components/Loader";

import styles from "../styles/home.module.css";

function Home() {
  return (
    <>
      {/* <Loader /> */}

      <div className={styles.homeContainer}>
        <Link to="/api/user/dashboard">
          <h1>Dashboard</h1>
        </Link>
        <div className={styles.createhabit}>
          <input type="text" />
          <button> Create</button>
        </div>

        <div className={styles.habitWrapper}>
          <div className={styles.habitsContainer}>
            <div className={styles.habitStatus}>
              {/* <span> habit-Status</span> */}
              <img
                src="https://cdn-icons-png.flaticon.com/128/190/190411.png"
                alt="completed"
              />
              {/* <img src="https://cdn-icons-png.flaticon.com/128/1008/1008927.png" alt="not-done" /> */}
              {/* <img src="https://cdn-icons-png.flaticon.com/128/10755/10755684.png" alt="pending.." /> */}
            </div>

            <div className={styles.habitBody}>
              <div className={styles.habitContent}>
                <span> habit-content</span>
              </div>
              <div className={styles.habitDate}>
                <span>habit-date</span>
              </div>
            </div>

            <div className={styles.habitEditor}>
              <span>
                <img
                  src="https://cdn-icons-png.flaticon.com/128/8699/8699979.png"
                  alt="edit"
                />
              </span>

              <span>
                {/* <img src="https://cdn-icons-png.flaticon.com/128/126/126471.png" alt="fav" /> */}
              </span>
              <span>
                <img
                  src="https://cdn-icons-png.flaticon.com/128/263/263417.png"
                  alt="fav"
                />
              </span>
              <span>
                <img
                  src="https://cdn-icons-png.flaticon.com/128/4825/4825570.png"
                  alt="delete"
                />
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
