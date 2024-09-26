-- Adds a new IsDeactivated bit (boolean) column to UserProfile table
-- (Needed to fulfill ticket requirements)
-- Set default values to 0 (equates to false)

ALTER TABLE [UserProfile]
ADD [IsDeactivated] bit NOT NULL DEFAULT 0; 