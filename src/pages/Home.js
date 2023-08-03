import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks";
import { toast } from "react-toastify";

import Loader from "../components/Loader";
import styles from "../styles/home.module.css";
import HabitsList from "../components/HabitsList";

// let date = new Date();
// let DD = date.getDate();
// if (DD <= 9) DD = "0" + DD;
// let MM = date.getMonth() + 1;
// if (MM <= 9) MM = "0" + MM;
// let YY = date.getFullYear();
// // var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
// // var lastDay = new Date(date.getFullYear(), date.getMonth(), 0);
// const currentDate = YY + "-" + MM + "-" + DD;
// // let index = 0;

function Home() {
  const [habit, setHAbit] = useState("");
  const auth = useAuth();
  const [habits, sethabits] = useState([...auth.user.habits]);

  // sethabits([...auth.user.habits]);
  useEffect(() => {
    sethabits([...auth.user.habits]);
    console.log("use effect in home");
  }, [toast, auth]);

  const handleCreateHabit = async () => {
    if (habit.length <= 1) {
      // console.log("please enter the habit you want to track");
      return toast.warn("please enter the habit you want to track");
    }
    // TO DO
    const response = await auth.createNewHabit(habit);

    if (response.success) {
      toast.success(response.message);
      // sethabits(auth.user.habits);
    } else {
      toast.error(response.message);
    }
  };

  // function getIndex(content) {
  //   let res = 0;
  //   content.status.forEach((val, i) => {
  //     if (val.date === currentDate) {
  //       console.log("yes", i);
  //       res = i;
  //       return;
  //     }
  //   });
  //   return res;
  // }

  if (auth.loading) {
    return <Loader />;
  }

  return (
    <>
      {/* <Loader /> */}

      <div className={styles.homeContainer}>
        <h1>
          <Link className={styles.subTitle} to="/dashboard">
            Dashboard
          </Link>
        </h1>
        <h1>
          <Link className={styles.subTitle} to="/favourites">
            Favourites
          </Link>
        </h1>
        <div className={styles.createhabit}>
          <input type="text" onChange={(e) => setHAbit(e.target.value)} />
          <button onClick={handleCreateHabit}> Create</button>
        </div>

        <div className={styles.habitWrapper}>
          {/* {console.log(habits)} */}
          {habits.map((content) => {
            return <HabitsList content={content} auth={auth} />;
          })}
        </div>
      </div>
    </>
  );
}

export default Home;
