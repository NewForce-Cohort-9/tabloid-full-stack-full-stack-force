select * from Reaction

select * from PostReaction

INSERT INTO PostReaction (PostId, ReactionId, UserProfileId)
VALUES (1, 1, 3);

UPDATE Reaction
SET ImageLocation = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6Jt4fWTTKq-a3g4LAk1FNBRURO87dt5UDjg&s'
WHERE Id = 2;
