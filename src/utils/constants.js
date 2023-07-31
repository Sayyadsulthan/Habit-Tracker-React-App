const API_ROOT = "http://127.0.0.1:8000/api/user";

export const API_URLS = {
  dashboard: () => {
    `${API_ROOT}/dashboard`;
  },
  login: () => {
    `${API_ROOT}/login`;
  },
  logout: () => {
    `${API_ROOT}/logout`;
  },
  createUser: () => {
    `${API_ROOT}/create`;
  },
  createHabit: () => {
    `${API_ROOT}//habit/create`;
  },
  updateHabit: (habit_id) => {
    `${API_ROOT}//habit/update/${habit_id}`;
  },
  removeHabit: (habit_id) => {
    `${API_ROOT}//habit/${habit_id}`;
  },
};

export const LOCALSTORAGE_TOKEN_KEY = "codeial";
