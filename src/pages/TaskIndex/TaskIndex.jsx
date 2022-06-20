import React from "react";
import { Link } from "react-router-dom";
export const TaskIndex = () => {
  return (
    <div>
      <ul className="list list-bulleted">
        <li className="list-item">
          <Link to="/">Pending tasks</Link>
        </li>
        <li className="list-item">
          <Link to="./archive">Archived tasks</Link>
        </li>
        <li className="list-item">
          <Link to="./trash">Trash tasks</Link>
        </li>
        <li className="list-item">
          <Link to="./stats">Task Statistics</Link>
        </li>
      </ul>
    </div>
  );
};
