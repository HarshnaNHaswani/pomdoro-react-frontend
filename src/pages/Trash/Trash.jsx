import React from "react";
import { useTasks } from "context/task-context.js";
import { TaskCard } from "components/TaskCard";
export const Trash = () => {
  const { tasksState:{trash}, clearTrash } = useTasks();
  return (
    <div>
      <h2>Trash</h2>
      <button
        className={`btn outline-secondary 
        ${trash.length <= 0 ? "hidden" : "position-right"}      
      `} onClick={clearTrash}>
        Clear Trash
      </button>
      {trash.length <= 0 ? <p className="text text-lg">No tasks in Trash</p>:
        <ul className="list tasks-list">
        {trash.map((task) => (
          <TaskCard key={task._id} task={task} isTrash={true} />
        ))}
      </ul>}
    </div>
  );
};
