import React, { useEffect, useState } from "react";

import styles from "../styles/dashboard.module.css";
import { useAuth } from "../hooks";
import { updateHabit } from "../api";
import { toast } from "react-toastify";
import Loader from "./Loader";

const weekDays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednassday",
  "Thursday",
  "Friday",
  "Saturday",
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

function HabitProgress({ habit, handleRendering }) {
  const [loading, setLoading] = useState(false);
  const auth = useAuth();

  const sunday = [];
  const monday = [];
  const tuesday = [];
  const wednesday = [];
  const thursday = [];
  const friday = [];
  const saturday = [];

  habit.status.map((data, index) => {
    if (index === 0) {
      if (getWeekdayOfMonth(data.date) === "Monnday") {
        sunday.push(" ");
      } else if (getWeekdayOfMonth(data.date) === "Tuesday") {
        sunday.push(" ");
        monday.push(" ");
      } else if (getWeekdayOfMonth(data.date) === "Wednesday") {
        sunday.push(" ");
        monday.push(" ");
        tuesday.push(" ");
      } else if (getWeekdayOfMonth(data.date) === "Thursday") {
        sunday.push(" ");
        monday.push(" ");
        tuesday.push(" ");
        wednesday.push(" ");
      } else if (getWeekdayOfMonth(data.date) === "Friday") {
        sunday.push(" ");
        monday.push(" ");
        tuesday.push(" ");
        wednesday.push(" ");
        thursday.push(" ");
      } else if (getWeekdayOfMonth(data.date) === "Saturday") {
        sunday.push(" ");
        monday.push(" ");
        tuesday.push(" ");
        wednesday.push(" ");
        thursday.push(" ");
        friday.push(" ");
      } else {
      }
    }
    const checkWeekDay = getWeekdayOfMonth(data.date);
    checkWeekDay === "Sunday"
      ? sunday.push(data)
      : checkWeekDay === "Monday"
      ? monday.push(data)
      : checkWeekDay === "Tuesday"
      ? tuesday.push(data)
      : checkWeekDay === "Wednesday"
      ? wednesday.push(data)
      : checkWeekDay === "Thursday"
      ? thursday.push(data)
      : checkWeekDay === "Friday"
      ? friday.push(data)
      : saturday.push(data);
  });
  //   console.log(sunday.length<5)
  checkArrayLength(sunday);
  checkArrayLength(monday);
  checkArrayLength(tuesday);
  checkArrayLength(wednesday);
  checkArrayLength(thursday);
  checkArrayLength(friday);
  checkArrayLength(saturday);

  const handleStatus = async (date, status) => {
    setLoading(true);
    // console.log(date, status);
    if (date === undefined) {
      setLoading(false);
      return;
    } else {
      const habit_id = habit._id;
      const response = await updateHabit(date, status, habit_id);
      if (response.success) {
        await auth.updateHabit();
        handleRendering();
        toast.success("status updated successfully..");
      } else {
        toast.error(response.message);
      }
    }
    setLoading(false);
  };

  //   if (auth.loading) {
  //     return <Loader />;
  //   }

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <div className={styles.dashboardBody}>
        <div className={styles.habitName}>
          <h1>{habit.name}</h1>
        </div>

        <div className={styles.dashboardLeft}>
          {weekDays.map((day) => (
            <div className={styles.weekDays}>{day}</div>
          ))}
        </div>
        <div className={styles.dashboardRight}>
          <div className={styles.dates}>
            {sunday.map((date) => (
              <>
                <div className={styles.details}>
                  <span>{date.date}</span>
                  {date.date ? (
                    date.completed === "undefined" ? (
                      <img
                        onClick={() => {
                          handleStatus(date.date, date.status);
                        }}
                        src="https://cdn-icons-png.flaticon.com/128/10755/10755684.png"
                        alt="pending.."
                      />
                    ) : date.completed === "true" ? (
                      <img
                        onClick={() => {
                          handleStatus(date.date, date.status);
                        }}
                        src="https://cdn-icons-png.flaticon.com/128/190/190411.png"
                        alt="completed"
                      />
                    ) : (
                      <img
                        onClick={() => {
                          handleStatus(date.date, date.status);
                        }}
                        src="https://cdn-icons-png.flaticon.com/128/1008/1008927.png"
                        alt="not-done"
                      />
                    )
                  ) : (
                    <img src="https://cdn-icons-png.flaticon.com/128/4076/4076478.png" />
                  )}
                </div>
              </>
            ))}
            {/* <span>date</span> */}
          </div>
          <div className={styles.dates}>
            {monday.map((date) => (
              <div className={styles.details}>
                <span>{date.date}</span>
                {date.date ? (
                  date.completed === "undefined" ? (
                    <img
                      onClick={() => {
                        handleStatus(date.date, date.status);
                      }}
                      src="https://cdn-icons-png.flaticon.com/128/10755/10755684.png"
                      alt="pending.."
                    />
                  ) : date.completed === "true" ? (
                    <img
                      onClick={() => {
                        handleStatus(date.date, date.status);
                      }}
                      src="https://cdn-icons-png.flaticon.com/128/190/190411.png"
                      alt="completed"
                    />
                  ) : (
                    <img
                      onClick={() => {
                        handleStatus(date.date, date.status);
                      }}
                      src="https://cdn-icons-png.flaticon.com/128/1008/1008927.png"
                      alt="not-done"
                    />
                  )
                ) : (
                  <img src="https://cdn-icons-png.flaticon.com/128/4076/4076478.png" />
                )}
              </div>
            ))}
            {/* <span>date</span> */}
          </div>
          <div className={styles.dates}>
            {tuesday.map((date) => (
              <div className={styles.details}>
                <span>{date.date}</span>
                {date.date ? (
                  date.completed === "undefined" ? (
                    <img
                      onClick={() => {
                        handleStatus(date.date, date.status);
                      }}
                      src="https://cdn-icons-png.flaticon.com/128/10755/10755684.png"
                      alt="pending.."
                    />
                  ) : date.completed === "true" ? (
                    <img
                      onClick={() => {
                        handleStatus(date.date, date.status);
                      }}
                      src="https://cdn-icons-png.flaticon.com/128/190/190411.png"
                      alt="completed"
                    />
                  ) : (
                    <img
                      onClick={() => {
                        handleStatus(date.date, date.status);
                      }}
                      src="https://cdn-icons-png.flaticon.com/128/1008/1008927.png"
                      alt="not-done"
                    />
                  )
                ) : (
                  <img src="https://cdn-icons-png.flaticon.com/128/4076/4076478.png" />
                )}
              </div>
            ))}
            {/* <span>date</span> */}
          </div>
          <div className={styles.dates}>
            {wednesday.map((date) => (
              <div className={styles.details}>
                <span>{date.date}</span>
                {date.date ? (
                  date.completed === "undefined" ? (
                    <img
                      onClick={() => {
                        handleStatus(date.date, date.status);
                      }}
                      src="https://cdn-icons-png.flaticon.com/128/10755/10755684.png"
                      alt="pending.."
                    />
                  ) : date.completed === "true" ? (
                    <img
                      onClick={() => {
                        handleStatus(date.date, date.status);
                      }}
                      src="https://cdn-icons-png.flaticon.com/128/190/190411.png"
                      alt="completed"
                    />
                  ) : (
                    <img
                      onClick={() => {
                        handleStatus(date.date, date.status);
                      }}
                      src="https://cdn-icons-png.flaticon.com/128/1008/1008927.png"
                      alt="not-done"
                    />
                  )
                ) : (
                  <img src="https://cdn-icons-png.flaticon.com/128/4076/4076478.png" />
                )}
              </div>
            ))}
            {/* <span>date</span> */}
          </div>
          <div className={styles.dates}>
            {thursday.map((date) => (
              <div className={styles.details}>
                <span>{date.date}</span>
                {date.date ? (
                  date.completed === "undefined" ? (
                    <img
                      onClick={() => {
                        handleStatus(date.date, date.status);
                      }}
                      src="https://cdn-icons-png.flaticon.com/128/10755/10755684.png"
                      alt="pending.."
                    />
                  ) : date.completed === "true" ? (
                    <img
                      onClick={() => {
                        handleStatus(date.date, date.status);
                      }}
                      src="https://cdn-icons-png.flaticon.com/128/190/190411.png"
                      alt="completed"
                    />
                  ) : (
                    <img
                      onClick={() => {
                        handleStatus(date.date, date.status);
                      }}
                      src="https://cdn-icons-png.flaticon.com/128/1008/1008927.png"
                      alt="not-done"
                    />
                  )
                ) : (
                  <img src="https://cdn-icons-png.flaticon.com/128/4076/4076478.png" />
                )}
              </div>
            ))}
            {/* <span>date</span> */}
          </div>
          <div className={styles.dates}>
            {friday.map((date) => (
              <div className={styles.details}>
                <span>{date.date}</span>
                {date.date ? (
                  date.completed === "undefined" ? (
                    <img
                      onClick={() => {
                        handleStatus(date.date, date.status);
                      }}
                      src="https://cdn-icons-png.flaticon.com/128/10755/10755684.png"
                      alt="pending.."
                    />
                  ) : date.completed === "true" ? (
                    <img
                      onClick={() => {
                        handleStatus(date.date, date.status);
                      }}
                      src="https://cdn-icons-png.flaticon.com/128/190/190411.png"
                      alt="completed"
                    />
                  ) : (
                    <img
                      onClick={() => {
                        handleStatus(date.date, date.status);
                      }}
                      src="https://cdn-icons-png.flaticon.com/128/1008/1008927.png"
                      alt="not-done"
                    />
                  )
                ) : (
                  <img src="https://cdn-icons-png.flaticon.com/128/4076/4076478.png" />
                )}
              </div>
            ))}
            {/* <span>date</span> */}
          </div>
          <div className={styles.dates}>
            {saturday.map((date) => (
              <div className={styles.details}>
                <span>{date.date}</span>
                {date.date ? (
                  date.completed === "undefined" ? (
                    <img
                      onClick={() => {
                        handleStatus(date.date, date.status);
                      }}
                      src="https://cdn-icons-png.flaticon.com/128/10755/10755684.png"
                      alt="pending.."
                    />
                  ) : date.completed === "true" ? (
                    <img
                      onClick={() => {
                        handleStatus(date.date, date.status);
                      }}
                      src="https://cdn-icons-png.flaticon.com/128/190/190411.png"
                      alt="completed"
                    />
                  ) : (
                    <img
                      onClick={() => {
                        handleStatus(date.date, date.status);
                      }}
                      src="https://cdn-icons-png.flaticon.com/128/1008/1008927.png"
                      alt="not-done"
                    />
                  )
                ) : (
                  <img src="https://cdn-icons-png.flaticon.com/128/4076/4076478.png" />
                )}
              </div>
            ))}
            {/* <span>date</span> */}
          </div>
        </div>
      </div>
    </>
  );
}

export default HabitProgress;

function checkArrayLength(arr) {
  if (arr.length < 5) {
    arr.push(" ");
  }
}
