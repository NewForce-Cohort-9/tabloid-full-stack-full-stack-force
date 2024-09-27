select * from UserProfile

UPDATE UserProfile
SET ImageLocation = NULL
WHERE ImageLocation IS NOT NULL
  AND ImageLocation NOT LIKE 'uploads/%';
