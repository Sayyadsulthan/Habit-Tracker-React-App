import React, { useEffect, useState } from "react";
import { useAuth } from "../hooks";

import Loader from "../components/Loader";
import styles from "../styles/dashboard.module.css";
import HabitProgress from "../components/HabitProgress";

function Dashboard() {
  const auth = useAuth();
  console.log(auth.user.habits);
  const [habits, setHabits] = useState([]);
  useEffect(() => {
    setHabits(auth.user.habits);
  }, []);

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
            <div className={styles.dashboardContainer} key={habit._id}>
              <HabitProgress habit={habit} />
            </div>
          );
        })}

        {habits.length <= 0 && (
          <h1 className={styles.title}>Nothing to Show...</h1>
        )}
      </div>
    </>
  );
}

export default Dashboard;
