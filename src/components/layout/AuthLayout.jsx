import { Outlet } from "react-router-dom";
import graph from "assets/graph.jpg";
import stats2 from "assets/stats2.jpg";
import timer2 from "assets/timer2.jpg";
import todo from "assets/todo.jpg";
import "./layout.css"
export const AuthLayout = () => {
  const parallax = [
    { img: todo, content: "Keep track of all your tasks" },
    { img: timer2, content: "Do Concentrated Studying in Intervals" },
    { img: graph, content: "Monitor your progress" },
    { img: stats2, content: "View Stats" },
  ];
  const isEven = (num) => num % 2 === 0;
  return (
    <div>
      {parallax.map((item, index) => (
        <div
          className={`parallax parallax-${index}  ${
            isEven(index) ? "flex-left" : "flex-right"
          }`}
          style={{ backgroundImage: `url(${item.img})` }}
          key={`img-${index}`}
        >
          <p className={`text text-xl bg-secondary`}>{item.content}</p>
        </div>
      ))}
      <div className="auth-content-wrapper">
        <Outlet />
      </div>
    </div>
  );
};
