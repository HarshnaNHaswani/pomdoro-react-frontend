import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { StopWatch } from "../../components/StopWatch";
import { useTasks } from "../../context/task-context";
import { findTask } from "../../utils/findTask";
import NotPinned from "../../assets/notPinned.png";
import NotPinnedDark from "../../assets/notPinnedDark.png";
import Archive from "../../assets/archive.png";
import ArchiveDark from "../../assets/archiveDark.png";
import Unarchive from "../../assets/unarchive.png";
import UnarchiveDark from "../../assets/unarchiveDark.png";
import Restore from "../../assets/restore.png";
import RestoreDark from "../../assets/restoreDark.png";
import { useTheme } from "../../context/theme-context";
import { TaskModal } from "../Home/TaskModal";

export const SingleTask = () => {
  const { taskId } = useParams();
  const {
    tasksState,
    togglePin,
    trashTask,
    deleteTaskFromTrash,
    restoreTask,
    archiveTask,
    deleteTaskFromArchive,
    unarchiveTask,
  } = useTasks();
  const isArchived = tasksState.archivedTasks.some(({ _id }) => _id === taskId);
  const isTrash = tasksState.trash.some(({ _id }) => taskId === _id);
  const { theme } = useTheme();
  const { dark } = theme;
  const deleteTaskHandler = () => {
    isArchived
      ? deleteTaskFromArchive(task._id)
      : isTrash
      ? deleteTaskFromTrash(task._id)
      : trashTask(task._id);
  };

  console.log(taskId, tasksState.tasks);
  const [showEditTaskModal, setShowEditTaskModal] = useState(false);

  const task = isArchived
    ? findTask(tasksState.archivedTasks, taskId)
    : isTrash
    ? findTask(tasksState.trash, taskId)
    : findTask(tasksState.tasks, taskId);

  if (task) {
    return (
      <div className="center-x">
        <section>
          {task?.taskPriority === "5" && (
            <p className={`text text-md status-inactive-bg`}>
              <strong>least</strong>
            </p>
          )}
          {task?.taskPriority === "4" && (
            <p className={`text text-md status-available-bg`}>
              <strong>low</strong>
            </p>
          )}
          {task?.taskPriority === "3" && (
            <p className={`text text-md status-active-bg`}>
              <strong>medium</strong>
            </p>
          )}
          {task?.taskPriority === "2" && (
            <p className={`text text-md badge-md status-idle-bg`}>
              <strong>high</strong>
            </p>
          )}
          {task?.taskPriority === "1" && (
            <p className={`text text-md status-busy-bg`}>
              <strong>very high</strong>
            </p>
          )}
        </section>
        <h1>{task.title}</h1>
        <p>{task.description}</p>
        {showEditTaskModal && (
          <TaskModal
            setShowTaskModal={setShowEditTaskModal}
            formType={"edit"}
            modalHeading={"EDIT TASK"}
            taskData={task}
          />
        )}
        <StopWatch
          duration={task.duration}
          taskId={task._id}
          disabled={isArchived || isTrash}
        />

        <section className="flex-row-wrap">
          <button
            className="btn btn-icon"
            title={task.isPinned ? "pinned" : "pin task"}
            onClick={() => togglePin(task._id)}
          >
            {task.isPinned ? (
              <>
                <span role="img" aria-label="pinned" className="icon">
                  📌
                </span>
                Pinned
              </>
            ) : (
              <>
                <img
                  src={dark ? NotPinnedDark : NotPinned}
                  alt="pin task"
                  className="icon"
                />
                Pin Task
              </>
            )}
          </button>
          {!(isArchived || isTrash) && (
            <button
              className="btn btn-icon"
              onClick={() => setShowEditTaskModal(true)}
            >
              <span
                role="img"
                aria-label="pinned"
                title="pinned"
                className="icon"
              >
                ✏️
              </span>
              Edit
            </button>
          )}
          {isTrash && (
            <button
              className="btn btn-icon"
              title="restore task"
              onClick={() => {
                restoreTask(task._id);
              }}
            >
              <img
                src={dark ? RestoreDark : Restore}
                alt="restore task"
                className="icon"
              />
              Restore
            </button>
          )}
          {isArchived && (
            <button
              className="btn btn-icon"
              title="unarchive task"
              onClick={() => {
                unarchiveTask(task._id);
              }}
            >
              <img
                src={dark ? UnarchiveDark : Unarchive}
                alt="unarchive task"
                className="icon"
              />
              Unarchive
            </button>
          )}

          {!isArchived && (
            <button
              className="btn btn-icon"
              title="archive task"
              onClick={() => {
                archiveTask(task._id);
              }}
            >
              <img
                src={dark ? ArchiveDark : Archive}
                alt="archive task"
                className="icon"
              />
              Archive
            </button>
          )}
          <button
            className="btn btn-icon"
            title={`delete ${
              isArchived ? "from archive" : isTrash ? "permanently" : ""
            }`}
            onClick={deleteTaskHandler}
          >
            <span
              role="img"
              aria-label="pinned"
              title="pinned"
              className="icon"
            >
              ❌
            </span>
            Delete
          </button>
        </section>
        {isArchived && (
          <p className=" text alert status-idle-bg">
            <strong>UnArchive task to enable timer</strong>
          </p>
        )}
        {isTrash && (
          <p className=" text alert status-idle-bg">
            <strong>Restore task to enable timer</strong>
          </p>
        )}
      </div>
    );
  } else {
    return <h1>Task Not Found</h1>;
  }
};
