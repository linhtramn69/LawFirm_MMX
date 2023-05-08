import { useToken } from "~/store";
import LoginPage from "./LoginPage";
export function RequireAuth({ children }) {
  const { token, setToken } = useToken();
  return token ? children : <LoginPage setToken={setToken} />;
}