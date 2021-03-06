CREATE DATABASE [Partner_Service_DB]
GO

USE [Partner_Service_DB]
GO
/****** Object:  Table [dbo].[Classes]    Script Date: 7/31/2021 10:08:55 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Classes](
	[id] [nvarchar](36) NOT NULL,
	[name] [nvarchar](250) NOT NULL,
	[createdAt] [datetime2](7) NULL,
	[updatedAt] [datetime2](7) NULL,
	[isActive] [bit] NULL,
	[partnerId] [nvarchar](36) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[LostPercentages]    Script Date: 7/31/2021 10:08:55 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[LostPercentages](
	[id] [nvarchar](36) NOT NULL,
	[policyId] [nvarchar](36) NOT NULL,
	[lostPercentage] [int] NOT NULL,
	[createdAt] [datetime2](7) NULL,
	[updatedAt] [datetime2](7) NULL,
	[isActive] [bit] NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Partners]    Script Date: 7/31/2021 10:08:55 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Partners](
	[id] [nvarchar](36) NOT NULL,
	[name] [nvarchar](250) NOT NULL,
	[hotline] [nvarchar](15) NOT NULL,
	[email] [nvarchar](320) NOT NULL,
	[transportType] [nvarchar](10) NOT NULL,
	[logoUrl] [nvarchar](max) NOT NULL,
	[presenterId] [nvarchar](36) NOT NULL,
	[isActive] [bit] NOT NULL,
	[isRegistered] [bit] NOT NULL,
	[createdAt] [datetime] NULL,
	[updatedAt] [datetime] NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
UNIQUE NONCLUSTERED 
(
	[hotline] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
UNIQUE NONCLUSTERED 
(
	[name] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
UNIQUE NONCLUSTERED 
(
	[email] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Policies]    Script Date: 7/31/2021 10:08:55 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Policies](
	[id] [nvarchar](36) NOT NULL,
	[type] [nvarchar](20) NOT NULL,
	[classId] [nvarchar](36) NOT NULL,
	[createdAt] [datetime2](7) NULL,
	[updatedAt] [datetime2](7) NULL,
	[isActive] [bit] NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[PolicyConditions]    Script Date: 7/31/2021 10:08:55 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[PolicyConditions](
	[id] [nvarchar](36) NOT NULL,
	[policyId] [nvarchar](36) NOT NULL,
	[condition] [time](0) NOT NULL,
	[createdAt] [datetime2](7) NULL,
	[updatedAt] [datetime2](7) NULL,
	[isActive] [bit] NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Vouchers]    Script Date: 7/31/2021 10:08:55 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Vouchers](
	[id] [nvarchar](36) NOT NULL,
	[partnerId] [nvarchar](36) NOT NULL,
	[salePercentage] [int] NOT NULL,
	[startDate] [datetime2](7) NOT NULL,
	[endDate] [datetime2](7) NOT NULL,
	[createdAt] [datetime2](7) NULL,
	[updatedAt] [datetime2](7) NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[Classes] ADD  DEFAULT (newid()) FOR [id]
GO
ALTER TABLE [dbo].[Classes] ADD  DEFAULT (getdate()) FOR [createdAt]
GO
ALTER TABLE [dbo].[Classes] ADD  DEFAULT (getdate()) FOR [updatedAt]
GO
ALTER TABLE [dbo].[Classes] ADD  DEFAULT ((1)) FOR [isActive]
GO
ALTER TABLE [dbo].[LostPercentages] ADD  DEFAULT (newid()) FOR [id]
GO
ALTER TABLE [dbo].[LostPercentages] ADD  DEFAULT (getdate()) FOR [createdAt]
GO
ALTER TABLE [dbo].[LostPercentages] ADD  DEFAULT (getdate()) FOR [updatedAt]
GO
ALTER TABLE [dbo].[LostPercentages] ADD  DEFAULT ((1)) FOR [isActive]
GO
ALTER TABLE [dbo].[Partners] ADD  DEFAULT (newid()) FOR [id]
GO
ALTER TABLE [dbo].[Partners] ADD  DEFAULT ((0)) FOR [isActive]
GO
ALTER TABLE [dbo].[Partners] ADD  DEFAULT ((1)) FOR [isRegistered]
GO
ALTER TABLE [dbo].[Partners] ADD  DEFAULT (getdate()) FOR [createdAt]
GO
ALTER TABLE [dbo].[Partners] ADD  DEFAULT (getdate()) FOR [updatedAt]
GO
ALTER TABLE [dbo].[Policies] ADD  DEFAULT (newid()) FOR [id]
GO
ALTER TABLE [dbo].[Policies] ADD  DEFAULT (getdate()) FOR [createdAt]
GO
ALTER TABLE [dbo].[Policies] ADD  DEFAULT (getdate()) FOR [updatedAt]
GO
ALTER TABLE [dbo].[Policies] ADD  DEFAULT ((1)) FOR [isActive]
GO
ALTER TABLE [dbo].[PolicyConditions] ADD  DEFAULT (newid()) FOR [id]
GO
ALTER TABLE [dbo].[PolicyConditions] ADD  DEFAULT (getdate()) FOR [createdAt]
GO
ALTER TABLE [dbo].[PolicyConditions] ADD  DEFAULT (getdate()) FOR [updatedAt]
GO
ALTER TABLE [dbo].[PolicyConditions] ADD  DEFAULT ((1)) FOR [isActive]
GO
ALTER TABLE [dbo].[Vouchers] ADD  DEFAULT (newid()) FOR [id]
GO
ALTER TABLE [dbo].[Vouchers] ADD  DEFAULT (getdate()) FOR [createdAt]
GO
ALTER TABLE [dbo].[Vouchers] ADD  DEFAULT (getdate()) FOR [updatedAt]
GO
ALTER TABLE [dbo].[Classes]  WITH CHECK ADD  CONSTRAINT [FK_Partner_Class] FOREIGN KEY([partnerId])
REFERENCES [dbo].[Partners] ([id])
GO
ALTER TABLE [dbo].[Classes] CHECK CONSTRAINT [FK_Partner_Class]
GO
ALTER TABLE [dbo].[LostPercentages]  WITH CHECK ADD  CONSTRAINT [FK_Policy_LostPercentage] FOREIGN KEY([policyId])
REFERENCES [dbo].[Policies] ([id])
GO
ALTER TABLE [dbo].[LostPercentages] CHECK CONSTRAINT [FK_Policy_LostPercentage]
GO
ALTER TABLE [dbo].[Policies]  WITH CHECK ADD  CONSTRAINT [FK_Class_Policy] FOREIGN KEY([classId])
REFERENCES [dbo].[Classes] ([id])
GO
ALTER TABLE [dbo].[Policies] CHECK CONSTRAINT [FK_Class_Policy]
GO
ALTER TABLE [dbo].[PolicyConditions]  WITH CHECK ADD  CONSTRAINT [FK_Policy_Condition] FOREIGN KEY([policyId])
REFERENCES [dbo].[Policies] ([id])
GO
ALTER TABLE [dbo].[PolicyConditions] CHECK CONSTRAINT [FK_Policy_Condition]
GO
ALTER TABLE [dbo].[Vouchers]  WITH CHECK ADD  CONSTRAINT [FK_Voucher_Partner] FOREIGN KEY([partnerId])
REFERENCES [dbo].[Partners] ([id])
GO
ALTER TABLE [dbo].[Vouchers] CHECK CONSTRAINT [FK_Voucher_Partner]
GO
/****** Object:  StoredProcedure [dbo].[SP_ActivatePartner]    Script Date: 7/31/2021 10:08:55 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER OFF
GO
CREATE PROCEDURE [dbo].[SP_ActivatePartner]
    @partnerId NVARCHAR(36)
AS
BEGIN
    UPDATE [dbo].[Partners]
    SET
        [isActive] = 1
    WHERE id = @partnerId
END
GO
/****** Object:  StoredProcedure [dbo].[SP_AddClass]    Script Date: 7/31/2021 10:08:55 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER OFF
GO
CREATE PROCEDURE [dbo].[SP_AddClass]
    @name NVARCHAR(250),
    @partnerId NVARCHAR(36)
AS
BEGIN
    DECLARE @doesExist BIT 
    SET @doesExist = (
        SELECT CASE WHEN EXISTS (
            SELECT *
            FROM Classes
            WHERE [partnerId] = @partnerId
            AND [isActive] = 1
            AND [name] = @name
        )
        THEN CAST(1 AS BIT)
        ELSE CAST(0 AS BIT) END
    )

    IF (@doesExist = 0)
    BEGIN
        INSERT INTO [dbo].[Classes]
        ( 
        [name], [partnerId]
        )
        OUTPUT inserted.*
        VALUES
        (
        @name, @partnerId
        )
    END
END
GO
/****** Object:  StoredProcedure [dbo].[SP_AddPolicy]    Script Date: 7/31/2021 10:08:55 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER OFF
GO
CREATE PROCEDURE [dbo].[SP_AddPolicy]
    @type NVARCHAR(20),
    @classId NVARCHAR(36),
    @condition TIME(0),
    @lostPercentage INT
AS
BEGIN
    BEGIN TRY
        BEGIN TRAN

        DECLARE @insertedPolicy TABLE (
            id NVARCHAR(36)
        )
        DECLARE @insertedPolicyId NVARCHAR(36)
        BEGIN
            INSERT INTO [dbo].[Policies]
            ( 
            [type], [classId]
            )
            OUTPUT inserted.id INTO @insertedPolicy
            VALUES
            (
            @type, @classId
            )
            SET @insertedPolicyId = (
                SELECT id
                FROM @insertedPolicy
            )
        END

        DECLARE @insertedLostPercentage TABLE (
            id NVARCHAR(36)
        )
        DECLARE @insertedLostPercentageId NVARCHAR(36)
        BEGIN
            INSERT INTO [dbo].[LostPercentages]
            (
            [lostPercentage], [policyId]
            )
            OUTPUT inserted.id INTO @insertedLostPercentage
            VALUES
            (
            @lostPercentage, @insertedPolicyId
            )
            SET @insertedLostPercentageId = (
                SELECT id
                FROM @insertedLostPercentage
            )
        END

        DECLARE @insertedCondition TABLE (
            id NVARCHAR(36)
        )
        DECLARE @insertedConditionId NVARCHAR(36)
        BEGIN
            INSERT INTO [dbo].[PolicyConditions]
            (
            [condition], [policyId]
            )
            OUTPUT inserted.id INTO @insertedCondition
            VALUES
            (
            @condition, @insertedPolicyId
            )
            SET @insertedConditionId = (
                SELECT id
                FROM @insertedCondition
            )
        END

        SELECT CONVERT(varchar(8), CAST(PolicyConditions.condition AS TIME)) AS condition, 
            Policies.id, Policies.classId, Policies.[type], 
            Classes.name as className, Policies.createdAt, Policies.updatedAt,
            LostPercentages.lostPercentage
        FROM Policies, Classes, LostPercentages, PolicyConditions
        WHERE Policies.id = @insertedPolicyId
        AND  Classes.id = @classId
        AND LostPercentages.id = @insertedLostPercentageId
        AND PolicyConditions.id = @insertedConditionId
        
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
/****** Object:  StoredProcedure [dbo].[SP_ChangePartnerLogo]    Script Date: 7/31/2021 10:08:55 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER OFF
GO
CREATE PROCEDURE [dbo].[SP_ChangePartnerLogo]
    @partnerId NVARCHAR(36),
    @logoUrl NVARCHAR(MAX)
AS
BEGIN
    UPDATE [dbo].[Partners]
    SET
        [logoUrl] = @logoUrl
    WHERE id = @partnerId

    SELECT * FROM Partners WHERE id = @partnerId
END
GO
/****** Object:  StoredProcedure [dbo].[SP_EditClass]    Script Date: 7/31/2021 10:08:55 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER OFF
GO
CREATE PROCEDURE [dbo].[SP_EditClass]
    @partnerId NVARCHAR(36),
    @classId NVARCHAR(36),
    @name NVARCHAR(250)
AS
BEGIN
    DECLARE @existingName BIT
    SET @existingName = (
        SELECT CASE WHEN EXISTS (
            SELECT *
            FROM Classes
            WHERE [name] = @name
            AND partnerId = @partnerId
        )
        THEN CAST(1 AS BIT)
        ELSE CAST(0 AS BIT) END
    )

    IF (@existingName = 0)
    BEGIN
        UPDATE Classes
        SET name = @name
        OUTPUT inserted.*
        WHERE id = @classId
    END
END
GO
/****** Object:  StoredProcedure [dbo].[SP_EditPolicy]    Script Date: 7/31/2021 10:08:55 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER OFF
GO
CREATE PROCEDURE [dbo].[SP_EditPolicy]
    @policyId NVARCHAR(36),
    @condition TIME(0) = NULL,
    @lostPercentage INT = NULL,
    @classID NVARCHAR(36) = NULL
AS
BEGIN
    BEGIN TRY
        BEGIN TRAN
        UPDATE Policies
        SET 
            [classId] = ISNULL(@classID, classId)
        WHERE id = @policyId

        IF(@lostPercentage IS NOT NULL) 
        BEGIN
            INSERT INTO [dbo].[LostPercentages]
            ( 
             [lostPercentage], [policyId]
            )
            VALUES
            (
             @lostPercentage, @policyId
            )
        END

        IF(@condition IS NOT NULL) 
        BEGIN
            INSERT INTO [dbo].[PolicyConditions]
            ( 
             [condition], [policyId]
            )
            VALUES
            (
             @condition, @policyId
            )
        END

        SELECT CONVERT(varchar(8), CAST(PolicyConditions.condition AS TIME)) AS condition,
            Policies.id, Policies.classId, LostPercentages.lostPercentage, Policies.[type],
            Policies.createdAt, Policies.updatedAt
        FROM Policies, LostPercentages, PolicyConditions
        WHERE Policies.id = @policyId
        AND LostPercentages.policyId = @policyId
        AND LostPercentages.isActive = 1
        AND PolicyConditions.policyId = @policyId
        AND PolicyConditions.isActive = 1
         
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
/****** Object:  StoredProcedure [dbo].[SP_GetAllInactivePartners]    Script Date: 7/31/2021 10:08:55 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER OFF
GO

CREATE PROCEDURE [dbo].[SP_GetAllInactivePartners]
AS
BEGIN
    SELECT *
    FROM Partners
    WHERE isActive = 0
END
GO
/****** Object:  StoredProcedure [dbo].[SP_GetClassById]    Script Date: 7/31/2021 10:08:55 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER OFF
GO
CREATE PROCEDURE [dbo].[SP_GetClassById]
    @id NVARCHAR(36)
AS
BEGIN
    SELECT *
    FROM Classes
    WHERE id = @id
END
GO
/****** Object:  StoredProcedure [dbo].[SP_GetClassByPartnerAndName]    Script Date: 7/31/2021 10:08:55 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER OFF
GO
CREATE PROCEDURE [dbo].[SP_GetClassByPartnerAndName]
    @partnerId NVARCHAR(36),
    @className NVARCHAR(250)
AS
BEGIN
    SELECT *
    FROM Classes
    WHERE partnerId = @partnerId
    AND [name] = @className
END
GO
/****** Object:  StoredProcedure [dbo].[SP_GetPartnerByEmail]    Script Date: 7/31/2021 10:08:55 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER OFF
GO
CREATE PROCEDURE [dbo].[SP_GetPartnerByEmail]
    @email NVARCHAR(320)
AS
BEGIN
    SELECT *
    FROM Partners
    WHERE email = @email
END
GO
/****** Object:  StoredProcedure [dbo].[SP_GetPartnerByHotline]    Script Date: 7/31/2021 10:08:55 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER OFF
GO
CREATE PROCEDURE [dbo].[SP_GetPartnerByHotline]
    @hotline NVARCHAR(320)
AS
BEGIN
    SELECT *
    FROM Partners
    WHERE hotline = @hotline
END
GO
/****** Object:  StoredProcedure [dbo].[SP_GetPartnerById]    Script Date: 7/31/2021 10:08:55 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER OFF
GO

CREATE PROCEDURE [dbo].[SP_GetPartnerById]
    @partnerId NVARCHAR(36)
AS
BEGIN
    SELECT *
    FROM Partners
    WHERE id = @partnerId
END
GO
/****** Object:  StoredProcedure [dbo].[SP_GetPartnerByName]    Script Date: 7/31/2021 10:08:55 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER OFF
GO
CREATE PROCEDURE [dbo].[SP_GetPartnerByName]
    @name NVARCHAR(320)
AS
BEGIN
    SELECT *
    FROM Partners
    WHERE [name] = @name
END
GO
/****** Object:  StoredProcedure [dbo].[SP_GetPartnerByPresenter]    Script Date: 7/31/2021 10:08:55 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER OFF
GO
CREATE PROCEDURE [dbo].[SP_GetPartnerByPresenter]
    @presenterId NVARCHAR(36)
AS
BEGIN
    SELECT CONCAT(CAST(Partners.createdAt AS DATETIME2), 'Z') AS createdAt, 
        CONCAT(CAST(Partners.updatedAt AS DATETIME2), 'Z') AS updatedAt,
        Partners.id, Partners.email, Partners.hotline, Partners.isActive,
        Partners.isRegistered, Partners.logoUrl, Partners.name, Partners.presenterId,
        Partners.transportType
    , (
        SELECT ISNULL((
            SELECT id, name
            FROM Classes
            WHERE Classes.partnerId = Partners.id
            AND Classes.isActive = 1
            FOR JSON PATH
    ), '[]')) AS classes, (
        SELECT ISNULL((
             SELECT CONCAT(Policies.createdAt, 'Z') AS createdAt,
                CONCAT(Policies.updatedAt, 'Z') AS updatedAt,
                Policies.classId, PolicyConditions.condition, Policies.id, Policies.isActive,
                LostPercentages.lostPercentage, Policies.[type]
            FROM Policies, Classes, LostPercentages, PolicyConditions
            WHERE Classes.partnerId = Partners.id
            AND Policies.classId = Classes.id
            AND Policies.[type] ='exchange'
            AND Policies.isActive = 1
            AND LostPercentages.policyId = Policies.id
            AND LostPercentages.isActive = 1
            AND PolicyConditions.policyId = Policies.id
            AND PolicyConditions.isActive = 1
            FOR JSON PATH
    ), '[]')) AS exchangePolicies, (
        SELECT ISNULL((
            SELECT CONCAT(Policies.createdAt, 'Z') AS createdAt,
                CONCAT(Policies.updatedAt, 'Z') AS updatedAt,
                Policies.classId, PolicyConditions.condition, Policies.id, Policies.isActive,
                LostPercentages.lostPercentage, Policies.[type]
            FROM Policies, Classes, LostPercentages, PolicyConditions
            WHERE Classes.partnerId = Partners.id
            AND Policies.classId = Classes.id
            AND Policies.[type] ='cancellation'
            AND Policies.isActive = 1
            AND LostPercentages.policyId = Policies.id
            AND LostPercentages.isActive = 1
            AND PolicyConditions.policyId = Policies.id
            AND PolicyConditions.isActive = 1
            FOR JSON PATH
    ), '[]')) AS cancellationPolicies
    FROM Partners
    WHERE Partners.presenterId = @presenterId
    FOR JSON AUTO, WITHOUT_ARRAY_WRAPPER
END
GO
/****** Object:  StoredProcedure [dbo].[SP_GetPolicyByConditions]    Script Date: 7/31/2021 10:08:55 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER OFF
GO

CREATE PROCEDURE [dbo].[SP_GetPolicyByConditions]
    @purchaseDate DATETIME2,
    @departureAt DATETIME2,
    @cancellationDate DATETIME2,
    @classId NVARCHAR(36),
    @policyType NVARCHAR(20)
AS
BEGIN
    DECLARE @policyId NVARCHAR(36)
    SET @policyId = (
        SELECT id
        FROM Policies
        WHERE classId = @classId
        AND [type] = @policyType
        AND Policies.createdAt <= DATEADD(HOUR, 7 ,@purchaseDate)
    )

    SELECT TOP 1 Policies.*, PolicyConditions.condition, LostPercentages.lostPercentage 
    FROM Policies, (
        SELECT TOP 1 PolicyConditions.*
        FROM PolicyConditions, Policies
        WHERE PolicyConditions.createdAt <= DATEADD(HOUR, 7 ,@purchaseDate)
        AND Policies.classId = @classId
        AND PolicyConditions.policyId = @policyId
        ORDER BY PolicyConditions.createdAt DESC
    ) AS PolicyConditions, (
        SELECT TOP 1 LostPercentages.*
        FROM LostPercentages, Policies
        WHERE LostPercentages.createdAt <= DATEADD(HOUR, 7 ,@purchaseDate)
        AND Policies.classId = @classId
        AND LostPercentages.policyId = @policyId
        ORDER BY LostPercentages.createdAt DESC
    ) AS LostPercentages
    WHERE classId = @classId
    AND [type] = @policyType
    AND Policies.createdAt <= DATEADD(HOUR, 7 ,@purchaseDate)
    AND  DATEDIFF(MILLISECOND, 0, PolicyConditions.condition) <= (
        SELECT DATEDIFF(MILLISECOND, DATEADD(HOUR, 7, @cancellationDate), @departureAt)
    )
    ORDER BY Policies.createdAt DESC
END
GO
/****** Object:  StoredProcedure [dbo].[SP_RegisterPartner]    Script Date: 7/31/2021 10:08:55 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER OFF
GO

CREATE PROCEDURE [dbo].[SP_RegisterPartner]
(
    @name NVARCHAR(250),
    @hotline NVARCHAR(15),
    @email NVARCHAR(320),
    @transportType NVARCHAR(10),
    @logoUrl NVARCHAR(MAX),
    @presenterId NVARCHAR(36)
)
AS
BEGIN
    BEGIN TRY
        INSERT INTO [dbo].[Partners]
        (
            [name], [hotline], [email], [transportType], [logoUrl], 
            [presenterId]
        )
        OUTPUT inserted.*
        VALUES
        (
            @name, @hotline, @email, @transportType, 
            @logoUrl, @presenterId
        )
    END TRY

    BEGIN CATCH
        SELECT ERROR_MESSAGE() AS ErrorMessage
    END CATCH
END
GO
/****** Object:  StoredProcedure [dbo].[SP_RemoveClass]    Script Date: 7/31/2021 10:08:55 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER OFF
GO
CREATE PROCEDURE [dbo].[SP_RemoveClass]
    @classId NVARCHAR(36)
AS
BEGIN
    DECLARE @removedClass TABLE (
        id NVARCHAR(36)
    )
    UPDATE Classes
    SET [isActive] = 0
    OUTPUT inserted.id INTO @removedClass
    WHERE id = @classId

    SELECT * FROM @removedClass
END
GO
/****** Object:  StoredProcedure [dbo].[SP_RemovePolicy]    Script Date: 7/31/2021 10:08:55 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER OFF
GO
CREATE PROCEDURE [dbo].[SP_RemovePolicy]
    @policyId NVARCHAR(36)
AS
BEGIN
    DECLARE @removedPolicy TABLE (
        id NVARCHAR(36),
        [type] NVARCHAR(20)
    )
    UPDATE Policies
    SET [isActive] = 0
    OUTPUT inserted.id, inserted.[type] 
        INTO @removedPolicy
    WHERE id = @policyId

    SELECT * FROM @removedPolicy
END
GO
