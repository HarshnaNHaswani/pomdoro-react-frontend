import React from "react";
import { createRoot } from "react-dom/client";
import "index.css";
import App from "App.jsx";
import { makeServer } from "server";
import { BrowserRouter } from "react-router-dom";
import { UserProvider } from "context/user-context.js";
import { AuthProvider } from "context/auth-context.js";
import { ThemeProvider } from "context/theme-context.js";
import { TasksProvider } from "context/task-context.js";

// Call make Server
makeServer();

const root = createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <UserProvider>
            <TasksProvider>
              <App />
            </TasksProvider>
          </UserProvider>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);
