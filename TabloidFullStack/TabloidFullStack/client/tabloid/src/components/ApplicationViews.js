import React, { useEffect, useState } from "react";
import AdminViews from "./AdminViews";
import { UserView } from "./UserView";

export default function ApplicationViews() {
  const [currentUser, setCurrentUser] = useState({})
  useEffect(() => {
    const localUser = localStorage.getItem("userProfile")
    const userObj = JSON.parse(localUser)

    setCurrentUser(userObj)
  }, [])

  if(currentUser.userTypeId === 1)
  {
    return (
      <AdminViews currentUser={currentUser}/>
    )
  }
  else 
  {
    return (
      <UserView currentUser={currentUser} />
    )
  }
}
