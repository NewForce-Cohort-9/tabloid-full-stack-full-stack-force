CREATE TABLE Subscription (
    Id INT PRIMARY KEY IDENTITY(1,1),
    SubscriberUserProfileId INT NOT NULL,
    ProviderUserProfileId INT NOT NULL,
    BeginDateTime DATETIME NOT NULL,
    EndDateTime DATETIME NULL,
    CONSTRAINT UC_Subscription UNIQUE (SubscriberUserProfileId, ProviderUserProfileId),
    FOREIGN KEY (SubscriberUserProfileId) REFERENCES UserProfile(Id),
    FOREIGN KEY (ProviderUserProfileId) REFERENCES UserProfile(Id)
);
