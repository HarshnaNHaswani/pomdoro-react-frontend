import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth-context";
import { useTasks } from "../../context/task-context";
import { useUser } from "../../context/user-context";
import { loginService } from "../../services/authServices";
export const Login = () => {
  const { isLoggedIn, setIsLoggedIn, setToken } = useAuth();
  const { setUserDetails } = useUser();
  const { setInitialData } = useTasks();
  const location = useLocation();
  const navigate = useNavigate();

  const initialData = {
    email: "",
    password: "",
    rememberMe: true,
  };
  const testData = {
    email: "test@gmail.com",
    password: "12345678",
  };
  const [loginData, setLoginData] = useState(initialData);
  const [error, setError] = useState(null);
  const [loadState, setLoadState] = useState(false);
  const loginHandler = async (event, { test }) => {
    event.preventDefault();
    try {
      setLoadState(true);
      setError(null);
      const requestData = test
        ? testData
        : {
            email: loginData.email,
            password: loginData.password,
          };
      const response = await loginService(requestData);
      if (response.status === 200) {
        setLoadState(false);
        setError(null);
        const {
          email,
          password,
          firstName,
          lastName,
          _id,
          createdAt,
          updatedAt,
          archives,
          notes,
          trash,
        } = response.data.foundUser;
        setUserDetails({
          email,
          password,
          firstName,
          lastName,
          _id,
          createdAt,
          updatedAt,
        });
        setInitialData({ tasks: notes, archivedTasks: archives, trash });
        loginData.rememberMe
          ? localStorage.setItem(
              "user",
              JSON.stringify({
                email,
                password,
              })
            )
          : localStorage.removeItem("user");
        setToken(response.data.encodedToken);
        setLoginData(initialData);
        setIsLoggedIn(true);
          navigate("/");
      } else {
        setError("An Error Occurred! Try again later");
      }
    } catch (error) {
      setLoadState(false);
      switch (error?.response?.status ?? 0) {
        case 401: {
          setError("Wrong Password! Try again");
          setLoginData((prev) => ({ ...prev, password: "" }));
          break;
        }
        case 404: {
          setError("User not found! Please check your email");
          setLoginData(initialData);
          break;
        }
        default:
          setError("An Error Occured! Please try again later");
          setLoginData(initialData);
          console.log(error);
      }
    }
  };

  useEffect(() => {
    const userCreds = JSON.parse(localStorage.getItem("user")) ?? {
      email: "",
      password: "",
    };
    const { email, password } = userCreds;
    if (email?.length > 0 && password?.length > 0)
      setLoginData((prev) => ({ ...prev, email, password }));
  }, []);
  useEffect(() => {
    if (isLoggedIn) {
      navigate(location?.state?.from?.pathname ?? "/", { replace: true });
    }
  }, []);
  return (
    <form className="form">
      <label htmlFor="email">Email: </label>
      <div className="form-item">
        <input
          type="email"
          name="email"
          id="email"
          placeholder="email"
          autoComplete="email"
          value={loginData.email}
          onChange={(e) =>
            setLoginData((prev) => ({ ...prev, email: e.target.value }))
          }
        />
      </div>
      <label htmlFor="password">Password: </label>
      <div className="form-item">
        <input
          type="password"
          name="password"
          id="password"
          placeholder="password"
          autoComplete="current-password"
          value={loginData.password}
          onChange={(e) =>
            setLoginData((prev) => ({ ...prev, password: e.target.password }))
          }
        />
      </div>
      {/* <p className="form-item checkbox-wrapper">
        <input
          type="checkbox"
          name="login"
          id="remember"
          checked={loginData.rememberMe}
          onChange={() =>
            setLoginData((prev) => ({
              ...prev,
              rememberMe: !prev.rememberMe,
            }))
          }
        />
        <label htmlFor="remember" className="label form-label checkbox-label">
          Remember Me
        </label>
      </p> */}
      {error && <p className="status-error-outline status-error-bg">{error}</p>}
      {loadState && (
        <p className="status-info-outline status-info-bg">Loading...</p>
      )}
      <button
        className="btn bg-primary"
        onClick={(event) => loginHandler(event, { test: false })}
      >
        Login
      </button>
      <button
        type="submit"
        className="btn outline-accent"
        onClick={(event) => {
          setLoginData((prev) => ({ ...prev, ...testData }));
          loginHandler(event, { test: true });
        }}
      >
        login with test credentials
      </button>
      <Link to="../forgot-password" className="gutter-y-sm">
        Forgot Password?
      </Link>
      <Link
        to="../signup"
        state={{ location: location?.state?.from?.location ?? null }}
      >
        Don't have an account? sign up
      </Link>
    </form>
  );
};
