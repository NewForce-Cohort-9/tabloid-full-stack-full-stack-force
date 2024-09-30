export const ADMIN_ACTION_TYPES = {
  Deactivate: "Deactivate",
  ChangeUserType: "ChangeUserType",
};

const adminRequestBase = "https://localhost:5001/api/AdminActionRequest";

export const getRequestByTargetUserAndAction = async (
  targetUserId,
  actionType
) => {
  if (actionType in ADMIN_ACTION_TYPES) {
    const response = await fetch(
      `${adminRequestBase}/${targetUserId}/${actionType}`
    );
    return await response.json();
  } else throw new Error("Invalid admin action type");
};

export const createAdminRequest = async (request) => {
  if (request.actionType in ADMIN_ACTION_TYPES) {
    await fetch(adminRequestBase, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(request),
    });
  } else throw new Error("Invalid admin action type");
};

export const approveAdminRequest = async (request) => {
  if (request.actionType in ADMIN_ACTION_TYPES) {
    await fetch(`${adminRequestBase}/approve/${request.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(request),
    });
  } else throw new Error("Invalid admin action type");
};
