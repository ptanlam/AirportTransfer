CREATE DATABASE [User_Service_DB]
GO

USE [User_Service_DB]
GO
/****** Object:  Table [dbo].[Users]    Script Date: 7/31/2021 10:09:26 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Users](
	[id] [nvarchar](36) NOT NULL,
	[email] [nvarchar](320) NOT NULL,
	[key] [nvarchar](72) NOT NULL,
	[firstName] [nvarchar](50) NOT NULL,
	[lastName] [nvarchar](50) NOT NULL,
	[isActive] [bit] NULL,
	[role] [nvarchar](9) NOT NULL,
	[phoneNumber] [nvarchar](15) NOT NULL,
	[resetPasswordCode] [int] NULL,
	[createdAt] [datetime2](7) NULL,
	[updatedAt] [datetime2](7) NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
UNIQUE NONCLUSTERED 
(
	[phoneNumber] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
UNIQUE NONCLUSTERED 
(
	[email] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[Users] ADD  DEFAULT (newid()) FOR [id]
GO
ALTER TABLE [dbo].[Users] ADD  DEFAULT ((0)) FOR [isActive]
GO
ALTER TABLE [dbo].[Users] ADD  DEFAULT (getdate()) FOR [createdAt]
GO
ALTER TABLE [dbo].[Users] ADD  DEFAULT (getdate()) FOR [updatedAt]
GO
/****** Object:  StoredProcedure [dbo].[SP_ActivateUser]    Script Date: 7/31/2021 10:09:26 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER OFF
GO

CREATE PROCEDURE [dbo].[SP_ActivateUser]
    @id NVARCHAR(36)
AS
BEGIN
    BEGIN TRY
        UPDATE [dbo].[Users]
        SET
            [isActive] = 1
        WHERE Users.id = @id
    END TRY
    BEGIN CATCH
        SELECT ERROR_MESSAGE() AS ErrorMessage
    END CATCH
END
GO
/****** Object:  StoredProcedure [dbo].[SP_ChangePassword]    Script Date: 7/31/2021 10:09:26 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER OFF
GO
CREATE PROCEDURE [dbo].[SP_ChangePassword]
    @userId NVARCHAR(36),
    @key NVARCHAR(250)
AS
BEGIN
    UPDATE Users
    SET [key] = @key
    WHERE id = @userId
END
GO
/****** Object:  StoredProcedure [dbo].[SP_CreateNewUser]    Script Date: 7/31/2021 10:09:26 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [dbo].[SP_CreateNewUser]
@email NVARCHAR(320),
@key NVARCHAR(72),
@presenterFirstName NVARCHAR(50),
@presenterLastName NVARCHAR(50),
@presenterPhoneNumber NVARCHAR(15),
@role NVARCHAR(9)
AS
    INSERT INTO [dbo].[Users]
    ( -- Columns to insert data into
    [email], [key], [firstName], [lastName], [phoneNumber], [role]
    )
    OUTPUT inserted.id
    VALUES
    ( -- First row: values for the columns in the list above
    @email, @key, @presenterFirstName, @presenterLastName, 
    @presenterPhoneNumber, @role
    )
GO
/****** Object:  StoredProcedure [dbo].[SP_EditUserProfile]    Script Date: 7/31/2021 10:09:26 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER OFF
GO
CREATE PROCEDURE [dbo].[SP_EditUserProfile]
    @userId NVARCHAR(36),
    @firstName NVARCHAR(50),
    @lastName NVARCHAR(50),
    @phoneNumber NVARCHAR(15)
AS
BEGIN
    DECLARE @updatedUser TABLE (
        id NVARCHAR(36),
        email NVARCHAR(36),
        firstName NVARCHAR(50),
        lastName NVARCHAR(50),
        [role] NVARCHAR(9),
        phoneNumber NVARCHAR(15)
    )
    UPDATE [dbo].[Users]
    SET
        [firstName] = ISNULL(@firstName, firstName),
        [lastName] = ISNULL(@lastName, lastName),
        [phoneNumber] = ISNULL(@phoneNumber, phoneNumber)
    OUTPUT inserted.id, inserted.email, inserted.firstName,
        inserted.lastName, inserted.role, inserted.phoneNumber
        INTO @updatedUser
    WHERE id = @userId

    SELECT * FROM @updatedUser
END
GO
/****** Object:  StoredProcedure [dbo].[SP_GenerateResetPasswordCode]    Script Date: 7/31/2021 10:09:26 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER OFF
GO
CREATE PROCEDURE [dbo].[SP_GenerateResetPasswordCode]
    @email NVARCHAR(320)
AS
BEGIN
    BEGIN TRY
        BEGIN TRAN
        DECLARE @resetPasswordCode INT
        SET @resetPasswordCode = LEFT(CAST(RAND()*1000000000+999999 AS INT), 6)

        UPDATE Users
        SET resetPasswordCode =  @resetPasswordCode
        WHERE email = @email

        SELECT @resetPasswordCode AS resetPasswordCode

        IF @@TRANCOUNT > 0
        BEGIN
            COMMIT TRAN
        END
    END TRY

    BEGIN CATCH
        IF @@TRANCOUNT > 0
        BEGIN
            ROLLBACK TRAN
        END
        SELECT ERROR_MESSAGE() AS ErrorMessage
    END CATCH
END
GO
/****** Object:  StoredProcedure [dbo].[SP_GetNumberOfUsersByYear]    Script Date: 7/31/2021 10:09:26 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER OFF
GO
CREATE   PROCEDURE [dbo].[SP_GetNumberOfUsersByYear]
    @year INT
AS
BEGIN
    DECLARE @report TABLE (
        [month] INT,
        numberOfUsers INT
    )

    DECLARE @currentMonth INT = MONTH(GETDATE())
    DECLARE @currentYear INT = YEAR(GETDATE())
    DECLARE @numberOfUsers INT

    IF(@year<=@currentYear)
    BEGIN
        SET @currentMonth = 12
    END

    IF(@year>@currentYear)
    BEGIN
        SET @currentMonth = 1
    END

    DECLARE @month INT
    SET @month = 1
    WHILE @month <= @currentMonth
    BEGIN
        SET @numberOfUsers = (SELECT COUNT(id) FROM Users WHERE  Month(createdAt) = @month)
        INSERT INTO @report 
        SELECT @month as [month], @numberOfUsers as numberOfUsers
        SET @month = @month + 1
    END

    SELECT * FROM @report    
END
GO
/****** Object:  StoredProcedure [dbo].[SP_GetUserByEmail]    Script Date: 7/31/2021 10:09:26 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER OFF
GO

CREATE PROCEDURE [dbo].[SP_GetUserByEmail]
(
    @email NVARCHAR(320)
)
AS
BEGIN
    SELECT *
    FROM Users
    WHERE Users.email = @email
END
GO
/****** Object:  StoredProcedure [dbo].[SP_GetUserById]    Script Date: 7/31/2021 10:09:26 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER OFF
GO

CREATE PROCEDURE [dbo].[SP_GetUserById]
(
    @id NVARCHAR(36)
)
AS
BEGIN
    SELECT *
    FROM Users
    WHERE Users.id = @id
END
GO
/****** Object:  StoredProcedure [dbo].[SP_GetUserByPhoneNumber]    Script Date: 7/31/2021 10:09:26 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER OFF
GO
CREATE PROCEDURE [dbo].[SP_GetUserByPhoneNumber]
    @phoneNumber NVARCHAR(320)
AS
BEGIN
    SELECT *
    FROM Users
    WHERE [phoneNumber] = @phoneNumber
END
GO
/****** Object:  StoredProcedure [dbo].[SP_ResetPassword]    Script Date: 7/31/2021 10:09:26 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER OFF
GO
CREATE PROCEDURE [dbo].[SP_ResetPassword]
    @email NVARCHAR(320),
    @key NVARCHAR(72)
AS
BEGIN
    UPDATE Users
    SET [key] = @key
    WHERE email = @email
END
GO
