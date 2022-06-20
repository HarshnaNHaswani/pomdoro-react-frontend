import { TaskCardAllTasksPage } from "components/TaskCardAllTasksPage.jsx";
import { useTasks } from "context/task-context.js";
export const AllTasks = () => {
  const { tasksState : {tasks, archivedTasks, trash} } = useTasks();
  return (
    <div>
      <h2>All Tasks</h2>
      {tasks.length <= 0 &&
      archivedTasks.length <= 0 &&
      trash.length <= 0 ? (
        <p className="text text-lg">No tasks to display </p>
      ) : (
        <section>
          <h3 className="heading list-heading">Pending Tasks</h3>
          <ul className="list tasks-list">
            {[...tasks]
              .sort((a, b) => Number(b.isPinned) - Number(a.isPinned))
              .map((task) => (
                <TaskCardAllTasksPage key={task._id} task={task} />
              ))}
          </ul>
          <h3 className="heading list-heading">Archived Tasks</h3>
          <ul className="list tasks-list">
            {archivedTasks.map((task) => (
              <TaskCardAllTasksPage
                key={task._id}
                task={task}
                isArchived={true}
              />
            ))}
          </ul>

          <h3 className="heading list-heading">Trash</h3>
          <ul className="list tasks-list">
            {trash.map((task) => (
              <TaskCardAllTasksPage key={task._id} task={task} isTrash={true} />
            ))}
          </ul>
        </section>
      )}
    </div>
  );
};
