import { useState } from "react";
import { useTasks } from "context/task-context.js";
import { TaskForm } from "./TaskForm";
export function TaskModal({
  setShowTaskModal,
  modalHeading,
  formType,
  taskData = {},
}) {
  const initialTaskData = {
    title: taskData.title ?? "",
    description: taskData.description ?? "",
    isPinned: taskData.isPinned ?? false,
    duration: {
      hours: taskData.hours ?? 0,
      minutes: taskData.minutes ?? 5,
      seconds: taskData.seconds ?? 0,
    },
    tags: taskData?.tags ? [...taskData.tags].join(",") : "",
    completed: taskData.completed ?? false,
    taskPriority: taskData.taskPriority ?? "5",
  };
  const [newTaskData, setNewTaskData] = useState(initialTaskData);
  const { addTask, updateTask } = useTasks();
  const [requestState, setRequestState] = useState({ type: "", text: "" });

  const cleanupHandler = () => {
    setNewTaskData({
      title: "",
      description: "",
      isPinned: false,
      duration: { hours: 0, minutes: 0, seconds: 0 },
      tags: "",
      completed: false,
      taskPriority: "5",
    });
    setRequestState({ type: "", text: "" });
    setShowTaskModal(false);
  };
  const taskHandler = () => {
    const { title } = newTaskData;
    const { hours, seconds, minutes } = newTaskData.duration;
    const error =
      title.length > 0
        ? hours < 5 && minutes < 60 && seconds < 60
          ? hours >= 0 && minutes >= 0 && seconds >= 0
            ? hours > 0 || minutes >= 5
              ? ""
              : "Minimum task duration should be 5 minutes"
            : "Negative value not allowed for duration"
          : "Duration exceeds allowed limit - Hours: 4, Minutes: 59, Seconds: 59"
        : "Title is required, min chars: 3, max chars: 15";
    if (error.length > 0)
      setRequestState((_) => ({ type: "error", text: error }));
    else {
      switch (formType) {
        case "add":
          addTask({ ...newTaskData, tags: newTaskData.tags.split(",") });
          break;
        case "edit":
          updateTask({
            ...newTaskData,
            tags: newTaskData.tags.split(",").map((tag) => tag.trim().toLowerCase()),
            _id: taskData._id,
          });
        default:
          break;
      }
      cleanupHandler();
    }
  };
  return (
    <div className="modal modal-simple">
      <section>
        <h2 className="heading modal-heading">{modalHeading}</h2>

        <TaskForm setNewTaskData={setNewTaskData} newTaskData={newTaskData} />
      </section>
      {requestState.type && requestState.type === "error" && (
        <p className="alert status-error-bg">{requestState.text}</p>
      )}
      <section className="actions modal-actions">
        <button className="btn outline-primary" onClick={cleanupHandler}>
          cancel
        </button>
        <button className="btn bg-accent" onClick={taskHandler}>
          {formType === "edit" ? "save" : formType === "add" ? "add" : ""}
        </button>
      </section>
    </div>
  );
}
