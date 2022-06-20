import "./App.css";
import { Router } from "./router";
import { useTheme } from "./context/theme-context";
function App() {
  const { theme } = useTheme();
  return (
    <div className={`App bg-default ${theme.dark ? "dark" : ""}`}>
      <Router />
    </div>
  );
}

export default App;
