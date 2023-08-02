import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks";
import { toast } from "react-toastify";

import Loader from "../components/Loader";
import styles from "../styles/home.module.css";

let date = new Date();
let DD = date.getDate();
if (DD <= 9) DD = "0" + DD;
let MM = date.getMonth() + 1;
if (MM <= 9) MM = "0" + MM;
let YY = date.getFullYear();
// var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
// var lastDay = new Date(date.getFullYear(), date.getMonth(), 0);
const currentDate = YY + "-" + MM + "-" + DD;
// let index = 0;

function Home() {
  const [habit, setHAbit] = useState("");
  const auth = useAuth();
  const [habits, sethabits] = useState([]);
  useEffect(() => {
    if (auth.user) {
      sethabits([...auth.user.habits]);
    }
  }, []);

  const handleCreateHabit = async () => {
    if (habit.length === 0) {
      console.log("please enter the habit you want to track");
      return toast.warn("please enter the habit you want to track");
    }
    // TO DO
    const response = await auth.createNewHabit(habit);
    if (response.success) {
      toast.success(response.message);
    } else {
      toast.error(response.message);
    }
  };

  function getIndex(content) {
    let res = 0;
    content.status.forEach((val, i) => {
      if (val.date === currentDate) {
        console.log("yes", i);
        res = i;
        return;
      }
    });
    return res;
  }

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
          {/* {console.log(habits)} */}
          {habits.map((content) => {
            
            return (
              <div className={styles.habitsContainer} key={content._id}>
                <div className={styles.habitStatus}>
                  {console.log(content)}
                  {/* <span> habit-Status</span> */}
                  {content.status[getIndex(content)].completed ===
                  "undefined" ? (
                    <img
                      src="https://cdn-icons-png.flaticon.com/128/10755/10755684.png"
                      alt="pending.."
                    />
                  ) : content.status[getIndex(content)].completed === "true" ? (
                    <img
                      src="https://cdn-icons-png.flaticon.com/128/190/190411.png"
                      alt="completed"
                    />
                  ) : (
                    <img
                      src="https://cdn-icons-png.flaticon.com/128/1008/1008927.png"
                      alt="not-done"
                    />
                  )}
                </div>

                <div className={styles.habitBody}>
                  <div className={styles.habitContent}>
                    <span> {content.name}</span>
                  </div>
                  <div className={styles.habitDate}>
                    <span>{DD + "-" + MM + "-" + YY}</span>
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
                      onClick={async () => {
                        await auth.removeHabit(content._id);
                        toast.success("habit removed successfully...");
                      }}
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
