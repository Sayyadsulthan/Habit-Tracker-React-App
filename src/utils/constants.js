const API_ROOT = "http://127.0.0.1:8000/api/user";

export const API_URLS = {
  dashboard: () => {
    return `${API_ROOT}/dashboard`; // Add 'return' here
  },
  login: () => {
    return `${API_ROOT}/login`; // Add 'return' here
  },
  logout: () => {
    return `${API_ROOT}/logout`; // Add 'return' here
  },
  createUser: () => `${API_ROOT}/create`, // Add 'return' here,
  createHabit: () => {
    return `${API_ROOT}/habit/create`; // Add 'return' here
  },
  updateHabit: (habit_id) => {
    return `${API_ROOT}/habit/update/${habit_id}`; // Add 'return' here
  },
  updateHabitName: (habit_id) => {
    return `${API_ROOT}/habit/updateName/${habit_id}`;
  },
  updateFavourite: (habit_id) => {
    return `${API_ROOT}/habit/updateFavourite/${habit_id}`;
  },
  removeHabit: (habit_id) => {
    return `${API_ROOT}/habit/${habit_id}`; // Add 'return' here
  },
};

export const LOCALSTORAGE_TOKEN_KEY = "codeial";
