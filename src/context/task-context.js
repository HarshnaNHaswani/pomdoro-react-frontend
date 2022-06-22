import { nanoid } from "nanoid";
import { createContext, useContext, useReducer } from "react";
import { taskReducer } from "reducers/taskReducer.js";
import {
  addTaskService,
  archiveTaskService,
  completeTaskService,
  deleteFromArchive,
  editTaskService,
  permanentlyDeleteTaskService,
  restoreTaskService,
  trashTaskService,
  unarchiveTaskService,
} from "services/taskServices.js";
import { useAuth } from "context/auth-context.js";
const initialState = {
  tasks: [
    {
      _id: 1,
      title: "Math Homework",
      description: "Lorem Ipsum",
      isPinned: true,
      duration: { hours: 0, minutes: 5, seconds: 0 },
      tags: ["school", "homework"],
      completed: false,
      taskPriority: "5",
    },
    {
      _id: 2,
      title: "Science Homework",
      description: "Lorem Ipsum",
      isPinned: false,
      duration: { hours: 0, minutes: 5, seconds: 0 },
      tags: ["school", "homework"],
      completed: false,
      taskPriority: "5",
    },
    {
      _id: 11,
      title: "Math Homework",
      description: "Lorem Ipsum",
      isPinned: false,
      duration: { hours: 0, minutes: 5, seconds: 0 },
      tags: ["school", "homework"],
      completed: false,
      taskPriority: "5",
    },
    {
      _id: 12,
      title: "Science Homework",
      description: "Lorem Ipsum",
      isPinned: false,
      duration: { hours: 0, minutes: 5, seconds: 0 },
      tags: ["school", "homework"],
      completed: false,
      taskPriority: "5",
    },
    {
      _id: 13,
      title: "Math Homework",
      description: "Lorem Ipsum",
      isPinned: true,
      duration: { hours: 0, minutes: 5, seconds: 0 },
      tags: ["school", "homework"],
      completed: false,
      taskPriority: "5",
    },
    {
      _id: 21,
      title: "Science Homework",
      description: "Lorem Ipsum",
      isPinned: false,
      duration: { hours: 0, minutes: 5, seconds: 0 },
      tags: ["school", "homework"],
      completed: false,
      taskPriority: "5",
    },
    {
      _id: 16,
      title: "Math Homework",
      description: "Lorem Ipsum",
      isPinned: false,
      duration: { hours: 0, minutes: 5, seconds: 0 },
      tags: ["school", "homework"],
      completed: false,
      taskPriority: "5",
    },
    {
      _id: 24,
      title: "Science Homework",
      description: "Lorem Ipsum",
      isPinned: false,
      duration: { hours: 0, minutes: 5, seconds: 0 },
      tags: ["school", "homework"],
      completed: false,
      taskPriority: "5",
    },
    {
      _id: 61,
      title: "Math Homework",
      description: "Lorem Ipsum",
      isPinned: true,
      duration: { hours: 0, minutes: 5, seconds: 0 },
      tags: ["school", "homework"],
      completed: false,
      taskPriority: "5",
    },
    {
      _id: 62,
      title: "Science Homework",
      description: "Lorem Ipsum",
      isPinned: false,
      duration: { hours: 0, minutes: 5, seconds: 0 },
      tags: ["school", "homework"],
      completed: false,
      taskPriority: "5",
    },
    {
      _id: 71,
      title: "Math Homework",
      description: "Lorem Ipsum",
      isPinned: false,
      duration: { hours: 0, minutes: 5, seconds: 0 },
      tags: ["school", "homework"],
      completed: false,
      taskPriority: "5",
    },
    {
      _id: 72,
      title: "Science Homework",
      description: "Lorem Ipsum",
      isPinned: false,
      duration: { hours: 0, minutes: 5, seconds: 0 },
      tags: ["school", "homework"],
      completed: false,
      taskPriority: "5",
    },
  ],
  completedTaskStats: [],
  archivedTasks: [],
  trash: [],
};

