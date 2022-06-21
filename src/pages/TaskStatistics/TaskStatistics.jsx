import React, { useEffect } from "react";
import { useTasks } from "context/task-context.js";
import statsStyles from "./statsStyles.module.css";
import { useState } from "react";
import dayjs from "dayjs";

export const TaskStatistics = () => {
  const { tasksState: {completedTaskStats} } = useTasks();
  const data = completedTaskStats ?? [];
  const [numberOfDays, setNumberOfDays] = useState(7);
  const [newData, setNewData] = useState([]);
  const [nearestDays, setNearestDays] = useState({ before: "", after: "" });
  const offset = { x: 3, y: 5 };
  const getDataHandler = () => {
    const end = dayjs().format("YYYY-MM-DD");
    const start = dayjs(end)
      .subtract(numberOfDays, "days")
      .format("YYYY-MM-DD");

    // if end date is not today(p2 feature?) and can be selected do data.find isAfter to get nearest later
    const before = (() =>
      [...data]?.reverse().find((day) => dayjs(day?.date).isBefore(start)))();
    setNearestDays((prev) => ({
      ...prev,
      before: { ...before, difference: dayjs(end).diff(before?.date, "day") },
    }));
    
    const updatedNewData = data.reduce((acc, day) => {
      const date = dayjs(day.date);
      return date.isSame(start) ||
        date.isSame(end) ||
        (date.isBefore(end) && date.isAfter(start))
        ? [...acc, day]
        : acc;
    }, []);
    setNewData(() => updatedNewData);
  };

  const minimum = {
    minX: newData.length,
    minY: newData.reduce(
      (acc, { taskIds }) => (taskIds?.length > acc ? taskIds?.length : acc),
      0
    ),
  };
  const title = { x: "Days", y: "No. of Tasks / Day" };

  const ContentDivider = ({
    additionalClasses = "",
    additionalStyles = {},
    children,
  }) => {
    return (
      <div className={`${additionalClasses}`} style={additionalStyles}>
        <hr />
        {children}
      </div>
    );
  };

  const XAxisData = ({ index, day }) => {
    return (
      <ContentDivider
        additionalClasses={statsStyles.date}
        additionalStyles={{
          gridRowStart: `-${offset.y - offset.x}`,
          gridRowEnd: `-${offset.y}`,
          gridColumnStart: `${index + offset.x}`,
        }}
      >
        <span style={{ writingMode: "vertical-rl" }}>{day.date}</span>
      </ContentDivider>
    );
  };

  const ValueNotation = ({ day, index }) => {
    return (
      <ContentDivider
        additionalClasses={statsStyles.valueNotation}
        additionalStyles={{
          gridRowStart: `-${offset.y}`,
          gridRowEnd: `-${(day?.taskIds?.length ?? 0) + offset.y}`,
          gridColumnStart: `${index + offset.x}`,
        }}
      >
        <span>{day?.taskIds?.length ?? 0}</span>
      </ContentDivider>
    );
  };
  useEffect(() => getDataHandler(), []);

  return (
    <div className="center-x">
      <h1 className="gutter-y-sm">Completed Task Stats</h1>
      {!data.length && (
        <p className="text text-md">
          No Completed Tasks, Finish some tasks to see stats
        </p>
      )}
      {data.length > 0 && !newData.length && (
        <div>
          <p className="text text-md">
            The mentioned days don't have finished tasks
          </p>
          <section>
            <p>Nearest Day: {nearestDays.before.date}</p>
            <p>Difference: {nearestDays.before.difference}</p>
          </section>
        </div>
      )}
      {data.length > 0 && (
        <div className="flex-row-wrap gutter-y-md">
          <label htmlFor="data-duration">Last X days:</label>
          <input
            className="outline-secondary"
            type="number"
            id="data-duration"
            value={numberOfDays}
            onChange={(e) => setNumberOfDays(e.target.value)}
          />
          <button
            onClick={getDataHandler}
            className={`btn outline-secondary ${statsStyles.btn}`}
          >
            get data
          </button>
        </div>
      )}
      {data.length > 0 && newData.length > 0 && (
        <div className={`${statsStyles.gridWrapper} outline-primary`}>
          <div
            className={statsStyles.mainGrid}
            style={{
              gridTemplateColumns: `repeat(${
                minimum.minX + offset.x
              }, minmax(2em, 4em))`,
              gridTemplateRows: `repeat(${
                minimum.minY + offset.y
              }, minmax(1em, 2em))`,
            }}
          >
            <h3 className={`${statsStyles.columnTitle} text-sm bg-secondary`}>
              {title.y}
            </h3>
            <h3 className={`${statsStyles.rowTitle} text-sm bg-secondary`}>
              {title.x}
            </h3>
          

            {newData.map((day, index) => (
              <XAxisData index={index} day={day} key={day.date} />
            ))}

            {newData.map((day, index) => (
              <ValueNotation
                day={day}
                index={index}
                key={`${day?.date}-${day?.taskIds?.length}`}
              />
            ))}
          </div>
        </div>
      )}

      <p className="alert status-idle-bg gutter-y-xl">
        This works on live data, for a test implementation see:{" "}
        <a
          href="https://codesandbox.io/s/stats-graph-2q558v?"
          target="_blank"
          className="underline"
        >
          codesandbox-stats-graph
        </a>
      </p>
    </div>
  );
};
