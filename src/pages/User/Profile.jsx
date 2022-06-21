import React, { useState } from "react";
import { useUser } from "context/user-context.js";
import { ChangePassword } from "./ChangePassword";
import userStyles from "./userStyles.module.css";
export const Profile = () => {
  const { userDataState } = useUser();
  const { user, error, loading } = userDataState;
  const [passwordDialog, setPasswordDialog] = useState(false);

  return (
    <div className={` text text-md ${userStyles.profile} bg-default`}>
      <h1>Profile</h1>
      {loading && <p className="status-info-bg">{loading}</p>}
      {error && <p className="status-error-bg">{error}</p>}
      {passwordDialog && (
        <ChangePassword setPasswordDialog={setPasswordDialog} />
      )}
      <div>
        <section>
          <small>Joined on: {user.createdAt}</small>
          <small>Last Updated: {user.updatedAt}</small>
        </section>
        <div>
          <label htmlFor="first-name">First Name: </label>
          <input
            type="text"
            name="firsPPPt-name"
            id="first-name"
            disabled
            value={user.firstName}
          />
        </div>
        <div>
          <label htmlFor="last-name">Last Name: </label>
          <input
            type="text"
            name="last-name"
            id="last-name"
            disabled
            value={user.lastName}
          />
        </div>
        {!(loading || error) && (
          <button
            className="btn outline-secondary"
            onClick={() => setPasswordDialog(true)}
          >
            Change Password &gt;
          </button>
        )}
      </div>
    </div>
  );
};
