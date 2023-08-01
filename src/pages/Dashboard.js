import React from "react";
import { useAuth } from "../hooks";
import { toast } from "react-toastify";

import Loader from "../components/Loader";
import styles from "../styles/home.module.css";

function Dashboard() {
  const auth = useAuth();
  const habits = auth.user;

  if (auth.loading) {
    return <Loader />;
  }

  return (
    <>
      <h1>Dashboard</h1>
    </>
  );
}

export default Dashboard;
