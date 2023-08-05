import React, { useEffect, useState } from "react";
import { useAuth } from "../hooks";

import Loader from "../components/Loader";
import styles from "../styles/dashboard.module.css";
import HabitProgress from "../components/HabitProgress";

function Dashboard() {
  const auth = useAuth();
  console.log(auth.user.habits);
  const [habits, setHabits] = useState(auth.user.habits);
  const [isRendering, setIsRendering] = useState(true);

  useEffect(() => {
    setHabits(auth.user.habits);
    setIsRendering(false);
  }, [isRendering]);

  function handleRendering() {
    setIsRendering(true);
  }

  if (auth.loading) {
    return <Loader />;
  }

  return (
    <>
      {/* <h1>Dashboard</h1> */}
      <div className={styles.dashboardWrapper}>
        <h1 className={styles.title}>This month Habits </h1>
        {habits.map((habit) => {
          return (
            <div
              className={styles.dashboardContainer}
              key={`unique-${habit._id}`}
            >
              <HabitProgress habit={habit} handleRendering={handleRendering} key={`progress-${habit._id}`} />
            </div>
          );
        })}

        {habits.length <= 0 && (
          <h2 className={styles.title}>Nothing to Show...</h2>
        )}
      </div>
    </>
  );
}

export default Dashboard;
