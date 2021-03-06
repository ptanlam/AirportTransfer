CREATE DATABASE [Car_Service_DB]
GO

USE [Car_Service_DB]
GO
/****** Object:  Table [dbo].[CarModels]    Script Date: 7/31/2021 2:49:32 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[CarModels](
	[id] [nvarchar](36) NOT NULL,
	[name] [nvarchar](250) NOT NULL,
	[luggagePayload] [int] NOT NULL,
	[guestQuantity] [int] NOT NULL,
	[partnerId] [nvarchar](36) NOT NULL,
	[photoUrl] [nvarchar](max) NOT NULL,
	[isActive] [bit] NOT NULL,
	[isRegistered] [bit] NOT NULL,
	[country] [nvarchar](250) NOT NULL,
	[city] [nvarchar](250) NOT NULL,
	[classId] [nvarchar](36) NOT NULL,
	[createdAt] [datetime] NOT NULL,
	[updatedAt] [datetime] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Cars]    Script Date: 7/31/2021 2:49:32 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Cars](
	[id] [nvarchar](36) NOT NULL,
	[licencePlate] [nvarchar](50) NOT NULL,
	[color] [nvarchar](50) NOT NULL,
	[carModelId] [nvarchar](36) NOT NULL,
	[isRegistered] [bit] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
UNIQUE NONCLUSTERED 
(
	[licencePlate] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Journeys]    Script Date: 7/31/2021 2:49:32 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Journeys](
	[id] [nvarchar](36) NOT NULL,
	[description] [ntext] NOT NULL,
	[placeId] [nvarchar](50) NOT NULL,
	[district] [nvarchar](250) NOT NULL,
	[city] [nvarchar](250) NOT NULL,
	[country] [nvarchar](250) NOT NULL,
	[createdAt] [datetime2](7) NOT NULL,
	[updatedAt] [datetime2](7) NOT NULL,
	[orderNumber] [int] NOT NULL,
	[scheduleId] [nvarchar](36) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ScheduleDetails]    Script Date: 7/31/2021 2:49:32 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ScheduleDetails](
	[id] [nvarchar](36) NOT NULL,
	[scheduleId] [nvarchar](36) NOT NULL,
	[carId] [nvarchar](36) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Schedules]    Script Date: 7/31/2021 2:49:32 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Schedules](
	[id] [nvarchar](36) NOT NULL,
	[start] [time](0) NOT NULL,
	[end] [time](0) NOT NULL,
	[date] [date] NOT NULL,
	[isActive] [bit] NOT NULL,
	[createdAt] [datetime2](7) NOT NULL,
	[updatedAt] [datetime2](7) NOT NULL,
	[isCancelled] [bit] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[StandardPrices]    Script Date: 7/31/2021 2:49:32 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[StandardPrices](
	[id] [nvarchar](36) NOT NULL,
	[carModelId] [nvarchar](36) NOT NULL,
	[standardPricePerKm] [int] NOT NULL,
	[availableDate] [datetime2](7) NOT NULL,
	[isActive] [bit] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[CarModels] ADD  DEFAULT (newid()) FOR [id]
GO
ALTER TABLE [dbo].[CarModels] ADD  DEFAULT ((1)) FOR [isActive]
GO
ALTER TABLE [dbo].[CarModels] ADD  DEFAULT ((1)) FOR [isRegistered]
GO
ALTER TABLE [dbo].[CarModels] ADD  DEFAULT (getdate()) FOR [createdAt]
GO
ALTER TABLE [dbo].[CarModels] ADD  DEFAULT (getdate()) FOR [updatedAt]
GO
ALTER TABLE [dbo].[Cars] ADD  DEFAULT (newid()) FOR [id]
GO
ALTER TABLE [dbo].[Cars] ADD  DEFAULT ((1)) FOR [isRegistered]
GO
ALTER TABLE [dbo].[Journeys] ADD  DEFAULT (newid()) FOR [id]
GO
ALTER TABLE [dbo].[Journeys] ADD  DEFAULT (getdate()) FOR [createdAt]
GO
ALTER TABLE [dbo].[Journeys] ADD  DEFAULT (getdate()) FOR [updatedAt]
GO
ALTER TABLE [dbo].[ScheduleDetails] ADD  DEFAULT (newid()) FOR [id]
GO
ALTER TABLE [dbo].[Schedules] ADD  DEFAULT (newid()) FOR [id]
GO
ALTER TABLE [dbo].[Schedules] ADD  DEFAULT ((0)) FOR [isActive]
GO
ALTER TABLE [dbo].[Schedules] ADD  DEFAULT (getdate()) FOR [createdAt]
GO
ALTER TABLE [dbo].[Schedules] ADD  DEFAULT (getdate()) FOR [updatedAt]
GO
ALTER TABLE [dbo].[Schedules] ADD  DEFAULT ((0)) FOR [isCancelled]
GO
ALTER TABLE [dbo].[StandardPrices] ADD  DEFAULT (newid()) FOR [id]
GO
ALTER TABLE [dbo].[StandardPrices] ADD  DEFAULT (getdate()) FOR [availableDate]
GO
ALTER TABLE [dbo].[StandardPrices] ADD  DEFAULT ((1)) FOR [isActive]
GO
ALTER TABLE [dbo].[Cars]  WITH CHECK ADD  CONSTRAINT [FK_CarModel_Car] FOREIGN KEY([carModelId])
REFERENCES [dbo].[CarModels] ([id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[Cars] CHECK CONSTRAINT [FK_CarModel_Car]
GO
ALTER TABLE [dbo].[Journeys]  WITH CHECK ADD  CONSTRAINT [FK_Schedules_Journeys] FOREIGN KEY([scheduleId])
REFERENCES [dbo].[Schedules] ([id])
GO
ALTER TABLE [dbo].[Journeys] CHECK CONSTRAINT [FK_Schedules_Journeys]
GO
ALTER TABLE [dbo].[ScheduleDetails]  WITH CHECK ADD  CONSTRAINT [FK_Car_ScheduleDetail] FOREIGN KEY([carId])
REFERENCES [dbo].[Cars] ([id])
GO
ALTER TABLE [dbo].[ScheduleDetails] CHECK CONSTRAINT [FK_Car_ScheduleDetail]
GO
ALTER TABLE [dbo].[ScheduleDetails]  WITH CHECK ADD  CONSTRAINT [FK_Schedule_ScheduleDetail] FOREIGN KEY([scheduleId])
REFERENCES [dbo].[Schedules] ([id])
GO
ALTER TABLE [dbo].[ScheduleDetails] CHECK CONSTRAINT [FK_Schedule_ScheduleDetail]
GO
ALTER TABLE [dbo].[StandardPrices]  WITH CHECK ADD  CONSTRAINT [FK_CarModel_StandardPrices] FOREIGN KEY([carModelId])
REFERENCES [dbo].[CarModels] ([id])
GO
ALTER TABLE [dbo].[StandardPrices] CHECK CONSTRAINT [FK_CarModel_StandardPrices]
GO
/****** Object:  StoredProcedure [dbo].[SP_ActivateSchedule]    Script Date: 7/31/2021 2:49:32 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER OFF
GO

CREATE   PROCEDURE [dbo].[SP_ActivateSchedule]
    @scheduleId NVARCHAR(36)
AS
BEGIN
    IF EXISTS(
        Select *
        from Schedules
        WHERE Schedules.id=@scheduleId
    )
    BEGIN
        UPDATE Schedules
        SET isActive=1
        WHERE Schedules.id=@scheduleId
    END
    ELSE
    BEGIN
        PRINT('This @scheduleId does not exist...')
    END
END
GO
/****** Object:  StoredProcedure [dbo].[SP_AddJourneys]    Script Date: 7/31/2021 2:49:32 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE   PROCEDURE [dbo].[SP_AddJourneys]
    @description NTEXT,
    @placeId NVARCHAR(50),
    @district NVARCHAR(250),
    @city NVARCHAR(250),
    @country NVARCHAR(250),
    @orderNumber Int,
    @scheduleId NVARCHAR(36)
AS
BEGIN  
        BEGIN
            INSERT INTO [dbo].[Journeys]
            (
                [description],[placeId], [district], [city],[country],[orderNumber],[scheduleId]
            )
            OUTPUT inserted.*
            VALUES
            (
                @description,@placeId, @district, @city, @country,@orderNumber,@scheduleId  
            )
        END
       
END
GO
/****** Object:  StoredProcedure [dbo].[SP_AddScheduleDetails]    Script Date: 7/31/2021 2:49:32 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- Create the stored procedure in the specified schema
CREATE      PROCEDURE [dbo].[SP_AddScheduleDetails]
    @scheduleId NVARCHAR(36),
    @id NVARCHAR(36)
AS
BEGIN
        BEGIN
            -- Insert rows into table 'SchedulesDetails' in schema '[dbo]'
            INSERT INTO [dbo].[ScheduleDetails]
            ( -- Columns to insert data into
            [scheduleId], [carId]
            )
            OUTPUT inserted.*
            VALUES
            ( -- First row: values for the columns in the list above
            @scheduleId, @id
            )
        END

END
GO
/****** Object:  StoredProcedure [dbo].[SP_AddSchedules]    Script Date: 7/31/2021 2:49:32 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE   PROCEDURE [dbo].[SP_AddSchedules]
    @date date,
    @start time(0),
    @travel INT
AS
BEGIN
    DECLARE @end TIME(0) =  CONVERT(varchar(10),CAST(DATEADD(SECOND,@travel,@start)AS TIME(0)))
    DECLARE @startTime TIME(0) =CONVERT(varchar(10),CAST(@start AS time(0)))
    SET @start=@startTime

    INSERT INTO [dbo].[Schedules]
    (
        [date], [start],[end]
    )
    OUTPUT inserted.*
    VALUES
    (
    @date, @start, @end
    )
                        
END
GO
/****** Object:  StoredProcedure [dbo].[SP_CancellationScheduleBooked]    Script Date: 7/31/2021 2:49:32 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE    PROCEDURE [dbo].[SP_CancellationScheduleBooked]
   @scheduleId NVARCHAR(36)
AS
BEGIN
    UPDATE Schedules
    Set isCancelled=1
    WHERE id=@scheduleId
END
GO
/****** Object:  StoredProcedure [dbo].[SP_GetCarByLicencePlate]    Script Date: 7/31/2021 2:49:32 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER OFF
GO
-- Create the stored procedure in the specified schema
CREATE PROCEDURE [dbo].[SP_GetCarByLicencePlate]
    @licencePlate NVARCHAR(50)
AS
BEGIN
    SELECT *
    FROM Cars
    WHERE licencePlate = @licencePlate
END
GO
/****** Object:  StoredProcedure [dbo].[SP_GetCarBySchedule]    Script Date: 7/31/2021 2:49:32 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
    -- Create the stored procedure in the specified schema
    CREATE PROCEDURE [dbo].[SP_GetCarBySchedule]
    @scheduleId NVARCHAR(36)
    AS
    BEGIN
        -- body of the stored procedure
        SELECT CarModels.*, ScheduleDetails.carId,Cars.licencePlate,Cars.color,Cars.carModelId AS 'carModelId',StandardPrices.standardPricePerKm
        FROM Schedules,Cars,CarModels,StandardPrices,ScheduleDetails
        WHERE Schedules.id=@scheduleId 
        AND ScheduleDetails.carId=Cars.id 
        AND Cars.carModelId=CarModels.id
        AND CarModels.id=StandardPrices.carModelId
        AND Schedules.id=ScheduleDetails.scheduleId
        AND StandardPrices.isActive=1
    END
GO
/****** Object:  StoredProcedure [dbo].[SP_GetCarModelById]    Script Date: 7/31/2021 2:49:32 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- Create the stored procedure in the specified schema
CREATE   PROCEDURE [dbo].[SP_GetCarModelById]
    @id NVARCHAR(36)=NULL
AS
BEGIN
   BEGIN TRY
        BEGIN
            SELECT CarModels.*,StandardPrices.standardPricePerKm 
            FROM [dbo].[CarModels],[dbo].[StandardPrices]
            WHERE CarModels.id=@id AND StandardPrices.carModelId=@id 
            AND StandardPrices.isActive=1
            AND isRegistered = 1
        END
    END TRY
    BEGIN CATCH
        SELECT ERROR_MESSAGE() AS ErrorMessage         
    END CATCH
END
GO
/****** Object:  StoredProcedure [dbo].[SP_GetCarModelsByPartner]    Script Date: 7/31/2021 2:49:32 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- Create the stored procedure in the specified schema
CREATE    PROCEDURE [dbo].[SP_GetCarModelsByPartner]
(
   @partnerId NVARCHAR(36) 
)
AS
BEGIN
    SELECT CarModels.*,StandardPrices.standardPricePerKm
    FROM [dbo].[CarModels],StandardPrices
    WHERE CarModels.partnerId = @partnerId
    AND StandardPrices.carModelId=CarModels.id
    AND StandardPrices.isActive=1
    AND CarModels.isRegistered=1
END
GO
/****** Object:  StoredProcedure [dbo].[SP_GetCarsByCarModel]    Script Date: 7/31/2021 2:49:32 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE   PROCEDURE [dbo].[SP_GetCarsByCarModel]
    @carModelId NVARCHAR(36)
AS
BEGIN
    SELECT *
    FROM Cars
    WHERE carModelId = @carModelId
    AND isRegistered=1
END
GO
/****** Object:  StoredProcedure [dbo].[SP_GetCarsByConditions]    Script Date: 7/31/2021 2:49:32 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER OFF
GO

CREATE    PROCEDURE [dbo].[SP_GetCarsByConditions]
    @date DATE,
    @pickUpTime TIME(0),
    @depCity NVARCHAR(250),
    @depCountry NVARCHAR(250),
    @travel INT
AS
BEGIN
    SELECT CarModels.*,
    (
        SELECT StandardPrices.standardPricePerKm
        FROM StandardPrices
        WHERE StandardPrices.carModelId = CarModels.id
        AND StandardPrices.isActive=1
        FOR JSON PATH
    ) As standardPricePerKm, 
    (
       SELECT ISNULL((
        SELECT *
        FROM Cars
        WHERE Cars.carModelId = CarModels.id 
        AND isRegistered=1
        AND Cars.id NOT IN (
            SELECT carId
            FROM ScheduleDetails
            WHERE ScheduleDetails.carId=Cars.id
            AND ScheduleDetails.scheduleId IN (
                SELECT id 
                FROM Schedules
                WHERE Schedules.id=ScheduleDetails.scheduleId
                AND [date] = @date
                AND @pickUpTime  BETWEEN [start] AND [end]
                AND isCancelled=0
            )
            OR ScheduleDetails.scheduleId IN (
                SELECT id 
                FROM Schedules
                WHERE Schedules.id=ScheduleDetails.scheduleId
                AND [date] = @date
                AND @pickUpTime NOT BETWEEN [start] AND [end]
                AND isCancelled=0
            )
            AND ScheduleDetails.scheduleId IN (
                SELECT id 
                FROM Schedules
                WHERE Schedules.id=ScheduleDetails.scheduleId
                AND [date] = @date
                AND CAST(DATEADD(SECOND,@travel,@pickUpTime)AS TIME(0)) BETWEEN [start] AND [end]
                AND isCancelled=0
            )

            OR ScheduleDetails.scheduleId IN(
                select id 
                from Schedules
                WHERE Schedules.id=ScheduleDetails.scheduleId
                AND [date]=@date
                AND  CAST(DATEADD(SECOND,@travel,@pickUpTime)AS TIME(0)) BETWEEN [start]  and [end]
                AND isCancelled=1
            )
            AND ScheduleDetails.scheduleId IN (
                SELECT id 
                FROM Schedules
                WHERE Schedules.id=ScheduleDetails.scheduleId
                AND [date] = @date
                AND @pickUpTime NOT BETWEEN [start] AND [end]
                AND isCancelled=1
            )
            AND ScheduleDetails.scheduleId IN (
                SELECT id 
                FROM Schedules
                WHERE Schedules.id=ScheduleDetails.scheduleId
                AND [date] = @date
                AND @pickUpTime  BETWEEN [start] AND [end]
                AND isCancelled=1
            )
        )
        ORDER BY Cars.carModelId 
        FOR JSON PATH
    ),'[]'))as cars
    FROM CarModels
    WHERE city = @depCity
    AND country = @depCountry 
    AND isRegistered=1
    AND isActive=1
    AND CarModels.id IN (
            Select carModelId
            From Cars
            WHERE Cars.carModelId=CarModels.id 
            AND Cars.id NOT IN (
                SELECT ScheduleDetails.carId
                FROM ScheduleDetails,Schedules
                WHERE  @pickUpTime BETWEEN [start] AND [end]
                AND @date=[date]
                AND Schedules.id=ScheduleDetails.scheduleId
                AND isActive=1
            OR Cars.id NOT IN (
                    SELECT ScheduleDetails.carId
                    FROM ScheduleDetails,Schedules
                    WHERE  @pickUpTime BETWEEN [start] AND [end]
                    AND @date=[date]
                    AND Schedules.id=ScheduleDetails.scheduleId
                    AND isActive=1    
            AND Cars.id IN (
                SELECT ScheduleDetails.carId
                FROM ScheduleDetails,Schedules
                WHERE  @pickUpTime BETWEEN [start] AND [end]
                AND @date=[date]
                AND Schedules.id=ScheduleDetails.scheduleId
                AND isCancelled=1
            )
        )
    )
)
    FOR JSON PATH
END
GO
/****** Object:  StoredProcedure [dbo].[SP_GetCarsByConditionsAndPartner]    Script Date: 7/31/2021 2:49:32 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE      PROCEDURE [dbo].[SP_GetCarsByConditionsAndPartner]
    @date DATE,
    @pickUpTime TIME(0),
    @depCity NVARCHAR(250),
    @depCountry NVARCHAR(250),
    @travel INT,
    @partnerId NVARCHAR(36)
AS
BEGIN
        SELECT CarModels.*,
        (
            SELECT StandardPrices.standardPricePerKm
            FROM StandardPrices
            WHERE StandardPrices.carModelId = CarModels.id
            AND CarModels.partnerId=@partnerId
            AND StandardPrices.isActive=1
            FOR JSON PATH
        ) As standardPricePerKm, 
        (
            SELECT ISNULL(
            (
                SELECT *
                FROM Cars
                WHERE CarModels.partnerId=@partnerId
                AND Cars.carModelId = CarModels.id 
                AND isRegistered=1
                AND Cars.id NOT IN (
                    SELECT carId
                    FROM ScheduleDetails
                    WHERE ScheduleDetails.carId=Cars.id
                    AND ScheduleDetails.scheduleId IN (
                        SELECT id 
                        FROM Schedules
                        WHERE Schedules.id=ScheduleDetails.scheduleId
                        AND [date] = @date
                        AND @pickUpTime  BETWEEN [start] AND [end]
                        AND isCancelled=0
                    )
                    OR ScheduleDetails.scheduleId IN (
                        SELECT id 
                        FROM Schedules
                        WHERE Schedules.id=ScheduleDetails.scheduleId
                        AND [date] = @date
                        AND @pickUpTime NOT BETWEEN [start] AND [end]
                        AND isCancelled=0
                    )
                    AND ScheduleDetails.scheduleId IN (
                        SELECT id 
                        FROM Schedules
                        WHERE Schedules.id=ScheduleDetails.scheduleId
                        AND [date] = @date
                        AND CAST(DATEADD(SECOND,@travel,@pickUpTime)AS TIME(0)) BETWEEN [start] AND [end]
                        AND isCancelled=0
                    )

                    OR ScheduleDetails.scheduleId IN(
                        select id 
                        from Schedules
                        WHERE Schedules.id=ScheduleDetails.scheduleId
                        AND [date]=@date
                        AND  CAST(DATEADD(SECOND,@travel,@pickUpTime)AS TIME(0)) BETWEEN [start]  and [end]
                        AND isCancelled=1
                    )
                    AND ScheduleDetails.scheduleId IN (
                        SELECT id 
                        FROM Schedules
                        WHERE Schedules.id=ScheduleDetails.scheduleId
                        AND [date] = @date
                        AND @pickUpTime NOT BETWEEN [start] AND [end]
                        AND isCancelled=1
                    )
                    AND ScheduleDetails.scheduleId IN (
                        SELECT id 
                        FROM Schedules
                        WHERE Schedules.id=ScheduleDetails.scheduleId
                        AND [date] = @date
                        AND @pickUpTime  BETWEEN [start] AND [end]
                        AND isCancelled=1
                    )
                )
                FOR JSON PATH
        ),'[]')) as cars
        FROM CarModels
        WHERE CarModels.partnerId=@partnerId
        AND city = @depCity
        AND country = @depCountry 
        AND isRegistered=1
        AND isActive=1
        AND CarModels.id IN (
                Select carModelId
                From Cars
                WHERE Cars.carModelId=CarModels.id 
                AND CarModels.partnerId=@partnerId
                AND Cars.id NOT IN (
                    SELECT ScheduleDetails.carId
                    FROM ScheduleDetails,Schedules
                    WHERE  @pickUpTime BETWEEN [start] AND [end]
                    AND @date=[date]
                    AND Schedules.id=ScheduleDetails.scheduleId
                    AND isActive=1
                OR Cars.id NOT IN (
                    SELECT ScheduleDetails.carId
                    FROM ScheduleDetails,Schedules
                    WHERE  @pickUpTime BETWEEN [start] AND [end]
                    AND @date=[date]
                    AND Schedules.id=ScheduleDetails.scheduleId
                    AND isActive=1
                AND Cars.id IN (
                    SELECT ScheduleDetails.carId
                    FROM ScheduleDetails,Schedules
                    WHERE  @pickUpTime BETWEEN [start] AND [end]
                    AND @date=[date]
                    AND Schedules.id=ScheduleDetails.scheduleId
                    AND isCancelled=1
                )
            )
        )
    ) 
        FOR JSON PATH
   
END
GO
/****** Object:  StoredProcedure [dbo].[SP_GetCarScheduleBooked]    Script Date: 7/31/2021 2:49:32 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE     PROCEDURE [dbo].[SP_GetCarScheduleBooked]
    @scheduleId NVARCHAR(36)
AS
BEGIN
    DECLARE @ReturnJSON NVARCHAR(MAX)
    DECLARE @innerJSON NVARCHAR(MAX)

    SET @innerJSON = (
            SELECT [start] as 'departureAt',[end] as 'arrivalAt',[date]
            FROM Schedules
            WHERE isActive=1
            AND Schedules.id IN (
                Select scheduleId
                From Journeys
                WHERE Journeys.scheduleId=Schedules.id
                AND Journeys.scheduleId=@scheduleId
            )
            AND Schedules.id IN (
                Select scheduleId
                From ScheduleDetails
                WHERE ScheduleDetails.scheduleId=Schedules.id
                AND ScheduleDetails.scheduleId=@scheduleId
            )
            For JSON PATH,WITHOUT_ARRAY_WRAPPER
) 


SET @ReturnJSON =(
    SELECT ( 
        JSON_QUERY(@innerJSON)
    ) as schedule,
    (
        SELECT CarModels.* 
        FROM CarModels
        WHERE CarModels.id IN (
                Select carModelId 
                From Cars
                WHERE Cars.carModelId=CarModels.id 
                AND Cars.id IN (
                    SELECT ScheduleDetails.carId
                    FROM ScheduleDetails,Schedules
                    WHERE  Schedules.id=ScheduleDetails.scheduleId
                    AND ScheduleDetails.carId=Cars.id
                    AND Schedules.id=@scheduleId
                    AND ScheduleDetails.scheduleId=@scheduleId
                    AND ScheduleDetails.scheduleId IN(
                        Select id
                        from Schedules
                        WHERE id=scheduleId
                        AND id=@scheduleId
                        AND Schedules.id IN (
                            Select scheduleId
                            from Journeys
                            WHERE scheduleId= @scheduleId
                            AND Journeys.scheduleId=Schedules.id
                        )
                    )
            ) 
        ) 
        FOR JSON PATH  
    ) AS carModel,
    (
        SELECT licencePlate,color
        FROM Cars,CarModels
        WHERE Cars.carModelId = CarModels.id
        AND Cars.isRegistered=1 
        AND Cars.id IN (
            SELECT carId
            FROM ScheduleDetails
            WHERE ScheduleDetails.scheduleId=@scheduleId
            AND ScheduleDetails.scheduleId IN (
                SELECT id
                FROM Schedules
                WHERE Schedules.id=ScheduleDetails.scheduleId
                AND Schedules.id=@scheduleId
            )
        )
        FOR JSON PATH
    ) AS cars,
    (
        Select [description],district,city,country,orderNumber
        from Journeys
        WHERE Journeys.scheduleId=@scheduleId
        AND Journeys.scheduleId IN (
            select id
            from Schedules
            WHERE Schedules.id=@scheduleId
            AND Schedules.id=Journeys.scheduleId
            And Schedules.id IN (
                select scheduleId
                from ScheduleDetails
                WHERE ScheduleDetails.scheduleId=@scheduleId
                AND scheduleId=Schedules.id
                AND ScheduleDetails.carId IN (
                    Select id
                    from Cars
                    WHERE id=ScheduleDetails.carId
                )
            )
        )
        ORDER BY(orderNumber)
        For JSON PATH
    ) as stations
        
    FOR JSON PATH,WITHOUT_ARRAY_WRAPPER)

SELECT ISNULL((Select @ReturnJSON),'[]')  AS Result
END
GO
/****** Object:  StoredProcedure [dbo].[SP_GetJourneys]    Script Date: 7/31/2021 2:49:32 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- Create the stored procedure in the specified schema
CREATE PROCEDURE [dbo].[SP_GetJourneys]
    @scheduleId NVARCHAR(36)
AS
BEGIN
    SELECT *
    FROM Journeys
    WHERE Journeys.scheduleId = @scheduleId
    ORDER BY Journeys.orderNumber
END
GO
/****** Object:  StoredProcedure [dbo].[SP_GetSchedulesByCarAndDate]    Script Date: 7/31/2021 2:49:32 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- Create the stored procedure in the specified schema
CREATE    PROCEDURE [dbo].[SP_GetSchedulesByCarAndDate]
    @carId NVARCHAR(36),
    @date DATE
AS
BEGIN
    -- Select rows from a Table or View '[TableOrViewName]' in schema '[dbo]'
    SELECT Schedules.id, ScheduleDetails.carId,Schedules.isCancelled,Schedules.date,Cars.licencePlate,Cars.color,
    CONVERT(varchar(10),CAST(Schedules.[start] AS time)) as startTime,
            CONVERT(varchar(10),CAST(Schedules.[end] AS time)) as endTime
      FROM [dbo].[Schedules],[dbo].[Cars],[dbo].[ScheduleDetails]
    WHERE @carId=ScheduleDetails.carId AND @carId=Cars.id
    AND @date=Schedules.date
    AND ScheduleDetails.scheduleId=Schedules.id
    AND Schedules.isCancelled=0
    AND Schedules.isActive=1
END
GO
/****** Object:  StoredProcedure [dbo].[SP_RegisterCarModels]    Script Date: 7/31/2021 2:49:32 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- Create the stored procedure in the specified schema
CREATE    PROCEDURE [dbo].[SP_RegisterCarModels]
    @name NVARCHAR(250),
    @luggagePayload INT,
    @guestQuantity INT,
    @photoUrl NVARCHAR(MAX),
    @standardPricePerKm INT,
    @partnerId NVARCHAR(36),
    @country NVARCHAR(250),
    @city NVARCHAR(250),
    @classId NTEXT
AS
BEGIN
    BEGIN TRY
      BEGIN TRAN
            DECLARE @insertedCarModel TABLE (
                id NVARCHAR(36)
            )

            INSERT INTO [dbo].[CarModels]
        (
            [name], [luggagePayload],[guestQuantity],
            [partnerId], [photoUrl],[country],[city],[classId]
        )
          OUTPUT inserted.id INTO @insertedCarModel
        VALUES
        (
            @name, @luggagePayload,@guestQuantity,
            @partnerId, @photoUrl,@country,@city,@classId
        )

            DECLARE @insertedCarModelId NVARCHAR(36)
            SET @insertedCarModelId = (SELECT id FROM @insertedCarModel)

            INSERT INTO [dbo].[StandardPrices]
            (
                [standardPricePerKm], [carModelId]
            )
            VALUES
            (
                @standardPricePerKm, @insertedCarModelId
            )
            
        IF @@TRANCOUNT > 0
        BEGIN
            COMMIT TRAN
        END

        SELECT CarModels.*,StandardPrices.standardPricePerKm 
        FROM CarModels,StandardPrices
        WHERE CarModels.id = @insertedCarModelId
        AND CarModels.id=StandardPrices.carModelId
        AND StandardPrices.isActive=1
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
/****** Object:  StoredProcedure [dbo].[SP_RegisterCars]    Script Date: 7/31/2021 2:49:32 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE    PROCEDURE [dbo].[SP_RegisterCars]
    @licencePlate NVARCHAR(50),
    @color NVARCHAR(50),
    @carModelId NVARCHAR(36)
AS
BEGIN
    BEGIN TRY
        DECLARE @carId NVARCHAR(36)
        SET @carId = (
            SELECT id
            FROM Cars
            WHERE licencePlate = @licencePlate
        )

        IF (@carId IS NULL)
        BEGIN
            INSERT INTO [dbo].[Cars]
            (
                [licencePlate], [color], [carModelId]
            )
            OUTPUT inserted.*
            VALUES
            (
                @licencePlate, @color, @carModelId
            )
        END
    END TRY

    BEGIN CATCH
        SELECT ERROR_MESSAGE() AS ErrorMessage
    END CATCH
END
GO
/****** Object:  StoredProcedure [dbo].[SP_RemoveScheduleCompletely]    Script Date: 7/31/2021 2:49:32 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE    PROCEDURE [dbo].[SP_RemoveScheduleCompletely]
    @scheduleId NVARCHAR(36)
AS
BEGIN
   

    DELETE FROM Journeys
    WHERE Journeys.scheduleId=@scheduleId
    AND Journeys.scheduleId IN (
        select id
        From Schedules
        WHERE id= @scheduleId
        AND Schedules.id=Journeys.scheduleId
    )
    
    DELETE FROM ScheduleDetails
    WHERE ScheduleDetails.scheduleId=@scheduleId
    AND ScheduleDetails.scheduleId IN(
        select id
        from Schedules
        WHERE id=@scheduleId
    )

    DELETE FROM Schedules
    WHERE Schedules.id=@scheduleId
END
GO
/****** Object:  StoredProcedure [dbo].[SP_UnregisterCar]    Script Date: 7/31/2021 2:49:32 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- Create a new stored procedure called 'SP_UnregisterCar' in schema 'dbo'

CREATE    PROCEDURE [dbo].[SP_UnregisterCar]
    @id NVARCHAR(36)
AS
BEGIN
    BEGIN TRY
                IF EXISTS(
                    SELECT id 
                    FROM Cars 
                    WHERE @id=Cars.id
                    AND Cars.id NOT IN (
                            Select  carId
                            from ScheduleDetails
                            WHERE ScheduleDetails.carId=Cars.id
                            AND ScheduleDetails.scheduleId IN (
                                SELECT id
                                From Schedules
                                WHERE Schedules.id=ScheduleDetails.scheduleId
                                AND [date] >= GETDATE()
                            )
                        )
                    OR Cars.id IN (
                            Select  carId
                            from ScheduleDetails
                            WHERE ScheduleDetails.carId=Cars.id
                            AND ScheduleDetails.scheduleId IN (
                                SELECT id
                                From Schedules
                                WHERE Schedules.id=ScheduleDetails.scheduleId
                                AND [date] >= GETDATE()
                                AND isCancelled=1
                            )
                        )
                    )  
                BEGIN
                    UPDATE [dbo].[Cars]
                    SET
                        [isRegistered] = 0
                    WHERE @id=Cars.id
                END
                IF EXISTS(Select * from Cars WHERE @id=Cars.id AND isRegistered=0 and @id is not NULL)
                    BEGIN
                        SELECT * FROM [dbo].[Cars]
                        WHERE @id =Cars.id
                    END
                ELSE 
                    BEGIN
                        PRINT('Can not unregister this car because it has some schedules without happened')
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
/****** Object:  StoredProcedure [dbo].[SP_UnRegisterCarModel]    Script Date: 7/31/2021 2:49:32 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE     PROCEDURE [dbo].[SP_UnRegisterCarModel]
    @id NVARCHAR(36)
AS
BEGIN  
            UPDATE [dbo].[CarModels]
            SET
                [isRegistered] = 0    
            WHERE CarModels.id=@id
            AND isActive=1
            AND CarModels.id NOT IN (
                Select carModelId
                from Cars
                WHERE Cars.carModelId=CarModels.id
                AND Cars.carModelId =@id
                AND Cars.id  IN (
                    Select  carId
                    from ScheduleDetails
                    WHERE ScheduleDetails.carId=Cars.id
                    AND ScheduleDetails.scheduleId IN (
                        SELECT id
                        From Schedules
                        WHERE Schedules.id=ScheduleDetails.scheduleId
                        AND [date] >= GETDATE()
                        AND isCancelled=0
                        AND isActive=1
                    )
                )
            )
            OR CarModels.id IN (
                Select carModelId
                from Cars
                WHERE Cars.carModelId=CarModels.id
                AND Cars.carModelId =@id
                AND Cars.id IN (
                    Select  carId
                    from ScheduleDetails
                    WHERE ScheduleDetails.carId=Cars.id
                    AND ScheduleDetails.scheduleId IN (
                        SELECT id
                        From Schedules
                        WHERE Schedules.id=ScheduleDetails.scheduleId
                        AND [date] >= GETDATE()
                        AND isCancelled=1
                        AND isActive=1
                    )
                )
            )
            AND CarModels.id IN (
                Select carModelId
                from Cars
                WHERE Cars.carModelId=CarModels.id
                AND Cars.carModelId =@id
                AND Cars.id IN (
                    Select  carId
                    from ScheduleDetails
                    WHERE ScheduleDetails.carId=Cars.id
                    AND ScheduleDetails.scheduleId IN (
                        SELECT id
                        From Schedules
                        WHERE Schedules.id=ScheduleDetails.scheduleId
                        AND [date] >= GETDATE()
                        AND isCancelled=1
                        AND isActive=1
                    )
                    AND ScheduleDetails.scheduleId IN (
                        SELECT id
                        From Schedules
                        WHERE Schedules.id=ScheduleDetails.scheduleId
                        AND [date] >= GETDATE()
                        AND isCancelled=0
                        AND isActive=1
                    )
                )
            )
           
           

        IF EXISTS(Select * from CarModels WHERE @id=CarModels.id AND isRegistered=0 and @id is not NULL)
            BEGIN
                SELECT * 
                FROM [dbo].[CarModels]
                WHERE @id =CarModels.id
            END
        ELSE 
            BEGIN   
                PRINT('Can not unregister this car because it has some schedules without happened')
            END                                     

END
GO
/****** Object:  StoredProcedure [dbo].[SP_UpdateCarModelInformation]    Script Date: 7/31/2021 2:49:32 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE     PROCEDURE [dbo].[SP_UpdateCarModelInformation]
(
    @id NVARCHAR(36),
    @name NVARCHAR(250)=NULL,
    @luggagePayload INT=NULL,
    @guestQuantity INT=NULL,
    @photoUrl NVARCHAR(MAX)=NULL,
    @standardPricePerKm INT=NULL,
    @country NVARCHAR(250)=NULL,
    @city NVARCHAR(250)=NULL,
    @classId NVARCHAR(36)=NULL
)
AS
BEGIN
  BEGIN TRY
        UPDATE [dbo].[CarModels]
        SET
        [name]=ISNULL(@name, name),
        [luggagePayload]=ISNULL(@luggagePayload, luggagePayload),
        [guestQuantity]=ISNULL(@guestQuantity, guestQuantity),
        [photoUrl]=ISNULL(@photoUrl , photoUrl),
        [country]=ISNULL(@country,country),
        [city]=ISNULL(@city,city),
        [classId]=ISNULL(@classId,classId)
        WHERE  id=@id

        IF (@standardPricePerKm IS NOT NULL)
        BEGIN
            INSERT INTO [dbo].[StandardPrices]
            (
                [standardPricePerKm], [carModelId]
            )
            VALUES
            (
                @standardPricePerKm, @id
            )
        END

        SELECT CarModels.*,StandardPrices.standardPricePerKm 
        FROM CarModels,StandardPrices
        WHERE CarModels.id = @id
        AND CarModels.id=StandardPrices.carModelId
        AND StandardPrices.isActive=1
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
