import React, { useState } from "react";
import { useUser } from "context/user-context.js";
import userStyles from "./userStyles.module.css";

export const ChangePassword = ({ setPasswordDialog }) => {
  const { userDataState, changePassword, userLoading } = useUser();
  const { user, error, loading } = userDataState;
  const initialPasswordState = {
    current: "",
    new: "",
    confirmNew: "",
    error: "",
  };
  const [password, setPassword] = useState(initialPasswordState);

  const updateAndClean = () => {
    setPasswordDialog(false);
    userLoading("Processing password change request");
    changePassword(password.new);
    setPassword(initialPasswordState);
  };

  const validatePassword = () => {
    user.password !== password.current
      ? setPassword((prev) => ({
          ...prev,
          current: "",
          error: "current password does not match",
        }))
      : user.password === password.new
      ? setPassword((prev) => ({
          ...prev,
          error: "new password is same as previous password",
          new: "",
          confirmNew: "",
        }))
      : password.new.trim().length < 8 || password.new.trim().length > 15
      ? setPassword((prev) => ({
          ...prev,
          error: "password length error- minimum: 8, maximum: 15",
        }))
      : password.new !== password.confirmNew
      ? setPassword((prev) => ({
          ...prev,
          new: "",
          confirmNew: "",
          error: "passwords do not match",
        }))
      : updateAndClean();
  };
  return (
    <div className="modal modal-stacked">
      <section>
        <h2 className="heading modal-heading">Change Password</h2>
        <form className={`form modal-body ${userStyles.passwordForm}`}>
          <div className={`form-item ${userStyles.passwordInputItem}`}>
            <label htmlFor="current-password">Current Password: </label>
            <input
              min="8"
              minLength={8}
              maxLength={15}
              max="15"
              id="current-password"
              type="password"
              value={password.current}
              required
              onChange={(e) =>
                setPassword((prev) => ({ ...prev, current: e.target.value }))
              }
            />
          </div>
          <div className={`form-item ${userStyles.passwordInputItem}`}>
            <label htmlFor="new-password">New Password: </label>
            <input
              min="8"
              minLength={8}
              maxLength={15}
              max="15"
              id="new-password"
              type="password"
              value={password.new}
              required
              onChange={(e) =>
                setPassword((prev) => ({ ...prev, new: e.target.value }))
              }
            />
          </div>
          <div className={`form-item ${userStyles.passwordInputItem}`}>
            <label htmlFor="confirm-new-password">Confirm New Password: </label>
            <input
              min="8"
              minLength={8}
              maxLength={15}
              max="15"
              id="confirm-new-password"
              type="password"
              value={password.confirmNew}
              required
              onChange={(e) =>
                setPassword((prev) => ({
                  ...prev,
                  confirmNew: e.target.value,
                }))
              }
            />
          </div>
        </form>
      </section>
      {password.error && <p className={`alert status-error-bg ${userStyles.modalAlert}`}>{password.error}</p>}
      <section className="actions modal-actions">
        <button
          className={`btn outline-primary ${userStyles.btnPasswordInput}`}
          onClick={() => {
            setPassword(initialPasswordState);
            setPasswordDialog(false);
          }}
        >
          Cancel
        </button>
        <button
          className={`btn bg-accent ${userStyles.btnPasswordInput}`}
          onClick={validatePassword}
        >
          Save New Password
        </button>
      </section>
    </div>
  );
};
