import React from "react";
import { useTasks } from "context/task-context.js";
import { TaskCard } from "components/TaskCard.jsx";
export const Archive = () => {
  const { tasksState : { archivedTasks }, clearArchive } = useTasks();
  return (
    <div>
      <h2>Archive</h2>
      <button
        className={`btn outline-secondary 
        ${archivedTasks.length <= 0 ? "hidden" : "position-right"}      
      `}
        onClick={clearArchive}
      >
        Clear Archive
      </button>
      {archivedTasks.length <= 0 ? (
        <p className="text text-lg">No Archived Tasks</p>
      ) : (
        <ul className="list tasks-list">
          {archivedTasks.map((task) => (
            <TaskCard key={task._id} task={task} isArchived={true} />
          ))}
        </ul>
      )}
    </div>
  );
};
