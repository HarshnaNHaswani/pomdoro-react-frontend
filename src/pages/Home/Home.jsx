import { TaskCard } from "components/TaskCard";
import { useTasks } from "context/task-context.js";
import { useEffect, useState } from "react";
import "pages/task-list.css";
import homeStyles from "./home.module.css";
import { TaskModal } from "./TaskModal";
export const Home = () => {
  const {
    tasksState: { tasks },
    clearPendingTasks,
  } = useTasks();
  const [selectVal, setSelectValue] = useState({
    sortPriority: "none",
    filterPriority: "none",
    filterTags: "all",
  });
  const tagsArr = tasks?.reduce((acc, task) => {
    const tags = task?.tags ?? [];
    const currArr = tags.filter(
      (tag) => !acc.includes(tag.trim().toLowerCase())
    );
    return [...acc, ...currArr];
  }, []);

  const getSortedTasks = () => {
    console.log(selectVal.sortPriority);
    let sorted = [...tasks].sort(
      (a, b) => Number(b.isPinned) - Number(a.isPinned)
    );
    sorted =
      selectVal.sortPriority === "low"
        ? sorted.sort((a, b) => Number(b.taskPriority) - Number(a.taskPriority))
        : selectVal.sortPriority === "high"
        ? sorted.sort((a, b) => Number(a.taskPriority) - Number(b.taskPriority))
        : sorted;
    console.log(sorted);
    return sorted;
  };
  const getFilteredTasks = () => {
    let sorted = getSortedTasks();
    return selectVal.filterPriority !== "none"
      ? sorted.filter((task) => task.taskPriority === selectVal.filterPriority)
      : selectVal.filterTags !== "all"
      ? sorted.filter((task) => task.tags.includes(selectVal.filterTags))
      : sorted;
  };
  const filteredTasks = getFilteredTasks();

  useEffect(() => console.log(filteredTasks), [tasks]);
  const [showTaskModal, setShowTaskModal] = useState(false);

  return (
    <div>
      <h1 className="gutter-y-sm">Home</h1>
      {showTaskModal && (
        <TaskModal
          setShowTaskModal={setShowTaskModal}
          formType={"add"}
          modalHeading={"ADD TASK"}
        />
      )}
      <h3>Sort & Filter</h3>
      <div
        className={` ${
          tasks.length <= 0 ? "hidden" : homeStyles.taskFilterWrapper
        }`}
      >
        <div className={homeStyles.filter}>
          <label htmlFor="filter-tags">Tags: </label>
          <select
            onChange={(event) =>
              setSelectValue((prev) => ({
                ...prev,
                filterTags: event.target.value,
              }))
            }
            value={selectVal.filterTags}
            className="outline-accent"
            name="filter"
            title="select tag filter"
            id="filter-tags"
          >
            <option key="all" value="all">
              Show All pending tasks
            </option>
            {tagsArr.map((tag) => (
              <option key={tag} value={tag}>
                {tag}
              </option>
            ))}
            &#711;
          </select>
        </div>
        <div className={homeStyles.filter}>
          <label htmlFor="filter-task-priority">Filter priorty: </label>
          <select
            onChange={(event) =>
              setSelectValue((prev) => ({
                ...prev,
                filterPriority: event.target.value,
              }))
            }
            value={selectVal.filterPriority}
            className="outline-accent"
            name="filter"
            title="select priority filter"
            id="filter-task-priority"
          >
            <option key="none" value="none">
              none{" "}
            </option>
            <option key="very high" value="1">
              very high{" "}
            </option>
            <option key="high" value="2">
              high{" "}
            </option>
            <option key="medium" value="3">
              medium{" "}
            </option>
            <option key="low" value="4">
              low{" "}
            </option>
            <option key="least" value="5">
              least
            </option>
            &#711;
          </select>
        </div>
        <div className={homeStyles.filter}>
          <label htmlFor="sort-priority">Sort Priority: </label>
          <select
            onChange={(event) =>
              setSelectValue((prev) => ({
                ...prev,
                sortPriority: event.target.value,
              }))
            }
            value={selectVal.sortPriority}
            className="outline-accent"
            name="filter"
            title="select priority sort"
            id="sort-priority"
          >
            <option key="none" value="none">
              none
            </option>
            <option key={"low"} value="low">
              low to high
            </option>
            <option key={"high"} value="high">
              high to low
            </option>
            &#711;
          </select>
        </div>
      </div>
      <section
        className={`flex-row-wrap ${tasks.length <= 0 ? "" : "position-right"}`}
      >
        <button
          className={`btn outline-secondary  ${
            tasks.length <= 0 ? "hidden" : "position-right"
          }`}
          onClick={clearPendingTasks}
        >
          Clear All Pending Tasks
        </button>
        <button
          className="btn bg-secondary"
          onClick={() => setShowTaskModal(true)}
        >
          Add Task
        </button>
      </section>
      {tasks.length <= 0 && (
        <div>
          <p className="text text-lg">No Pending Tasks</p>
        </div>
      )}
      {tasks.length > 0 && filteredTasks.length <= 0 && (
        <div>No tasks in this sort and filter</div>
      )}{" "}
      {filteredTasks.length > 0 && (
        <ul className="list tasks-list gutter-y-sm">
          {filteredTasks.map((task) => (
            <TaskCard key={task?._id ?? Math.random()} task={task} />
          ))}
        </ul>
      )}
    </div>
  );
};
