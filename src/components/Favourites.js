import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks";
import { toast } from "react-toastify";

import Loader from "../components/Loader";
import styles from "../styles/home.module.css";
import HabitsList from "../components/HabitsList";

function Favourites() {
  const [habit, setHAbit] = useState("");
  const auth = useAuth();
  const [habits, sethabits] = useState([...auth.user.habits]);
  let length = 0;

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

  if (auth.loading) {
    return <Loader />;
  }

  return (
    <>
      <div className={styles.homeContainer}>
        <h1>
          <Link className={styles.subTitle} to="/dashboard">
            Dashboard
          </Link>
        </h1>
        <h1>
          <Link className={styles.subTitle} to="#">
            Favourites
          </Link>
        </h1>

        <div className={styles.habitWrapper}>
          {/* {console.log(habits)} */}
          {habits.map((content) => {
            if (content.isFavourite) length++;
            return (
              content.isFavourite && (
                <HabitsList content={content} auth={auth} key={content._id} />
              )
            );
          })}

          {length < 1 && <h1>Favourites Habits will be place here</h1>}
        </div>
      </div>
    </>
  );
}

export default Favourites;
