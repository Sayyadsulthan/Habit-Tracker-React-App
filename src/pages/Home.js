import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks";
import { toast } from "react-toastify";

import Loader from "../components/Loader";
import styles from "../styles/home.module.css";

function Home() {
  const [habit, setHAbit] = useState("");
  const auth = useAuth();
  const [habits, sethabits] = useState([]);
  useEffect(() => {
    sethabits([...auth.user.habits]);
  }, []);
  // sethabits(auth.user.habits);

  const handleCreateHabit = async () => {
    if (habit.length == 0) {
      console.log("please enter the habit you want to track");
      return toast.warn("please enter the habit you want to track");
    }
    // TO DO
    const response = await auth.createNewHabit(habit);
    // if(response.success){

    // }
  };

 

  if (auth.loading) {
    return <Loader />;
  }

  return (
    <>
      {/* <Loader /> */}

      <div className={styles.homeContainer}>
        <Link to="/dashboard">
          <h1>Dashboard</h1>
        </Link>
        <div className={styles.createhabit}>
          <input type="text" onChange={(e) => setHAbit(e.target.value)} />
          <button onClick={handleCreateHabit}> Create</button>
        </div>

        <div className={styles.habitWrapper}>
          {console.log(habits)}
          {habits.map((content) => {
            return (
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
                    <span> {content.name}</span>
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
                      // onClick={}
                      src="https://cdn-icons-png.flaticon.com/128/4825/4825570.png"
                      alt="delete"
                    />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default Home;
