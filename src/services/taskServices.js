import axios from "axios";

export const addTaskService = async ({ task, encodedToken}) =>
  await axios.post(
    "/api/notes",
    {
      note: task,
    },
    {
      headers: {
        authorization: encodedToken,
      },
    }
  );
export const editTaskService = async ({ task, encodedToken}) =>
  await axios.post(
    `/api/notes/${task._id}`,
    {
      note: task,
    },
    {
      headers: {
        authorization: encodedToken,
      },
    }
  );

export const archiveTaskService = async ({ taskId, encodedToken}) =>
  await axios.post(
    `/api/notes/archives/${taskId}`,
    {},
    {
      headers: {
        authorization: encodedToken,
      },
    }
  );
export const unarchiveTaskService = async ({ taskId, encodedToken}) =>
  await axios.post(
    `/api/archives/restore/${taskId}`,
    {},
    {
      headers: {
        authorization: encodedToken,
      },
    }
  );

// export const deleteFromArchive = async (task) => {
//   const calls = [
//     `/api/archives/restore/${task._id}`,
//     `/api/notes/trash/${task._id}`,
//   ];
//   return calls.map(
//     call => await axios.post(
//       call,
//       {},
//       {
//         headers: {
//           authorization: encodedToken,
//         },
//       }
//     )
//   )
// };
// const deleteTaskService = async (task) =>
//   await axios.post(
//     `/api/archives/delete/${task._id}`,
//     {},
//     {
//       headers: {
//         authorization: encodedToken,
//       },
//     }
//   );
export const deleteFromArchive = async ({taskId, encodedToken}) =>
  await axios.post(
    `/api/archives/delete/${taskId}`,
    {},
    {
      headers: {
        authorization: encodedToken,
      },
    }
  );
  export const archiveFromTrash = async ({taskId, encodedToken}) =>
  await axios.post(
    `/api/trash/archive/${taskId}`,
    {},
    {
      headers: {
        authorization: encodedToken,
      },
    }
  );
// const completeTaskService = async (task) => {

// }
export const trashTaskService = async ({ taskId, encodedToken}) =>
  await axios.post(
    `/api/notes/trash/${taskId}`,
    {},
    {
      headers: {
        authorization: encodedToken,
      },
    }
  );
export const completeTaskService = async ({ taskId, encodedToken}) =>
  await axios.post(
    `/api/notes/complete/${taskId}`,
    {},
    {
      headers: {
        authorization: encodedToken,
      },
    }
  );
export const restoreTaskService = async ({ taskId, encodedToken}) =>
  await axios.post(
    `/api/trash/restore/${taskId}`,
    {},
    {
      headers: {
        authorization: encodedToken,
      },
    }
  );

export const permanentlyDeleteTaskService = async ({ taskId, encodedToken}) =>
  await axios.delete(`/api/trash/delete/${taskId}`, {
    headers: {
      authorization: encodedToken,
    },
  });
