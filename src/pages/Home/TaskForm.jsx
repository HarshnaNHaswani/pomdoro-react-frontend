import React from "react";
import homeStyles from "./home.module.css";

export const TaskForm = ({ newTaskData, setNewTaskData }) => {
  return (
    <form className={`form modal-body ${homeStyles.taskForm}`}>
      <div className={`${homeStyles.statusPlainOutline} center-x`}>
        <label
          className={`text text-sm${homeStyles.taskLabel}`}
          htmlFor="task-title"
        >
          Title
        </label>
        <input
          value={newTaskData.title}
          onChange={(event) =>
            setNewTaskData((prev) => ({ ...prev, title: event.target.value }))
          }
          placeholder="enter task title"
          type="text"
          name="task-title"
          id="task-title"
          minLength={3}
          maxLength={15}
          required
        />
      </div>
      <div className={`${homeStyles.statusPlainOutline} center-x`}>
        <label
          className={`text text-sm ${homeStyles.taskLabel}`}
          htmlFor="task-description"
        >
          Description
        </label>
        <textarea
          value={newTaskData.description}
          onChange={(event) =>
            setNewTaskData((prev) => ({
              ...prev,
              description: event.target.value,
            }))
          }
          placeholder="enter task description"
          name="task-description"
          id="task-description"
          cols="30"
          rows="4"
          min={0}
          max={0}
          maxLength={120}
        ></textarea>
      </div>
      <fieldset
        className={`${homeStyles.statusPlainOutline} flex-row-wrap ${homeStyles.durationWrapper}`}
      >
        <legend
          htmlFor="task-duration"
          className={`text text-sm ${homeStyles.taskLabel}`}
        >
          Duration
        </legend>
        <div className={`${homeStyles.inputWrapper}`} id="task-duration">
          <input
            value={newTaskData.duration.hours}
            onChange={(event) =>
              setNewTaskData((prev) => ({
                ...prev,
                duration: { ...prev.duration, hours: event.target.value },
              }))
            }
            type="number"
            name="task-duration"
            id="hours"
            min={0}
            max={4}
            minLength={1}
            maxLength={1}
            placeholder={0}
            required
          />
          <label
            className={`text text-xs ${homeStyles.taskLabel}`}
            htmlFor="hours"
          >
            Hours
          </label>
        </div>
        <div className={`${homeStyles.inputWrapper}`}>
          <input
            value={newTaskData.duration.minutes}
            onChange={(event) =>
              setNewTaskData((prev) => ({
                ...prev,
                duration: { ...prev.duration, minutes: event.target.value },
              }))
            }
            type="number"
            name="task-duration"
            id="minutes"
            min={0}
            max={59}
            minLength={1}
            maxLength={2}
            placeholder={0}
            required
          />
          <label
            className={`text text-xs ${homeStyles.taskLabel}`}
            htmlFor="minutes"
          >
            Minutes
          </label>
        </div>
        <div className={`${homeStyles.inputWrapper}`}>
          <input
            value={newTaskData.duration.seconds}
            onChange={(event) =>
              setNewTaskData((prev) => ({
                ...prev,
                duration: { ...prev.duration, seconds: event.target.value },
              }))
            }
            type="number"
            name="task-duration"
            id="seconds"
            min={0}
            max={59}
            minLength={1}
            maxLength={2}
            placeholder={0}
            required
          />
          <label
            className={`text text-xs ${homeStyles.taskLabel}`}
            htmlFor="seconds"
          >
            Seconds
          </label>
        </div>
      </fieldset>
      <div className={`${homeStyles.statusPlainOutline} center-x`}>
        <label htmlFor="priority-list">Task Priority</label>
        <select
          id="priority-list"
          className="bg-secondary"
          value={newTaskData.taskPriority}
          onChange={(event) =>
            setNewTaskData((prev) => ({
              ...prev,
              taskPriority: event.target.value,
            }))
          }
        >
          <option value="1">very high</option>
          <option value="2">high</option>
          <option value="3">medium</option>
          <option value="4">low</option>
          <option value="5">
            least
          </option>
        </select>
      </div>
      <div className={`${homeStyles.statusPlainOutline} center-x`}>
        <h3 className="text text-sm">Pin task</h3>
        <input
          checked={newTaskData.isPinned}
          onChange={(event) =>
            setNewTaskData((prev) => ({ ...prev, isPinned: !prev.isPinned }))
          }
          type="checkbox"
          id="pinned"
          className="toggle-switch"
        />
        <label htmlFor="pinned"></label>
      </div>
      <div className={`${homeStyles.statusPlainOutline} center-x`}>
        <label
          className={`text text-sm ${homeStyles.taskLabel}`}
          htmlFor="task-tags"
        >
          Tags / Label:
        </label>
        <textarea
          value={newTaskData.tags}
          onChange={(event) =>
            setNewTaskData((prev) => ({
              ...prev,
              tags: event.target.value,
            }))
          }
          placeholder="tag1, tag2, tag3..."
          name="task-tags"
          id="task-tags"
          cols="30"
          rows="2"
          min={0}
          max={0}
          maxLength={80}
        ></textarea>
      </div>
    </form>
  );
};
