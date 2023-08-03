import { API_URLS, LOCALSTORAGE_TOKEN_KEY } from "../utils/constants";
import { getFormbody } from "../utils";

const customFetch = async (url, { body, ...customConfig }) => {
  // getting the token from local-storage
  const token = window.localStorage.getItem(LOCALSTORAGE_TOKEN_KEY);

  //   setting the headers
  const headers = {
    "content-type": "application/x-www-form-urlencoded",
  };

  //   if the token exist set put it to headers
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const config = {
    ...customConfig,
    headers: {
      ...headers,
      ...customConfig.headers,
    },
  };

  if (body) {
    config.body = getFormbody(body);
  }

  try {
    const response = await fetch(url, config);
    const data = await response.json();
    console.log("custom fetch :", data);
    if (data.success) {
      return {
        data,
        message: data.message,
        success: true,
      };
    } else {
      throw new Error(data.message);
    }
  } catch (error) {
    console.log(error);

    return {
      message: error.message,
      success: false,
    };
  }
};

export const createUser = async (name, email, password, confirm_password) => {
  return customFetch(API_URLS.createUser(), {
    method: "POST",
    body: { name, email, password, confirm_password },
  });
};

export const login = async (email, password) => {
  return customFetch(API_URLS.login(), {
    method: "POST",
    body: { email, password },
  });
};

export const logout = () => {
  return customFetch(API_URLS.logout(), { method: "POST" });
};

export const createHabit = async (name) => {
  return customFetch(API_URLS.createHabit(), {
    method: "POST",
    body: { name },
  });
};
export const updateHabit = async (date, status, habit_id) => {
  return customFetch(API_URLS.updateHabit(habit_id), {
    method: "PATCH",
    body: { date, status },
  });
};

export const updateHabitNAme = async (habitName, habit_id) => {
  // console.log(dataName)
  return customFetch(API_URLS.updateHabitName(habit_id), {
    method: "PATCH",
    body: { name: habitName },
  });
};

export const updateFavourite = async (isFavourite, habit_id) => {
  return customFetch(API_URLS.updateFavourite(habit_id), {
    method: "PATCH",
    body: { isFavourite },
  });
};
export const removeHabit = async (habit_id) => {
  return customFetch(API_URLS.removeHabit(habit_id), { method: "DELETE" });
};

export const getHabits = async () => {
  return customFetch(API_URLS.dashboard(), { method: "GET" });
};
