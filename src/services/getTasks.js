import axios from "axios";

export const getPendingTasks = (token) => {
  return axios.get("/api/notes", { headers: { authorization: token } });
};
export const getArchivedTasks = (token) =>
  axios.get("/api/archives", { headers: { authorization: token } });

export const getTrashTasks = async (token) =>
  axios.get("/api/trash", { headers: { authorization: token } });
