import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAllProfiles } from "../../Managers/UserProfileManager";

const ProfileListItem = ({ profile, isAdminLossProtection }) => {
  const navigate = useNavigate();

  const handleDeactivate = () => {
    if (isAdminLossProtection(profile)) return;

    navigate(`/profile/deactivate/${profile.id}`);
  };

  return (
    <>
      <td>
        <Link to={`/profile/${profile.id}`}>{profile.displayName}</Link>
      </td>
      <td>
        {profile.firstName} {profile.lastName}
      </td>
      <td>{profile.userType.name}</td>
      <td
        onClick={() => navigate(`/profile/edit/${profile.id}`)}
        className="btn btn-success"
      >
        Edit
      </td>
      {profile.isDeactivated ? (
        <td
          onClick={() => navigate(`/profile/reactivate/${profile.id}`)}
          className="btn btn-success"
          title="Reactivate"
        >
          Reactivate
        </td>
      ) : (
        <td
          onClick={handleDeactivate}
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
  const [isFiltering, setIsFiltering] = useState(true);

  useEffect(() => {
    callGetAllProfiles();
  }, []);

  const callGetAllProfiles = async () => {
    const profiles = await getAllProfiles();
    setProfiles(profiles);
  };

  const filterDeactivated = async () => {
    const profiles = await getAllProfiles();
    if (isFiltering) {
      const onlyDeactivated = profiles.filter((p) => p.isDeactivated);
      setProfiles(onlyDeactivated);
      setIsFiltering(false);
    } else {
      setProfiles(profiles);
      setIsFiltering(true);
    }
  };

  const isAdminLossProtection = (profile) => {
    const activeAdmins = profiles.filter(
      (p) => !p.isDeactivated && p.userType.name === "Admin"
    );

    if (activeAdmins.length <= 1 && profile.userType.name === "Admin") {
      window.alert(
        "Make someone else an admin before you can deactivate another User Profile."
      );
      return true;
    }

    return false;
  };

  return (
    <div className="container pt-5">
      <div className="container d-flex align-items-center justify-content-between">
        <h1>All User Profiles</h1>
        <span onClick={filterDeactivated} className="btn btn-primary">
          {isFiltering ? "View Deactivated" : "View All"}
        </span>
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
                  <ProfileListItem
                    profile={profile}
                    isAdminLossProtection={isAdminLossProtection}
                  />
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
}
