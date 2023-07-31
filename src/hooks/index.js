import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../providers";

export const useAuth = () => {
  return useContext(AuthContext);
};

export const useProvideAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {}, []);
};
