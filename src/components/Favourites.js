import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks";
import { toast } from "react-toastify";

import Loader from "../components/Loader";
import styles from "../styles/home.module.css";
import HabitsList from "../components/HabitsList";

function Favourites() {
  const auth = useAuth();
  const [habits, sethabits] = useState([...auth.user.habits]);
  let length = 0;

  useEffect(() => {
    sethabits([...auth.user.habits]);
  }, [toast, auth]);

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
