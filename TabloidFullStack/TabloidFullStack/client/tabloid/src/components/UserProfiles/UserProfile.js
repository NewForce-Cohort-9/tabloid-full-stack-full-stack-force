import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getByProfileId } from "../../Managers/UserProfileManager";

export default function UserProfile() {
  const [profile, setProfile] = useState(null);

  const { id: profileId } = useParams();

  useEffect(() => {
    if (profileId) callGetProfile();
  }, [profileId]);

  const callGetProfile = async () => {
    const profile = await getByProfileId(profileId);
    console.log("p", profile);
    setProfile(profile);
  };

  if (!profile) return <div>Profile doesnt exist.</div>;

  return (
    <section style={{ backgroundColor: "#eee" }}>
      <div className="container py-5">
        <div className="row">
          <div className="col-lg-4">
            <div className="card mb-4">
              <div className="card-body text-center">
                {profile.imageLocation ? (
                  <img
                    src="https://static.vecteezy.com/system/resources/previews/009/292/244/original/default-avatar-icon-of-social-media-user-vector.jpg"
                    alt="default avatar"
                    className="rounded-circle img-fluid"
                    style={{ width: "150px" }}
                  />
                ) : (
                  <img
                    src={profile.imageLocation}
                    alt="avatar"
                    className="rounded-circle img-fluid"
                    style={{ width: "150px" }}
                  />
                )}

                <h5 className="my-3">{profile.displayName}</h5>
                <p className="text-muted mb-1">
                  {profile.fullName ??
                    `${profile.firstName} + ${profile.lastName}`}
                </p>
                <p className="text-muted mb-4">{profile.email}</p>
                <div className="d-flex justify-content-center mb-2">
                  <button type="button" className="btn btn-danger">
                    Deactivate
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline-primary ms-1"
                  >
                    Message
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-8">
            <div className="card mb-4">
              <div className="card-body">
                <div className="row">
                  <div className="col-sm-3">
                    <p className="mb-0">Display Name</p>
                  </div>
                  <div className="col-sm-9">
                    <p className="text-muted mb-0">{profile.displayName}</p>
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <p className="mb-0">Full Name</p>
                  </div>
                  <div className="col-sm-9">
                    <p className="text-muted mb-0">
                      {profile.fullName ??
                        `${profile.firstName} + ${profile.lastName}`}
                    </p>
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <p className="mb-0">Email</p>
                  </div>
                  <div className="col-sm-9">
                    <p className="text-muted mb-0">{profile.email}</p>
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <p className="mb-0">Creation Date</p>
                  </div>
                  <div className="col-sm-9">
                    <p className="text-muted mb-0">
                      {new Date(profile.createDateTime).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <p className="mb-0">Profile type</p>
                  </div>
                  <div className="col-sm-9">
                    <p className="text-muted mb-0">{profile.userType.name}</p>
                  </div>
                </div>
                <hr />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
