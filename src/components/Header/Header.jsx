import React, { useEffect } from "react";
import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";

import { useAuth } from "context/auth-context";
import { useTheme } from "context/theme-context.js";
import { slugify } from "utils/slugify.js";
import "./header.css";
export const Header = () => {
  const { isLoggedIn, setIsLoggedIn } = useAuth();
  const [menu, setMenu] = useState(false);
  const menuItems = ["all tasks", "archive", "trash", "stats"];
  const [isAuthPage, setIsAuthPage] = useState(false);

  const { theme: {dark} , toggleDarkTheme} = useTheme();

  const location = useLocation();

  useEffect(() => {
    setMenu(false);
    if (location.pathname.includes("/auth/") && !isAuthPage)
      setIsAuthPage((_) => true);
    else if (isAuthPage) setIsAuthPage(false);
  }, [location]);
  return (
    <header className="flex-row-wrap header-main">
      {!isAuthPage && (
        <button
          className="btn btn-icon outline-secondary"
          onClick={() => setIsLoggedIn(false)}
        >
          {isLoggedIn ? "logout" : "login"}
        </button>
      )}
      <NavLink to="/">
        <h1 className="heading heading-md ">Pomdoro</h1>
      </NavLink>
      {!isAuthPage && (
        <div className="hamburger-wrapper">
          <button
            className="btn btn-icon text text-md"
            onClick={() => setMenu((prev) => !prev)}
          >
            <span
              className="icon hamburger-menu"
              aria-label="hamburger-menu"
              role="img"
            >
              {menu ? <>&times;</> : "☰"}
            </span>
          </button>
          {menu && (
            <ul className="list toggle-menu center-xy bg-primary">
              <li className="list-item" key="nav">
                <ul className="list center-x">
                  <li className="list-item" key="home">
                    <NavLink to="/">Pending Tasks</NavLink>
                  </li>
                  {menuItems.map((item) => (
                    <li className="list-item" key={slugify(item)}>
                      <NavLink to={`/task/${slugify(item)}`}>{item}</NavLink>
                    </li>
                  ))}
                </ul>
              </li>
              <li key="user-and-preferences" className="list-item">
                <ul className="list center-x">
                  <li className="list-item" key="profile">
                    <NavLink to="/user/profile">Profile</NavLink>
                  </li>
                  <li>
                    <button
                      className={`btn bg-default ${
                        dark ? "dark" : ""
                      } btn-toggle-theme`}
                      onClick={toggleDarkTheme}
                    >
                      {dark && (
                        <>
                          <span className="invisible">...</span>
                          <span
                            role="img"
                            aria-label="dark"
                            className="round bg-secondary"
                          >
                            🌜
                          </span>
                        </>
                      )}
                      {!dark && (
                        <>
                          <span
                            role="img"
                            aria-label="light"
                            className="round bg-secondary"
                          >
                            🌞
                          </span>
                          <span className="invisible">...</span>
                        </>
                      )}
                    </button>
                  </li>
                </ul>
              </li>
            </ul>
          )}
        </div>
      )}
    </header>
  );
};
