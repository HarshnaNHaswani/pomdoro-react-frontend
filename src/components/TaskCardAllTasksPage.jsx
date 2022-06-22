import NotPinned from "assets/notPinned.png";
import NotPinnedDark from "assets/notPinnedDark.png";
import { useTasks } from "context/task-context.js";
import { useTheme } from "context/theme-context.js";
import { TaskModal } from "pages/Home/TaskModal";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
export const TaskCardAllTasksPage = ({ task, isArchived = false, isTrash = false }) => {
  const {
    togglePin,
    trashTask,
    deleteTaskFromTrash,
    
    deleteTaskFromArchive,
  } = useTasks();

  const { theme: {dark} } = useTheme();
  const deleteTaskHandler = () => {
    isArchived
      ? deleteTaskFromArchive(task._id)
      : isTrash
      ? deleteTaskFromTrash(task._id)
      : trashTask(task._id);
  };

  const [showEditTaskModal, setShowEditTaskModal] = useState(false);
  const location = useLocation();

  return (
    <li className="list-item">
      {showEditTaskModal && (
        <TaskModal
          setShowTaskModal={setShowEditTaskModal}
          formType={"edit"}
          modalHeading={"EDIT TASK"}
          taskData={task}
        />
      )}

      <div className="card-container card-vertical card-shadow badge-wrapper">
      {task?.taskPriority === "5" && (
          <p className={`badge badge-left badge-md status-inactive-bg`}>
            least
          </p>
        )}
        {task?.taskPriority === "4" && (
          <p className={`badge badge-left badge-md status-available-bg`}>low</p>
        )}
        {task?.taskPriority === "3" && (
          <p className={`badge badge-left badge-md status-active-bg`}>medium</p>
        )}
        {task?.taskPriority === "2" && (
          <p className={`badge badge-left badge-md status-idle-bg`}>high</p>
        )}
        {task?.taskPriority === "1" && (
          <p className={`badge badge-left badge-md status-busy-bg`}>
            very high
          </p>
        )}
        <button
          className="btn btn-icon"
          title={task.isPinned ? "pinned" : "pin task"}
          onClick={() => togglePin(task._id)}
        >
          {task.isPinned ? (
            <span role="img" aria-label="pinned" className="icon">
              📌
            </span>
          ) : (
            <img
              src={dark ? NotPinnedDark : NotPinned}
              alt="pin task"
              className="icon"
            />
          )}
        </button>
        <header>
          <h2>{task.title}</h2>
          <Link to={`/task/${task._id}`} state={location}>
            View Details...
          </Link>
        </header>
        <footer className="card-actions flex-row-wrap">
          {(!(isArchived || isTrash)) && (
            <button
              className="btn btn-icon"
              onClick={() => setShowEditTaskModal(true)}
            >
              <span
                role="img"
                aria-label="edit"
                title="edit"
                className="icon"
              >
                ✏️
              </span>
              Edit
            </button>
          )}
        </footer>
      </div>
    </li>
  );
};
