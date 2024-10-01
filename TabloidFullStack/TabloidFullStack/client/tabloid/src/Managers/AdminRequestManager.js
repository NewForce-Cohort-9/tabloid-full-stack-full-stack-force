export const ADMIN_ACTION_TYPES = {
  Deactivate: "Deactivate",
  UserType: "UserType",
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

    if (!response.ok) return null;

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

//adminId in this case is the logged in admin who is making the request.
//will work for both create and update.
export const handleTwoAdminAction = async (
  userProfileId,
  adminId,
  actionType
) => {
  try {
    const action = ADMIN_ACTION_TYPES[actionType];

    if (!action) throw new Error("Invalid action type");

    const existingAdminRequest = await getRequestByTargetUserAndAction(
      userProfileId,
      action
    );

    if (existingAdminRequest && !existingAdminRequest.isCompleted) {
      const updatedRequest = {
        ...existingAdminRequest,
        isCompleted: true,
        approvedAt: new Date(),
        approvingAdminId: adminId,
      };

      if (adminId === existingAdminRequest.requestingAdminId) {
        throw new Error("Must be a different admin.");
      }

      await approveAdminRequest(updatedRequest);

      return { message: "Approved admin action", didUpdate: true };
    } else {
      const newRequest = {
        targetUserId: userProfileId,
        requestingAdminId: adminId,
        approvingAdminId: null,
        actionType: action,
        isCompleted: false,
        requestedAt: new Date(),
        approvedAt: null,
      };

      await createAdminRequest(newRequest);

      return {
        message: "Request sent and will wait for another admin to approve.",
        didUpdate: false,
      };
    }
  } catch (error) {
    return null;
  }
};
