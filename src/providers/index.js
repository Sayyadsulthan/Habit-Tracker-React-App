import { useProvideAuth } from "../hooks";

const { createContext, Children } = require("react");

const initialState = {
  user: null,
  login: () => {},
  logout: () => {},
};

export const AuthContext = createContext(initialState);

export const AuthProvider = ({ Children }) => {
  const auth = useProvideAuth;

  return <AuthContext.Provider value={auth}> {Children}</AuthContext.Provider>;
};
