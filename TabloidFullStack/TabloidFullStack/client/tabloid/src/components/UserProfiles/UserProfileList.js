import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAllProfiles } from "../../Managers/UserProfileManager";

const ProfileListItem = ({ profile }) => {
  const navigate = useNavigate();

  return (
    <>
      <td>
        <Link to={`/profile/${profile.id}`}>{profile.displayName}</Link>
      </td>
      <td>
        {profile.firstName} {profile.lastName}
      </td>
      <td>{profile.userType.name}</td>
      {profile.isDeactivated ? (
        <td
          onClick={() => navigate(`/profile/reactivate/${profile.id}`)}
          className="btn btn-success "
          title="Reactivate"
        >
          Reactivate
        </td>
      ) : (
        <td
          onClick={() => navigate(`/profile/deactivate/${profile.id}`)}
          style={{ backgroudColor: "red" }}
          className="btn btn-danger "
          title="Deactivate"
        >
          Deactivate
        </td>
      )}
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
