import React, { useEffect, useState } from "react";
import { useAuth } from "../hooks";
import { toast } from "react-toastify";

import Loader from "../components/Loader";
import styles from "../styles/dashboard.module.css";
import HabitProgress from "../components/HabitProgress";

const weekDays = [
  "sunday",
  "monday",
  "tuesday",
  "wednassday",
  "thursday",
  "friday",
  "saturday",
];

function getWeekdayOfMonth(dateString) {
  const weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  // Create a new Date object using the given dateString
  const date = new Date(dateString);

  // Get the day of the week as a numeric value (0 - Sunday, 1 - Monday, ..., 6 - Saturday)
  const dayOfWeek = date.getDay();

  // Return the weekday name corresponding to the numeric value
  return weekdays[dayOfWeek];
}

// const date = "2023-07-25";
// const weekday = getWeekdayOfMonth(date);
// console.log(weekday); // Output: "Tuesday"

function Dashboard() {
  const auth = useAuth();
  console.log(auth.user.habits);
  const [habits, setHabits] = useState([]);
  useEffect(() => {
    setHabits(auth.user.habits);
  }, []);

  // if (auth.loading) {
  //   return <Loader />;
  // }

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
      </div>
    </>
  );
}

export default Dashboard;
