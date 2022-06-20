import { useLocation, useNavigate } from "react-router-dom";
import Next from "assets/next.png";
import NextDark from "assets/nextDark.png";
import Previous from "assets/previous.png";
import PreviousDark from "assets/previousDark.png";
import { useTheme } from "context/theme-context.js";
import "./nav.css";

export function NavigateSite() {
  const location = useLocation();
  const navigate = useNavigate();
  const { theme: {dark} } = useTheme();
  return (
    <section
      className={`${
        location.pathname.includes("/auth/") ? "hidden" : "flex-row-wrap"
      } navigate-wrapper`}
    >
      <button
        className="btn btn-icon round"
        title="previous"
        onClick={() => navigate(-1)}
      >
        <img
          className="icon"
          src={dark ? PreviousDark : Previous}
          alt="previous"
        />
      </button>
      <button
        className="btn btn-icon round"
        title="next"
        onClick={() => navigate(1)}
      >
        <img className="icon" src={dark ? NextDark : Next} alt="next" />
      </button>
    </section>
  );
}
