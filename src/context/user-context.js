import dayjs from "dayjs";
import { createContext, useContext, useEffect, useReducer } from "react";
import { userReducer } from "reducers/userReducer.js";

const UserContext = createContext();
const UserProvider = ({ children }) => {
  const initialData = {
    user: {
      _id: "",
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      createdAt: "",
      updatedAt: "",
    },
    error: "",
    loading: "",
  };
  const [userDataState, userDataDispatch] = useReducer(
    userReducer,
    initialData
  );
  const setUserDetails = (userData) =>
    userDataDispatch({ type: "SET_USER", payload: { userData } });
  const userLoading = (loadMsg) =>
    userDataDispatch({ type: "SET_LOADING", payload: { loadMsg } });
  const userError = (error) =>
    userDataDispatch({ type: "SET_ERROR", payload: { error } });
    // need API for this
  const changePassword = (newPassword) =>
    userDataDispatch({
      type: "CHANGE_PASSWORD",
      payload: { newPassword, updatedAt: dayjs() },
    });
  return (
    <UserContext.Provider
      value={{
        userDataState,
        setUserDetails,
        userLoading,
        userError,
        changePassword,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
const useUser = () => useContext(UserContext);
export { UserProvider, useUser };
