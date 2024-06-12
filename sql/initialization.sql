-- Create Test Database if it doesn't exist
IF NOT EXISTS (SELECT * FROM sys.databases WHERE name = 'Test')
BEGIN
  CREATE DATABASE Test
END
GO

-- Use Test DB
USE Test
GO

-- Select 100 Users
SELECT TOP 100 *
FROM dbo.users

-- Select 100 Codes
SELECT TOP 100 *
FROM dbo.codes

-- Delete all Users
TRUNCATE TABLE dbo.users
GO

-- Delete all Codes
TRUNCATE TABLE dbo.codes
GO