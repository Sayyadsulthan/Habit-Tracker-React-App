import { useProvideAuth } from "../hooks";

const { createContext } = require("react");

const initialState = {
  user: null,
  login: () => {},
  logout: () => {},
  loading: true,
  signup: () => {},
  createNewHabit: () => {},
  removeHabit: () => {},
  updateHabit: () => {},
};

export const AuthContext = createContext(initialState);

export const AuthProvider = ({ children }) => {
  const auth = useProvideAuth();

  return <AuthContext.Provider value={auth}> {children}</AuthContext.Provider>;
};
