import dayjs from "dayjs";
import { filterItem } from "../utils/filterItem";
import { findTask } from "../utils/findTask";
export const taskReducer = (state, action) => {
  switch (action.type) {
    case "SET_INITIAL_DATA": {
      const {
        tasks,
        archivedTasks,
        completedTaskStats,
        trash,
      } = action.payload;
      return {
        ...state,
        tasks,
        archivedTasks,
        completedTaskStats,
        trash,
      };
    }
    case "ADD_TASK": {
      return {
        ...state,
        tasks: [...state.tasks, action.payload.task],
      };
    }
    case "DELETE_TASK": {
      const deletedTask = findTask(state.tasks, action.payload.taskId);
      if (deletedTask) {
        const filteredTasks = filterItem(state.tasks, action.payload.taskId);
        return {
          ...state,
          tasks: [...filteredTasks],
          trash: [...state.trash, deletedTask],
        };
      }
      return state;
    }
    case "UPDATE_TASK": {
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task._id === action.payload.task._id ? action.payload.task : task
        ),
      };
    }
    case "COMPLETE_TASK": {
      const taskToBeCompleted = findTask(state.tasks, action.payload.taskId);
      if (taskToBeCompleted) {
        const tasksArr = filterItem(state.tasks, action.payload.taskId);
        const day = state.completedTaskStats.find((day) =>
          dayjs().isSame(day.date, "date")
        );
        if (day) {
          const updatedCompletedTasks = state.completedTaskStats.map(
            (currDay) =>
              dayjs().isSame(currDay.date, "date")
                ? {
                    ...currDay,
                    taskIds: [...currDay.taskIds, action.payload.taskId],
                  }
                : currDay
          );

          localStorage.setItem(
            "completed",
            JSON.stringify(updatedCompletedTasks)
          );
          return {
            ...state,
            tasks: [...tasksArr],
            completedTaskStats: [...updatedCompletedTasks],
            trash: [...state.trash, { ...taskToBeCompleted, completed: true }],
          };
        } else {
          const today = dayjs().format("YYYY-MM-DD");
          return {
            ...state,
            tasks: [...tasksArr],
            completedTaskStats: [
              ...state.completedTaskStats,
              {
                date: today,
                taskIds: [action.payload.taskId],
              },
            ],
            trash: [...state.trash, { ...taskToBeCompleted, completed: true }],
          };
        }
      }
      return state;
    }
    case "ARCHIVE_TASK": {
      const taskId = action.payload.taskId;
      const archivedTask =
        findTask(state.tasks, taskId) ?? findTask(state.trash, taskId);
      return archivedTask
        ? {
            ...state,
            tasks: filterItem(state.tasks, taskId),
            archivedTasks: [...state.archivedTasks, archivedTask],
            trash: filterItem(state.trash, taskId),
          }
        : state;
    }
    case "UPDATE_PRIORITY": {
      const taskId = action.payload.taskId;
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task._id === taskId
            ? { ...task, taskPriority: action.payload.taskPriority }
            : task
        ),
      };
    }
    case "TOGGLE_TASK_PIN": {
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task._id === action.payload.taskId
            ? { ...task, isPinned: !task.isPinned }
            : task
        ),
        archivedTasks: state.archivedTasks.map((task) =>
          task._id === action.payload.taskId
            ? { ...task, isPinned: !task.isPinned }
            : task
        ),
        trash: state.trash.map((task) =>
          task._id === action.payload.taskId
            ? { ...task, isPinned: !task.isPinned }
            : task
        ),
      };
    }
    case "DELETE_FROM_ARCHIVE": {
      const deletedTask = findTask(state.archivedTasks, action.payload.taskId);
      return deletedTask
        ? {
            ...state,
            archivedTasks: filterItem(
              state.archivedTasks,
              action.payload.taskId
            ),
            trash: [...state.trash, deletedTask],
          }
        : state;
    }
    case "DELETE_FROM_TRASH": {
      return {
        ...state,
        trash: filterItem(state.trash, action.payload.taskId),
      };
    }
    case "UNARCHIVE_TASK": {
      const archivedTask = findTask(state.archivedTasks, action.payload.taskId);
      return archivedTask
        ? {
            ...state,
            tasks: [...state.tasks, archivedTask],
            archivedTasks: filterItem(
              state.archivedTasks,
              action.payload.taskId
            ),
          }
        : state;
    }
    case "RESTORE_TASK": {
      const trashedTask = findTask(state.trash, action.payload.taskId);
      return trashedTask
        ? {
            ...state,
            tasks: [...state.tasks, trashedTask],
            trash: filterItem(state.trash, action.payload.taskId),
          }
        : state;
    }
    case "CLEAR_PENDING": {
      return {
        ...state,
        tasks: [],
      };
    }
    case "CLEAR_ARCHIVE": {
      return {
        ...state,
        archive: [],
      };
    }
    case "CLEAR_TRASH": {
      return {
        ...state,
        trash: [],
      };
    }
    default:
      return state;
  }
};
