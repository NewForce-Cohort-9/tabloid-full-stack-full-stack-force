import { useState, useEffect } from "react";
import { useLocation, useParams, useNavigate, Link } from "react-router-dom";
import {
  getByProfileId,
  updateProfile,
  getAllProfiles,
} from "../../Managers/UserProfileManager";

export default function UserProfileConfirm() {
  const [profile, setProfile] = useState(null);

  const { id: profileId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const isDeactivating = location.pathname.includes("deactivate");

  useEffect(() => {
    if (profileId) callGetProfile();
  }, [profileId]);

  const callGetProfile = async () => {
    const profile = await getByProfileId(profileId);
    setProfile(profile);
  };

  const performAccountActionRedirect = async (isDeactivated) => {
    if (isDeactivated && (await isAdminProtection())) {
      return;
    }

    updateProfile({ ...profile, isDeactivated });
    navigate("/profiles");
  };

  const isAdminProtection = async () => {
    const profiles = await getAllProfiles();

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

  if (!profile) return <div>Profile doesnt exist.</div>;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "6rem",
      }}
    >
      <h2>{isDeactivating ? "Deactivate" : "Reactivate"} account</h2>
      <p>
        Are you sure you want to {isDeactivating ? "deactivate" : "reactivate"}{" "}
        this account?
      </p>
      <div className="d-flex flex-column gap-1 my-4">
        <p>
          <strong>Display name:</strong> {profile.displayName}
        </p>
        <p>
          <strong>Created On:</strong>{" "}
          {new Date(profile.createDateTime).toLocaleString()}
        </p>
      </div>
      <div className="d-flex flex-row gap-3 justify-content-start">
        <Link to="/profiles" className="btn btn-secondary">
          Cancel
        </Link>
        {isDeactivating ? (
          <button
            onClick={() => performAccountActionRedirect(true)}
            className="btn btn-danger"
          >
            Deactivate
          </button>
        ) : (
          <button
            onClick={() => performAccountActionRedirect(false)}
            className="btn btn-success"
          >
            Reactivate
          </button>
        )}
      </div>
    </div>
  );
}
