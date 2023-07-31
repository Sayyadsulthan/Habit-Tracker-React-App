import { API_URLS, LOCALSTORAGE_TOKEN_KEY } from "../utils/constants";
import { getFormbody } from "../utils";

const customFetch = async (url, { body, ...customConfig }) => {
  // getting the token from local-storage
  const token = window.localStorage.getItem(LOCALSTORAGE_TOKEN_KEY);

  //   setting the headers
  const headers = {
    "context-type": "application/x-www-form-urlencoded",
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
    const data = await fetch(url, config);

    if (data.success) {
      return {
        message: data.message,
        success: true,
      };
    }

    throw new Error(data.message);
  } catch (err) {
    console.log(err);

    return {
      message: err.message,
      success: false,
    };
  }
};

export const createUser = (name, email, password, confirm_password) => {
  return customFetch(API_URLS, {
    method: "POST",
    body: { name, email, password, confirm_password },
  });
};

export const login = (email, password) => {
  return customFetch(API_URLS.login(), {
    method: "POST",
    body: { email, password },
  });
};

export const logout = () => {
  return customFetch(API_URLS.logout(), { method: "POST" });
};
