import { useContext } from "react";
import { AuthContext } from "../contetxs/AuthContext";

export function useAuth() {
  const value = useContext(AuthContext);

  return value;
}
