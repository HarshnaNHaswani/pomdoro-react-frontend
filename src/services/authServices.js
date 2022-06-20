import axios from "axios";

export const loginService = async ({ email, password }) =>
  await axios.post("/api/auth/login", {
    email,
    password,
  });
export const signUpService = async ({ email, password, firstName, lastName }) =>
  await axios.post("/api/auth/signup", {
    email,
    password,
    lastName,
    firstName,
  });
