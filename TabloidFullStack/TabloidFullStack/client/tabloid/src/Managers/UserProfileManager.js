const apiUrl = "https://localhost:5001";
const profileBase = `${apiUrl}/api/UserProfile`;

// Update login function to include error handling
export const login = (userObject) => {
  return fetch(`${apiUrl}/api/userprofile/getbyemail?email=${userObject.email}`)
    .then((r) => {
      if (!r.ok) {
        throw new Error("Login failed"); // Added error handling for response
      }
      return r.json();
    })
    .then((userProfile) => {
      if (userProfile.id) {
        localStorage.setItem("userProfile", JSON.stringify(userProfile));
        return userProfile;
      } else {
        return undefined; // This handles cases where userProfile is not found
      }
    });
};

export const logout = () => {
  localStorage.clear(); // Clears the user profile on logout
};

export const register = (userObject, password) => {
  return fetch(`${apiUrl}/api/userprofile`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userObject),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Registration failed"); // Added error handling for registration
      }
      return response.json();
    })
    .then((savedUserProfile) => {
      localStorage.setItem("userProfile", JSON.stringify(savedUserProfile));
    });
};

// UserProfileContext provider setup remains the same

// return (
//   <UserProfileContext.Provider value={{ isLoggedIn, login, logout, register }}>
//      {props.children}
//   </UserProfileContext.Provider>
// );

export const getAllProfiles = async () => {
  const response = await fetch(profileBase);
  return await response.json();
};

export const getByProfileId = async (profileId) => {
  const response = await fetch(`${profileBase}/${profileId}`);

  if (response.ok) return await response.json();
  else return null;
};


export const getUserProfileById = (id) => {
    return fetch(`${apiUrl}/api/UserProfile/${id}`)
        .then((res) => res.json());
};