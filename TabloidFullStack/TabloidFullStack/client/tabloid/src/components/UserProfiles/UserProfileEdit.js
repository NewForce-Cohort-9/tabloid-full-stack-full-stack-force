import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  getByProfileId,
  updateProfile,
} from "../../Managers/UserProfileManager";
import TagPageHeader from "../Tags/TagPageHeader";

export default function UserProfileEdit() {
  const [profile, setProfile] = useState(null);
  const [userTypeOptions, setUserTypeOptions] = useState([
    {
      id: 1,
      name: "Admin",
      selected: false,
    },
    { id: 2, name: "Author", selected: true },
  ]);

  const { id: profileId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (profileId) callGetUserProfile();
  }, [profileId]);

  const callGetUserProfile = async () => {
    const profile = await getByProfileId(profileId);
    const currentUserTypeId = profile?.userType?.id ?? 2;
    const priorSelection = selectUserType(currentUserTypeId);

    const selectedFirst = priorSelection.sort(
      (a, b) => b.selected - a.selected
    );
    setProfile(profile);
    setUserTypeOptions(selectedFirst);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const selection = userTypeOptions.find((item) => item.selected);

    await updateProfile({ ...profile, userTypeId: selection.id });
    navigate("/profiles");
  };

  const selectUserType = (userTypeId) => {
    const selection = userTypeOptions.map((option) => ({
      ...option,
      selected: option.id === userTypeId,
    }));
    return selection;
  };

  const onUserTypeSelect = (e) => {
    const selection = selectUserType(Number(e.target.value));
    setUserTypeOptions(selection);
  };

  return (
    <>
      <TagPageHeader title={`Editing user profile: ${profile?.displayName}`} />
      <div className="container pt-5">
        <div className="container d-flex align-items-center justify-content-center flex-column">
          <form>
            <h1 className="p-4">Select user type:</h1>

            <div className="d-flex justify-content-center">
              <select
                onChange={onUserTypeSelect}
                style={{ height: "2.5rem" }}
                className="w-100 mh-100 d-flex text-capitalize"
              >
                {userTypeOptions.map((option, index) => {
                  return (
                    <option
                      className="text-capitalize"
                      key={index}
                      value={option.id}
                    >
                      {option.name}
                    </option>
                  );
                })}
              </select>
            </div>

            <button
              type="submit"
              className="btn mt-4 btn-primary mx-1 text-white w-100"
              onClick={handleSave}
            >
              Save
            </button>
            <Link to={"/profiles"}>
              <span className="btn mt-4 btn-outline-primary mx-1 text-primary w-100">
                Cancel
              </span>
            </Link>
          </form>
        </div>
      </div>
    </>
  );
}
