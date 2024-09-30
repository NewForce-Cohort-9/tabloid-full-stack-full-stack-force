CREATE TABLE AdminActionRequest (
[Id] integer PRIMARY KEY IDENTITY,
[TargetUserId] integer NOT NULL, 
[RequestingAdminId] integer NOT NULL,
[ApprovingAdminId] integer, 
[ActionType] nvarchar(255) NOT NULL,
[IsCompleted] bit NOT NULL DEFAULT 0, 
[RequestedAt] datetime NOT NULL, 
[ApprovedAt] datetime

CONSTRAINT FK_AdminActionRequest_TargetUser FOREIGN KEY (TargetUserId)
REFERENCES UserProfile(Id),

CONSTRAINT FK_AdminActionRequest_RequestingAdmin FOREIGN KEY (RequestingAdminId)
REFERENCES UserProfile(Id),

CONSTRAINT FK_AdminActionRequest_ApprovingAdmin FOREIGN KEY (ApprovingAdminId)
REFERENCES UserProfile(Id),
);

--The below enforces uniqueness where a request IS NOT completed.
--In order to avoid confusion, for a single action type (Deactivating, ChangeUserType, etc),
--only 1 non-completed admin request can be opened for a single target user with the same action type.
--so for targetUserId 1, you could only have 1 "Deactivating" entry if the entry IS NOT completed.
CREATE UNIQUE INDEX IX_TargetUser_ActionType 
ON AdminActionRequest (TargetUserId, ActionType)
WHERE IsCompleted = 0;
