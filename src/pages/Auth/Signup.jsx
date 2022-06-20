import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "context/auth-context.js";
import { useTasks } from "context/task-context.js";
import { useUser } from "context/user-context.js";
import { signUpService } from "services/authServices.js";
export const Signup = () => {
  const { setIsLoggedIn } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [loadState, setLoadState] = useState(false);
  const [error, setError] = useState(null);
  const { setUserDetails } = useUser();
  const { setInitialData } = useTasks();

  const initialState = {
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    confirmPassword: "",
    acceptTerms: false,
  };
  const [signUpData, setSignUpData] = useState(initialState);
  const {
    email,
    password,
    firstName,
    lastName,
    confirmPassword,
    acceptTerms,
  } = signUpData;
  const validatePassword = () => {
    let error =
      password.trim().length < 8 || confirmPassword.trim().length > 15
        ? "password length error- minimum: 8, maximum: 15"
        : password !== confirmPassword
        ? "passwords do not match"
        : "";
    return error ? { error, isValid: false } : { isValid: true, error: null };
  };

  const signUpHandler = async (event) => {
    event.preventDefault();
    try {
      setLoadState(true);
      setError(null);

      if (!signUpData.acceptTerms) {
        setLoadState(false);
        setError("please accept the terms and conditions");
        return;
      }
      if (
        !signUpData.firstName.trim().length >= 3 &&
        signUpData.firstName.trim().length <= 15
      ) {
        setLoadState(false);
        setError(
          "Length of first name should be less than 15 characters and more than 3 characters"
        );
        return;
      }
      const passwordValiation = validatePassword();
      if (!passwordValiation.isValid) {
        setLoadState(false);
        setError(passwordValiation.error);
        setSignUpData((prev) => ({
          ...prev,
          confirmPassword: "",
          password: "",
        }));
        return;
      }

      const emailCheckExpression = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (!emailCheckExpression.test(signUpData.email)) {
        setLoadState(false);
        setError(" Incorrect email format");
        setSignUpData((prev) => ({
          ...prev,
          email: "",
        }));
        return;
      }

      const response = await signUpService({
        email,
        password,
        firstName,
        lastName,
      });
      if (response.status === 201) {
        setLoadState(false);
        setError(null);
        setIsLoggedIn(true);
        setSignUpData({
          ...initialState,
        });
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
        } = response.data.createdUser;
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
        setUserDetails(response.data.createdUser);
        setToken(response.data.encodedToken);
        location?.state?.from?.pathname
         navigate("/");
      } else {
        setLoadState(false);
        setError("An Error Occurred! Try again later");
      }
    } catch (error) {
      setLoadState(false);
      console.log(error?.response, error);

      if (error?.response?.status === 422)
        setError("User Already Exists, Login instead!");
      else if (error.response.status === 500)
        setError("Server Error! Try again later");
      else setError("An Error Occured! Please try again later");
      setSignUpData({ ...initialState });
    }
  };

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
          value={signUpData.email}
          required
          onChange={(event) =>
            setSignUpData((prev) => ({
              ...prev,
              email: event.target.value,
            }))
          }
        />
      </div>
      <label htmlFor="first-name">First Name</label>
    <div className={`form-item`}>
        <input
          type="text"
          id="first-name"
          placeholder="enter first name"
          min="3"
          max="15"
          aria-label="first name"
          autoComplete="first name"
          value={signUpData.firstName}
          required
          onChange={(event) =>
            setSignUpData((prev) => ({
              ...prev,
              firstName: event.target.value,
            }))
          }
        />
      </div>

      <label htmlFor="last-name">Last Name</label>
      <div className={`form-item`}>
        <input
          type="text"
          id="last-name"
          placeholder="enter last name"
          min="3"
          max="15"
          aria-label="last name"
          autoComplete="last name"
          value={signUpData.lastName}
          onChange={(event) =>
            setSignUpData((prev) => ({
              ...prev,
              lastName: event.target.value,
            }))
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
          min={8}
          minLength={8}
          max={15}
          maxLength={15}
          aria-label="password"
          value={signUpData.password}
          required
          onChange={(event) =>
            setSignUpData((prev) => ({
              ...prev,
              password: event.target.value,
            }))
          }
        />
      </div>
      <label htmlFor="password">Confirm Password: </label>
      <div className="form-item">
        <input
          type="password"
          name="password"
          id="confirm-password"
          placeholder="confirm-password"
          autoComplete="confirm-password"
          min={8}
          minLength={8}
          max={15}
          maxLength={15}
          aria-label="confirm password"
          value={signUpData.confirmPassword}
          required
          onChange={(event) =>
            setSignUpData((prev) => ({
              ...prev,
              confirmPassword: event.target.value,
            }))
          }
        />
      </div>
      <p className="form-item checkbox-wrapper">
        <input
          type="checkbox"
          id="terms"
          checked={acceptTerms}
          onChange={() =>
            setSignUpData((prev) => ({
              ...prev,
              acceptTerms: !prev.acceptTerms,
            }))
          }
        />
        <label htmlFor="terms" className="label form-label checkbox-label">
          I accept all terms and conditions
        </label>
      </p>
      {error && <p className="status-error-outline status-error-bg">{error}</p>}
      {loadState && (
        <p className="status-info-outline status-info-bg">Loading...</p>
      )}
      <section className="flex-row-wrap">
        <button
          className="btn outline-secondary"
          onClick={(e) => {
            e.preventDefault();
            setSignUpData(initialState);
          }}
        >
          Clear Data
        </button>
        <button className="btn bg-primary" onClick={signUpHandler}>
          Submit
        </button>
      </section>
      <Link to="../login" state={{ location: location.state.location ?? null }}>
        Already have an account? Login
      </Link>
    </form>
  );
};
