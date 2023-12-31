import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { updateFavourite, updateHabit, updateHabitNAme } from "../api";
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

function HabitsList({ content, auth }) {
  const [isEditable, setIsEditable] = useState(false);
  const [habitName, setHabitName] = useState(content.name);
  let currentMonthData = content.status[getIndex(content)];
  const [isLoading, setIsLoading] = useState(false);
  const [isRendering, setIsRedering] = useState(true);

  useEffect(() => {
    setHabitName(content.name);
    setIsRedering(false);
  }, [ isRendering,content.name]);

  function getIndex(content) {
    let res = 0;
    content.status.forEach((val, i) => {
      if (val.date === currentDate) {
        res = i;
        return;
      }
    });
    return res;
  }

  const handleStatus = async (date, status) => {
    if (date === undefined) {
      return;
    } else {
      setIsLoading(true);
      const habit_id = content._id;
      const response = await updateHabit(date, status, habit_id);

      if (response.success) {
        await auth.updateHabit();
        toast.success("status updated successfully..");
        setIsRedering(true);
      } else {
        toast.error(response.message);
      }
      setIsLoading(false);
    }
  };

  const handleFavourites = async () => {
    setIsLoading(true);
    const response = await updateFavourite(content.isFavourite, content._id);
    if (response.success) {
      await auth.updateHabit();
      toast.success(response.message);
    } else {
      toast.error(response.message);
    }
    setIsLoading(false);
  };
  const handleUpdateName = async (habit_id) => {
    setIsLoading(true);
    const response = await updateHabitNAme(habitName, habit_id);
    if (response.success) {
      await auth.updateHabit();
      toast.success(response.message);
    } else {
      toast.error(response.message);
    }
    setIsLoading(false);
  };

  return (
    <div className={styles.habitsContainer} key={content._id}>
      <div className={styles.habitStatus}>
        {currentMonthData.completed === "false" ? (
          <img
            onClick={() =>
              handleStatus(currentMonthData.date, currentMonthData.completed)
            }
            src="https://cdn-icons-png.flaticon.com/128/10755/10755684.png"
            alt="pending.."
          />
        ) : currentMonthData.completed === "true" ? (
          <img
            onClick={() =>
              handleStatus(currentMonthData.date, currentMonthData.completed)
            }
            src="https://cdn-icons-png.flaticon.com/128/190/190411.png"
            alt="completed"
          />
        ) : (
          <img
            onClick={() =>
              handleStatus(currentMonthData.date, currentMonthData.completed)
            }
            src="https://cdn-icons-png.flaticon.com/128/1008/1008927.png"
            alt="not-done"
          />
        )}
      </div>

      <div className={styles.habitBody}>
        <div className={styles.habitContent}>
          {isEditable ? (
            <input
              value={isLoading ? "please Wait ..." : habitName}
              onChange={(e) => setHabitName(e.target.value)}
            />
          ) : (
            <span> {isLoading ? "Please wait..." : habitName}</span>
          )}
        </div>
        <div className={styles.habitDate}>
          <span>{DD + "-" + MM + "-" + YY}</span>
        </div>
      </div>

      <div className={styles.habitEditor}>
        <span>
          {isEditable ? (
            <img
              onClick={() => {
                setIsEditable(!isEditable);
                handleUpdateName(content._id);
              }}
              src="https://cdn-icons-png.flaticon.com/128/6861/6861561.png"
              alt="edit"
            />
          ) : (
            <img
              onClick={() => setIsEditable(!isEditable)}
              src="https://cdn-icons-png.flaticon.com/128/8699/8699979.png"
              alt="edit"
            />
          )}
        </span>

        <span>
          {content.isFavourite ? (
            <img
              onClick={handleFavourites}
              src="https://cdn-icons-png.flaticon.com/128/263/263417.png"
              alt="fav"
            />
          ) : (
            <img
              onClick={handleFavourites}
              src="https://cdn-icons-png.flaticon.com/128/126/126471.png"
              alt="fav"
            />
          )}
        </span>
        <span>
          <img
            onClick={async () => {
              setIsLoading(true);
              const response = await auth.removeHabit(content._id);
              if (response.success) {
                toast.success("habit removed successfully...");
              } else {
                toast.error(response.message);
              }
              setIsLoading(false);
            }}
            src="https://cdn-icons-png.flaticon.com/128/4825/4825570.png"
            alt="delete"
          />
        </span>
      </div>
    </div>
  );
}

export default HabitsList;