const TasksContext = createContext();
const TasksProvider = ({ children }) => {
  const [tasksState, tasksDispatch] = useReducer(taskReducer, initialState);
  const { token: encodedToken } = useAuth();
  const addTask = async (task) => {
    try {
      const _id = nanoid();
      console.log(task);
      const response = await addTaskService({
        task: { ...task, _id },
        encodedToken,
      });
      if (response.status === 201)
        tasksDispatch({
          type: "ADD_TASK",
          payload: { task: { ...task, _id } },
        });
    } catch (error) {
      console.log(error.response);
    }
  };
  const updateTask = async (task) => {
    try {
      const response = await editTaskService({ task, encodedToken });
      if (response.status === 201)
        tasksDispatch({ type: "UPDATE_TASK", payload: { task } });
    } catch (error) {
      console.log(error);
    }
  };
  const completeTask = async (taskId) => {
    try {
      const response = await completeTaskService({ taskId, encodedToken });
      if (response.status === 201)
        tasksDispatch({ type: "COMPLETE_TASK", payload: { taskId } });
    } catch (error) {
      console.log(error);
    }
  };
  const updateTaskPriority = async (taskId, taskPriority) => {
    tasksDispatch({
      type: "UPDATE_PRIORITY",
      payload: { taskId, taskPriority },
    });
  };
  const togglePin = async (taskId) => {
    tasksDispatch({ type: "TOGGLE_TASK_PIN", payload: { taskId } });
  };
  const trashTask = async (taskId) => {
    try {
      const response = await trashTaskService({ taskId, encodedToken });
      if (response.status === 201)
        tasksDispatch({ type: "DELETE_TASK", payload: { taskId } });
    } catch (error) {
      console.log(error);
    }
  };
  const restoreTask = async (taskId) => {
    try {
      const response = await restoreTaskService({ taskId, encodedToken });
      if (response.status === 200)
        tasksDispatch({ type: "RESTORE_TASK", payload: { taskId } });
    } catch (error) {
      console.log(error);
    }
  };
  const deleteTaskFromTrash = async (taskId) => {
    try {
      const response = await permanentlyDeleteTaskService({
        taskId,
        encodedToken,
      });
      if (response.status === 200)
        tasksDispatch({ type: "DELETE_FROM_TRASH", payload: { taskId } });
    } catch (error) {
      console.log(error);
    }
  };
  const archiveTask = async (taskId) => {
    try {
      const response = await archiveTaskService({ taskId, encodedToken });
      if (response.status === 201)
        tasksDispatch({ type: "ARCHIVE_TASK", payload: { taskId } });
    } catch (error) {
      console.log(error);
    }
  };
  const unarchiveTask = async (taskId) => {
    try {
      const response = await unarchiveTaskService({ taskId, encodedToken });
      if (response.status === 200)
        tasksDispatch({ type: "UNARCHIVE_TASK", payload: { taskId } });
    } catch (error) {
      console.log(error);
    }
  };
  const deleteTaskFromArchive = async (taskId) => {
    try {
      const response = await deleteFromArchive({ taskId, encodedToken });
      if (response.status === 200)
        tasksDispatch({ type: "DELETE_FROM_ARCHIVE", payload: { taskId } });
    } catch (error) {
      console.log(error);
    }
  };
  const clearPendingTasks = () =>
    tasksDispatch({ type: "CLEAR_PENDING", payload: {} });
  const clearArchive = () =>
    tasksDispatch({ type: "CLEAR_ARCHIVE", payload: {} });
  const clearTrash = () => tasksDispatch({ type: "CLEAR_TRASH", payload: {} });

  const setInitialData = ({ tasks, archivedTasks, trash }) => {
    const completedTaskStats =
      JSON.parse(localStorage.getItem("completed")) ?? [];
    tasksDispatch({
      type: "SET_INITIAL_DATA",
      payload: { tasks, archivedTasks, trash, completedTaskStats },
    });
  };
  return (
    <TasksContext.Provider
      value={{
        tasksState,
        setInitialData,
        addTask,
        updateTask,
        completeTask,
        updateTaskPriority,
        togglePin,
        clearPendingTasks,
        trashTask,
        deleteTaskFromTrash,
        restoreTask,
        clearTrash,
        archiveTask,
        deleteTaskFromArchive,
        unarchiveTask,
        clearArchive,
      }}
    >
      {children}
    </TasksContext.Provider>
  );
};

const useTasks = () => useContext(TasksContext);

export { useTasks, TasksProvider };
