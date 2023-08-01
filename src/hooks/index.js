import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../providers";
import { login as userLogin, createUser, createHabit, getHabits } from "../api";
import jwtDecode from "jwt-decode";
import {
  getItemFromLocalStorage,
  removeItemFromLocalStorage,
  setItemInLocalStorage,
} from "../utils";
import { LOCALSTORAGE_TOKEN_KEY } from "../utils/constants";

export const useAuth = () => {
  return useContext(AuthContext);
};

export const useProvideAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  console.log(loading);
  useEffect(() => {
    const getUser = async () => {
      setLoading(true);

      const userToken = getItemFromLocalStorage(LOCALSTORAGE_TOKEN_KEY);
      if (userToken) {
        const response = await getHabits();
        console.log("allHabits in hooks", response.data.habits);
        const user = await jwtDecode(userToken);
        console.log("jwt decode in hooks", user);
        if(response.success){

          
          setUser({ ...user, habits: response.data.habits });
        }else{

          setUser(user);
        }
      }

      setLoading(false);
    };
    getUser();
  }, []);

  const login = async (email, password) => {
    setLoading(true);
    let data = await userLogin(email, password);
    console.log(data);
    if (data.success) {
      const user = await jwtDecode(data.data.Token);
      setUser(user);
      // setting the user or token in local storage
      setItemInLocalStorage(LOCALSTORAGE_TOKEN_KEY, data.data.Token);
      console.log("data success in login...", data);
      console.log(user);
      setLoading(false);
      return {
        success: true,
        data: data,
      };
    } else {
      setLoading(false);
      return {
        message: data.message,
        success: false,
      };
    }
  };

  const logout = () => {
    setUser(null);
    removeItemFromLocalStorage(LOCALSTORAGE_TOKEN_KEY);
  };

  const signup = async (userName, email, password, confirm_password) => {
    setLoading(false);
    let data = await createUser(userName, email, password, confirm_password);
    if (data.success) {
      setLoading(false);
      return {
        success: true,
      };
    } else {
      setLoading(false);
      console.log("error in hooks", data);
      return {
        success: false,
        message: data.message,
      };
    }
  };

  const createNewHabit = async (habitName) => {
    const habit = await createHabit(habitName);
    if (habit.success) {
      const allHabits = await getHabits();
      console.log("all habits in createNewHabit hook ", allHabits)
      setUser({ ...user, habits: allHabits.habits });
      return {
        success: true,
        message: "habit created successfully..",
      };
    }

    return {
      success: false,
      message: habit.message,
    };
  };


  
  return {
    user,
    loading,
    login,
    logout,
    signup,
    createNewHabit,
  };
};
