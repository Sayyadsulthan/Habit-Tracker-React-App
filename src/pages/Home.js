import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks";
import { toast } from "react-toastify";

// import Loader from "../components/Loader";
import styles from "../styles/home.module.css";
import HabitsList from "../components/HabitsList";

function Home() {
  const [habit, setHAbit] = useState("");
  const auth = useAuth();
  const [habits, sethabits] = useState([...auth.user.habits]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    sethabits([...auth.user.habits]);
    setLoading(false);
  }, [ auth]);

  const handleCreateHabit = async () => {
    if (habit.length <= 1) {
      return toast.warn("please enter the habit you want to track");
    }

    // if the length of habit >1
    setLoading(true);
    const response = await auth.createNewHabit(habit);

    setHAbit("");
    if (response.success) {
      await auth.updateHabit();
      toast.success(response.message);
    } else {
      toast.error(response.message);
    }
    setLoading(false);
  };

  return (
    <>
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
          <input
            type="text"
            value={loading ? "please wait..." : habit}
            onChange={(e) => setHAbit(e.target.value)}
          />
          <button onClick={handleCreateHabit}> Create</button>
        </div>

        <div className={styles.habitWrapper}>
          {/* {console.log(habits)} */}
          {habits.map((content) => {
            return (
              content && (
                <HabitsList content={content} auth={auth} key={content._id} />
              )
            );
          })}
        </div>
      </div>
    </>
  );
}

export default Home;
