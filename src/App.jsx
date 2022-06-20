import "./App.css";
import { Router } from "router";
import { useTheme } from "context/theme-context.js";
function App() {
  const { theme: {dark} } = useTheme();
  return (
    <div className={`App bg-default ${dark ? "dark" : ""}`}>
      <Router />
    </div>
  );
}

export default App;
