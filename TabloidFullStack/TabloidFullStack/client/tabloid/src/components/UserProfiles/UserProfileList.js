import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getAllProfiles } from "../../Managers/UserProfileManager";

const ProfileListItem = ({ profile }) => {
  return (
    <>
      <td>
        <Link to={`/profile/${profile.id}`}>{profile.displayName}</Link>
      </td>
      <td>
        {profile.firstName} {profile.lastName}
      </td>
      <td>{profile.userType.name}</td>
    </>
  );
};

export default function UserProfileList() {
  const [profiles, setProfiles] = useState([]);

  useEffect(() => {
    callGetAllProfiles();
  }, []);

  const callGetAllProfiles = async () => {
    const profiles = await getAllProfiles();
    setProfiles(profiles);
  };

  return (
    <div className="container pt-5">
      <div className="container d-flex align-items-center justify-content-between w-full">
        <h1>All User Profiles</h1>
      </div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Display Name</th>
            <th>Full Name</th>
            <th>User Type</th>
          </tr>
        </thead>
        <tbody>
          {profiles &&
            profiles.length > 0 &&
            profiles.map((profile) => {
              return (
                <tr key={profile.id}>
                  <ProfileListItem profile={profile} />
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
}
