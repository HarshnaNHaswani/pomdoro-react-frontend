import { useEffect, useRef, useState } from "react";
import Pause from "../assets/pause.png";
import Play from "../assets/play.png";
import Restart from "../assets/restart.png";
import Stop from "../assets/stop.png";
import PauseDark from "../assets/pauseDark.png";
import PlayDark from "../assets/playDark.png";
import RestartDark from "../assets/restartDark.png";
import StopDark from "../assets/stopDark.png";
import { useTasks } from "../context/task-context";
import { useTheme } from "../context/theme-context";

export const StopWatch = ({ duration, taskId, disabled }) => {
  const { completeTask } = useTasks();
  const { theme } = useTheme();
  const {dark} = theme;
  const timerRef = useRef({ timerId: null, currentDuration: null });
  const totalSeconds = timerRef.currentDuration
    ? timerRef.currentDuration
    : duration.hours * 60 * 60 + duration.minutes * 60 + duration.seconds;
  const [progress, setProgress] = useState(totalSeconds);
  const [isPaused, setIsPaused] = useState(true);

  const start = () => {
    timerRef.current.timerId = setInterval(() => {
      setIsPaused(false);
      setProgress((prev) => prev - 1);
    }, 1000);
  };
  const pause = () => {
    setIsPaused(true);
    timerRef.current.currentDuration = progress;
    clearInterval(timerRef.current.timerId);
    timerRef.current.timerId = null;
  };
  const restart = () => {
    setIsPaused(false);
    setProgress(totalSeconds);
    clearInterval(timerRef.current.timerId);
    start();
  };
  const stop = () => {
    setIsPaused(true);
    clearInterval(timerRef.current.timerId);
    setProgress(totalSeconds);
    timerRef.current = { timerId: null, currentDuration: null };
  };

  useEffect(() => {
    if (progress <= 0) {
      clearInterval(timerRef.current.timerId);
      completeTask(taskId);
      document.title = "Pomodoro";
    } else
      document.title = `${parseInt(progress / 3600)} : ${parseInt(
        (progress % 3600) / 60
      )} : ${parseInt((progress % 3600) % 60)}  | Pomodoro`;
  }, [progress]);
  return (
    <div className="stopwatch">
      <progress min="0" value={progress} max={totalSeconds}></progress>
      <section>
        <h3>Progress:</h3>
        <p>
          <span>
            Hours:
            <strong>{parseInt(progress / 3600)}</strong>
          </span>
          <span>
            Minutes:
            <strong>{parseInt((progress % 3600) / 60)}</strong>
          </span>
          <span>
            Seconds:
            <strong>{parseInt((progress % 3600) % 60)}</strong>
          </span>
        </p>
      </section>
      <section className="flex-row-wrap ">
        <button
          className={`btn btn-icon ${dark ? "bg-accent" : "bg-secondary"}`}
          onClick={start}
          disabled={!isPaused || progress === 0 || disabled}
        >
          start <img src={dark? Play : PlayDark} alt="start" title="start" className="icon" />
        </button>
        <button
          className={`btn btn-icon ${dark ? "bg-accent" : "bg-secondary"}`}
          onClick={pause}
          disabled={isPaused || progress === 0 || disabled}
        >
          pause <img src={dark? Pause : PauseDark} alt="pause" title="pause" className="icon" />
        </button>
        <button
          className={`btn btn-icon ${dark ? "bg-accent" : "bg-secondary"}`}
          onClick={restart}
          disabled={progress === totalSeconds || disabled}
        >
          restart{" "}
          <img src={dark? Restart : RestartDark} alt="restart" title="restart" className="icon" />
        </button>
        <button
          className={`btn btn-icon ${dark ? "bg-accent" : "bg-secondary"}`}
          onClick={stop}
          disabled={progress === totalSeconds || progress === 0 || disabled}
        >
          stop <img src={dark? Stop : StopDark} alt="Stop" title="Stop" className="icon" />
        </button>
      </section>
    </div>
  );
};
