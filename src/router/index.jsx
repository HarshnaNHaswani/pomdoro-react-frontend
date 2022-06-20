import React from "react";
import { useRoutes } from "react-router-dom";
import { AuthLayout } from "../components/layout/AuthLayout";
import { MainLayout } from "../components/layout/MainLayout";
import { RequiresAuth } from "../components/RequiresAuth/RequiresAuth";
import { AllTasks } from "../pages/AllTasks/AllTasks";
import { Archive } from "../pages/Archive/Archive";
import { AuthIndex } from "../pages/Auth/AuthIndex";
import { Login } from "../pages/Auth/Login";
import { Signup } from "../pages/Auth/Signup";
import { Home } from "../pages/Home/Home";
import { NotFound } from "../pages/NotFound/NotFound";
import { SingleTask } from "../pages/SingleTask/SingleTask";
import { TaskIndex } from "../pages/TaskIndex/TaskIndex";
import { TaskStatistics } from "../pages/TaskStatistics/TaskStatistics";
import { Trash } from "../pages/Trash/Trash";
import { Profile } from "../pages/User/Profile";
import MockmanEs from "mockman-js";

export const Router = () => {
  let routes = useRoutes([
    ,
    {
      element: <MainLayout />,
      children: [
        {
          path: "auth",
          element: <AuthLayout />,
          children: [
            { path: "login", element: <Login /> },
            { path: "signup", element: <Signup /> },
            //   { path: "forgot-password", element: <ForgotPassword /> },
            { index: true, element: <AuthIndex /> },
            {
              path: "*",
              element: <NotFound />,
            },
          ],
        },
        {
          element: <RequiresAuth />,
          children: [
            { path: "/", element: <Home /> },
            {
              path: "task",
              children: [
                {
                  path: "all-tasks",
                  element: <AllTasks />,
                },
                {
                  path: ":taskId",
                  element: <SingleTask />,
                },
                {
                  path: "stats",
                  element: <TaskStatistics />,
                },
                {
                  path: "archive",
                  element: <Archive />,
                },
                {
                  path: "trash",
                  element: <Trash />,
                },
                {
                  index: true,
                  element: <TaskIndex />,
                },
                {
                  path: "*",
                  element: <NotFound />,
                },
              ],
            },
            {
              path: "user",
              children: [
                {
                  path: "profile",
                  element: <Profile />,
                },
                {
                  path: "*",
                  element: <NotFound />,
                },
              ],
            },
          ],
        },
      ],
    },
    {
      path: "mock",
      element: <MockmanEs />,
    },
    {
      path: "*",
      element: <NotFound />,
    },
  ]);
  return routes;
};
