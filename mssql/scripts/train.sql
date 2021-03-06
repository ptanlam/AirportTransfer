CREATE DATABASE [Train_Service_DB]
GO

USE [Train_Service_DB]
GO
/****** Object:  Table [dbo].[JourneyDetails]    Script Date: 7/31/2021 2:49:59 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[JourneyDetails](
	[id] [nvarchar](36) NOT NULL,
	[orderNumber] [int] NOT NULL,
	[description] [ntext] NOT NULL,
	[placeId] [nvarchar](50) NOT NULL,
	[district] [nvarchar](250) NOT NULL,
	[city] [nvarchar](250) NOT NULL,
	[country] [nvarchar](250) NOT NULL,
	[journeyId] [nvarchar](36) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Journeys]    Script Date: 7/31/2021 2:49:59 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Journeys](
	[id] [nvarchar](36) NOT NULL,
	[isActive] [bit] NOT NULL,
	[createdAt] [datetime2](7) NOT NULL,
	[trainId] [nvarchar](36) NOT NULL,
	[travelTime] [int] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ScheduleDetails]    Script Date: 7/31/2021 2:49:59 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ScheduleDetails](
	[id] [nvarchar](36) NOT NULL,
	[scheduleId] [nvarchar](36) NOT NULL,
	[departureAt] [time](0) NOT NULL,
	[ticketCount] [int] NOT NULL,
	[arrivalAt] [time](0) NOT NULL,
	[isActive] [bit] NULL,
	[isCancelled] [bit] NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Schedules]    Script Date: 7/31/2021 2:49:59 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Schedules](
	[id] [nvarchar](36) NOT NULL,
	[date] [date] NOT NULL,
	[startTime] [time](0) NOT NULL,
	[endTime] [time](0) NOT NULL,
	[gap] [time](0) NOT NULL,
	[numOfJourneys]  AS (ceiling((datediff(minute,[startTime],[endTime])*(1.))/ltrim(datediff(minute,(0),[gap])))) PERSISTED,
	[journeyId] [nvarchar](36) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[TicketPrices]    Script Date: 7/31/2021 2:49:59 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[TicketPrices](
	[id] [nvarchar](36) NOT NULL,
	[trainId] [nvarchar](36) NOT NULL,
	[ticketPrice] [int] NOT NULL,
	[availableDate] [datetime2](7) NOT NULL,
	[isActive] [bit] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Trains]    Script Date: 7/31/2021 2:49:59 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Trains](
	[id] [nvarchar](36) NOT NULL,
	[name] [nvarchar](250) NOT NULL,
	[photoUrl] [nvarchar](max) NULL,
	[partnerId] [nvarchar](36) NULL,
	[classId] [nvarchar](36) NULL,
	[isRegistered] [bit] NOT NULL,
	[createdAt] [datetime2](7) NOT NULL,
	[updatedAt] [datetime2](7) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
ALTER TABLE [dbo].[JourneyDetails] ADD  DEFAULT (newid()) FOR [id]
GO
ALTER TABLE [dbo].[Journeys] ADD  DEFAULT (newid()) FOR [id]
GO
ALTER TABLE [dbo].[Journeys] ADD  DEFAULT ((1)) FOR [isActive]
GO
ALTER TABLE [dbo].[Journeys] ADD  DEFAULT (getdate()) FOR [createdAt]
GO
ALTER TABLE [dbo].[ScheduleDetails] ADD  DEFAULT (newid()) FOR [id]
GO
ALTER TABLE [dbo].[ScheduleDetails] ADD  DEFAULT ((0)) FOR [ticketCount]
GO
ALTER TABLE [dbo].[ScheduleDetails] ADD  DEFAULT ((1)) FOR [isActive]
GO
ALTER TABLE [dbo].[ScheduleDetails] ADD  DEFAULT ((0)) FOR [isCancelled]
GO
ALTER TABLE [dbo].[Schedules] ADD  DEFAULT (newid()) FOR [id]
GO
ALTER TABLE [dbo].[TicketPrices] ADD  DEFAULT (newid()) FOR [id]
GO
ALTER TABLE [dbo].[TicketPrices] ADD  DEFAULT (getdate()) FOR [availableDate]
GO
ALTER TABLE [dbo].[TicketPrices] ADD  DEFAULT ((1)) FOR [isActive]
GO
ALTER TABLE [dbo].[Trains] ADD  DEFAULT (newid()) FOR [id]
GO
ALTER TABLE [dbo].[Trains] ADD  DEFAULT ((1)) FOR [isRegistered]
GO
ALTER TABLE [dbo].[Trains] ADD  DEFAULT (getdate()) FOR [createdAt]
GO
ALTER TABLE [dbo].[Trains] ADD  DEFAULT (getdate()) FOR [updatedAt]
GO
ALTER TABLE [dbo].[JourneyDetails]  WITH CHECK ADD  CONSTRAINT [FK_Journey_JourneyDetail] FOREIGN KEY([journeyId])
REFERENCES [dbo].[Journeys] ([id])
GO
ALTER TABLE [dbo].[JourneyDetails] CHECK CONSTRAINT [FK_Journey_JourneyDetail]
GO
ALTER TABLE [dbo].[Journeys]  WITH CHECK ADD  CONSTRAINT [FK_Train_Journey] FOREIGN KEY([trainId])
REFERENCES [dbo].[Trains] ([id])
GO
ALTER TABLE [dbo].[Journeys] CHECK CONSTRAINT [FK_Train_Journey]
GO
ALTER TABLE [dbo].[ScheduleDetails]  WITH CHECK ADD  CONSTRAINT [FK_Schedule_ScheduleDetail] FOREIGN KEY([scheduleId])
REFERENCES [dbo].[Schedules] ([id])
GO
ALTER TABLE [dbo].[ScheduleDetails] CHECK CONSTRAINT [FK_Schedule_ScheduleDetail]
GO
ALTER TABLE [dbo].[Schedules]  WITH CHECK ADD  CONSTRAINT [FK_Journey_Schedule] FOREIGN KEY([journeyId])
REFERENCES [dbo].[Journeys] ([id])
GO
ALTER TABLE [dbo].[Schedules] CHECK CONSTRAINT [FK_Journey_Schedule]
GO
ALTER TABLE [dbo].[TicketPrices]  WITH CHECK ADD  CONSTRAINT [FK_Train_TicketPrice] FOREIGN KEY([trainId])
REFERENCES [dbo].[Trains] ([id])
GO
ALTER TABLE [dbo].[TicketPrices] CHECK CONSTRAINT [FK_Train_TicketPrice]
GO
/****** Object:  StoredProcedure [dbo].[SP_ActivateJourney]    Script Date: 7/31/2021 2:49:59 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER OFF
GO
CREATE PROCEDURE [dbo].[SP_ActivateJourney]
(
    @journeyId NVARCHAR(36)
)
AS
BEGIN
    UPDATE [dbo].[Journeys]
    SET
        [isActive] = 1
    WHERE id = @journeyId

    DECLARE @trainId NVARCHAR(36) 
    SET @trainId = (
        SELECT trainId 
        FROM Journeys 
        WHERE Journeys.id = @journeyId
    )

    EXEC SP_GetJourneysByTrain @trainId
END
GO
/****** Object:  StoredProcedure [dbo].[SP_ActivateScheduleDetail]    Script Date: 7/31/2021 2:49:59 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER OFF
GO
CREATE   PROCEDURE [dbo].[SP_ActivateScheduleDetail]
   @scheduleDetailId NVARCHAR(36)
AS
BEGIN
    UPDATE [dbo].[ScheduleDetails]
    SET
        [isActive] = 1
    WHERE id = @scheduleDetailId

    EXEC SP_GetSecretFieldScheduleDetail @scheduleDetailId=@scheduleDetailId
END
GO
/****** Object:  StoredProcedure [dbo].[SP_AddJourney]    Script Date: 7/31/2021 2:49:59 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER OFF
GO

CREATE PROCEDURE [dbo].[SP_AddJourney]
(
    @trainId NVARCHAR(36),
    @travelTime INT
)
AS
BEGIN
    BEGIN
        DECLARE @journey TABLE (
            [id] NVARCHAR(36) NOT NULL,
            [isActive] BIT DEFAULT 1 NOT NULL,
            [createdAt] DATETIME2 NOT NULL,
            [trainId] NVARCHAR(36) NOT NULL,
            [travelTime] INT NOT NULL
        )
        INSERT INTO [dbo].[Journeys]
        (
        [trainId],[travelTime]
        )
        OUTPUT inserted.* INTO @journey
        VALUES
        (
        @trainId,@travelTime
        )
    END

    BEGIN
        SELECT *
        FROM @journey
    END
END
GO
/****** Object:  StoredProcedure [dbo].[SP_AddJourneyDetails]    Script Date: 7/31/2021 2:49:59 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER OFF
GO

CREATE PROCEDURE [dbo].[SP_AddJourneyDetails]
(
    @journeyId NVARCHAR(36),
    @orderNumber INT,
    @description NTEXT,
    @placeId NVARCHAR(50),
    @district NVARCHAR(250),
    @city NVARCHAR(250),
    @country NVARCHAR(250)
)
AS
BEGIN
    DECLARE @insertedDetails TABLE
    (
        [id] NVARCHAR(36) NOT NULL,
        [orderNumber] INT NOT NULL,
        [description] NTEXT NOT NULL,
        [placeId] NVARCHAR(50) NOT NULL,
        [district] NVARCHAR(250) NOT NULL,
        [city] NVARCHAR(250) NOT NULL,
        [country] NVARCHAR(250) NOT NULL,
        [journeyId] NVARCHAR(36) NOT NULL
    )
    INSERT INTO [dbo].[JourneyDetails]
    ( -- Columns to insert data into
     [orderNumber], [description], [placeId], [district], [city], 
     [country], [journeyId]
    )
    OUTPUT inserted.* INTO @insertedDetails
    VALUES
    (
     @orderNumber, @description, @placeId, @district, @city, 
     @country, @journeyId
    )
    SELECT * FROM @insertedDetails
END
GO
/****** Object:  StoredProcedure [dbo].[SP_AddSchedule]    Script Date: 7/31/2021 2:49:59 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE   PROCEDURE [dbo].[SP_AddSchedule]
(
    @date DATE,
    @startTime TIME(0),
    @endTime TIME(0),
    @gap TIME(0),
    @journeyId NVARCHAR(36)
)
AS
BEGIN
    BEGIN TRY
        BEGIN TRAN
            DECLARE @insertedSchedule TABLE (id NVARCHAR(36))
            INSERT INTO Schedules 
            ( 
                [date], [startTime], [endTime], [gap], [journeyId]
            )
            OUTPUT inserted.id INTO @insertedSchedule
            VALUES
            (
                @date, @startTime, @endTime, @gap, @journeyId
            )
            DECLARE @scheduleId NVARCHAR(36)
            SELECT @scheduleId = id FROM @insertedSchedule

            EXEC [dbo].[SP_GenerateScheduleDetails] @scheduleId = @scheduleId
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
/****** Object:  StoredProcedure [dbo].[SP_BookTrain]    Script Date: 7/31/2021 2:49:59 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER OFF
GO
CREATE   PROCEDURE [dbo].[SP_BookTrain]
    @scheduleDetailId NVARCHAR(36),
    @numberOfTickets INT
AS
BEGIN
    BEGIN TRY
        BEGIN TRAN
            UPDATE [dbo].[ScheduleDetails]
            SET
                [ticketCount]= ticketCount+@numberOfTickets
            WHERE id = @scheduleDetailId

            SELECT CAST(1 AS BIT) as success

            IF @@TRANCOUNT > 0  
                BEGIN
                    COMMIT
                    RETURN 1;
                END
            ELSE
                BEGIN
                    RETURN 0;
                END
    END TRY
    BEGIN CATCH 
        SELECT ERROR_MESSAGE() AS errorMessage
        ROLLBACK
    END CATCH
END
GO
/****** Object:  StoredProcedure [dbo].[SP_CancelScheduleDetail]    Script Date: 7/31/2021 2:49:59 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER OFF
GO
CREATE   PROCEDURE [dbo].[SP_CancelScheduleDetail]
    @scheduleDetailId NVARCHAR(36)
AS
BEGIN
   BEGIN TRY
        BEGIN TRAN
            DECLARE @ticketCount INT
            SELECT @ticketCount = sd.ticketCount
            FROM ScheduleDetails sd,Schedules s
            WHERE sd.id = @scheduleDetailId
            AND s.id = sd.scheduleId

            IF(@ticketCount = 0)
            BEGIN
                UPDATE ScheduleDetails
                SET isCancelled = 1
                WHERE id = @scheduleDetailId
            END

            EXEC SP_GetSecretFieldScheduleDetail @scheduleDetailId=@scheduleDetailId
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
/****** Object:  StoredProcedure [dbo].[SP_DeactivateJourney]    Script Date: 7/31/2021 2:49:59 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER OFF
GO
CREATE PROCEDURE [dbo].[SP_DeactivateJourney]
(
    @journeyId NVARCHAR(36)
)
AS
BEGIN
    UPDATE [dbo].[Journeys]
    SET
        [isActive] = 0
    WHERE id = @journeyId

    DECLARE @trainId NVARCHAR(36) 
    SET @trainId = (
        SELECT trainId 
        FROM Journeys 
        WHERE Journeys.id = @journeyId
    )

    EXEC SP_GetJourneysByTrain @trainId
END
GO
/****** Object:  StoredProcedure [dbo].[SP_DeactivateScheduleDetail]    Script Date: 7/31/2021 2:49:59 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER OFF
GO
CREATE   PROCEDURE [dbo].[SP_DeactivateScheduleDetail]
    @scheduleDetailId NVARCHAR(36)
AS
BEGIN
    UPDATE [dbo].[ScheduleDetails]
    SET
        [isActive] = 0
    WHERE id = @scheduleDetailId  
    EXEC SP_GetSecretFieldScheduleDetail @scheduleDetailId=@scheduleDetailId
END
GO
/****** Object:  StoredProcedure [dbo].[SP_GenerateScheduleDetails]    Script Date: 7/31/2021 2:49:59 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER OFF
GO
CREATE   PROCEDURE [dbo].[SP_GenerateScheduleDetails]
   @scheduleId NVARCHAR(36)
AS
BEGIN
    DECLARE @counter INT 
    DECLARE @start TIME(0)
    DECLARE @gap TIME(0)
    DECLARE @travelTime INT
    DECLARE @end TIME(0)
    DECLARE @journeyId NVARCHAR(36)
    
    SET @journeyId = (SELECT journeyId FROM Schedules WHERE id = @scheduleId)
    SET @counter =  (SELECT numOfJourneys FROM Schedules WHERE Schedules.id = @scheduleId)
    SET @gap = (SELECT gap FROM Schedules WHERE Schedules.id = @scheduleId)
    SET @travelTime = (SELECT travelTime FROM Journeys WHERE id = @journeyId)
    SET @start = (SELECT startTime  FROM Schedules WHERE Schedules.id = @scheduleId)
    SET @end = CAST(DATEADD(SECOND,@travelTime,@start)AS TIME(0)) 


    WHILE (@counter > 0)
    BEGIN
        INSERT INTO [dbo].[ScheduleDetails] 
        (
        [departureAt], [arrivalAt], [scheduleId]
        )
        VALUES
        ( 
        @start, @end, @scheduleId
        )
        SET @start = CONVERT(TIME,DATEADD(MI,CONVERT(INT,LTRIM(DATEDIFF(MINUTE, 0, @gap))),@start))
        SET @end = CONVERT(TIME,DATEADD(SECOND,@travelTime,@start))
        SET @counter  = @counter  - 1
    END
    
    DECLARE @date DATE
    SELECT @date = [date]
    FROM Schedules
    WHERE Schedules.id = @scheduleId

    SELECT CONVERT(varchar(10), CAST(ScheduleDetails.departureAt AS TIME)) AS departureAt,
        CONVERT(varchar(10), CAST(ScheduleDetails.arrivalAt AS TIME)) AS arrivalAt,
        id, ticketCount, scheduleId, isActive, isCancelled, 
        0 AS isCancellable, (
            SELECT CASE WHEN CAST(GETDATE() AS DATE) <  @date
            THEN CAST(1 AS BIT) 
            ELSE CAST(0 AS BIT) 
            END
        ) AS canBeManipulated
    FROM ScheduleDetails 
    WHERE scheduleId = @scheduleId 
    ORDER BY departureAt ASC  
END
GO
/****** Object:  StoredProcedure [dbo].[SP_GetJourneyDetailsByJourney]    Script Date: 7/31/2021 2:49:59 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER OFF
GO
CREATE PROCEDURE [dbo].[SP_GetJourneyDetailsByJourney]
(
    @journeyId NVARCHAR(36)
)
AS
BEGIN
    SELECT *
    FROM JourneyDetails
    WHERE JourneyDetails.journeyId = @journeyId
    ORDER BY JourneyDetails.orderNumber
END
GO
/****** Object:  StoredProcedure [dbo].[SP_GetJourneysByTrain]    Script Date: 7/31/2021 2:49:59 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER OFF
GO

CREATE   PROCEDURE [dbo].[SP_GetJourneysByTrain]
(
    @trainId NVARCHAR(36)
)
AS
BEGIN
    SELECT CONVERT(varchar(10),CAST(DATEADD(S,Journeys.travelTime,0) AS TIME(0))) AS travelTime,
        Journeys.trainId, Journeys.createdAt, Journeys.id, Journeys.isActive, (
            SELECT CASE WHEN EXISTS (
                SELECT *
                FROM [Schedules]
                WHERE [date] >= CAST(GETDATE() AS DATE)
                AND journeyId = Journeys.id
            )
            THEN CAST(1 AS BIT)
            ELSE CAST(0 AS BIT) 
            END
        ) as stillHasSchedule
    FROM Journeys
    WHERE Journeys.trainId = @trainId
    ORDER BY Journeys.isActive DESC
END
GO
/****** Object:  StoredProcedure [dbo].[SP_GetScheduleById]    Script Date: 7/31/2021 2:49:59 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER OFF
GO

CREATE   PROCEDURE [dbo].[SP_GetScheduleById]
(
    @scheduleId NVARCHAR(36)
)
AS
BEGIN
     SELECT CONVERT(varchar(10), CAST(Schedules.startTime AS TIME)) AS startTime,
        CONVERT(varchar(10), CAST(Schedules.endTime AS TIME)) AS endTime,
        CONVERT(varchar(10), CAST(Schedules.gap AS TIME)) AS gap,
        id, journeyId, [date]
    FROM Schedules
    WHERE Schedules.id = @scheduleId
END
GO
/****** Object:  StoredProcedure [dbo].[SP_GetScheduleByJourneyAndDate]    Script Date: 7/31/2021 2:49:59 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER OFF
GO
CREATE   PROCEDURE [dbo].[SP_GetScheduleByJourneyAndDate]
(
    @journeyId NVARCHAR(36), 
    @date DATE
)
AS
BEGIN
    SELECT CONVERT(varchar(10), CAST(Schedules.startTime AS TIME)) AS startTime,
        CONVERT(varchar(10), CAST(Schedules.endTime AS TIME)) AS endTime,
        CONVERT(varchar(10), CAST(Schedules.gap AS TIME)) AS gap,
        id, journeyId, [date], travelTime
    FROM Schedules,(
        SELECT travelTime
        FROM Journeys
        WHERE id = @journeyId
    ) AS Journey
    WHERE Schedules.journeyId = @journeyId
    AND Schedules.[date] = @date
END
GO
/****** Object:  StoredProcedure [dbo].[SP_GetScheduleDetailsByPartnerAndConditions]    Script Date: 7/31/2021 2:49:59 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER OFF
GO
CREATE PROCEDURE [dbo].[SP_GetScheduleDetailsByPartnerAndConditions]
    @partnerId NVARCHAR(36),
    @numberOfPax INT = 1,
    @pickupTime TIME(0),
    @date DATE,
    @depDistrict NVARCHAR(250),
    @depCity NVARCHAR(250),
    @depCountry NVARCHAR(250),
    @desDistrict NVARCHAR(250),
    @desCity NVARCHAR(250),
    @desCountry NVARCHAR(250)
AS
BEGIN
    DECLARE @journeyIds TABLE (
        id NVARCHAR(36),
        trainId NVARCHAR(36)
    )
    INSERT INTO @journeyIds
    SELECT Journeys.id, trainId
    FROM Journeys
    WHERE isActive = 1
    AND Journeys.id IN (
        SELECT journeyId
        FROM JourneyDetails
        WHERE district = @depDistrict
        AND city = @depCity
        AND country = @depCountry
    )
    AND Journeys.id IN (
        SELECT journeyId
        FROM JourneyDetails
        WHERE district = @desDistrict
        AND city = @desCity
        AND country = @desCountry
    )

    DECLARE @scheduleIds TABLE (
        id NVARCHAR(36),
        journeyId NVARCHAR(36),
        [date] DATE
    )
    INSERT INTO @scheduleIds
    SELECT Schedules.id, journeyId, [date]
    FROM Schedules
    WHERE Schedules.date = @date
    AND Schedules.journeyId IN (
        SELECT id 
        FROM @journeyIds
    )
    AND Schedules.id IN (
        SELECT scheduleId
        FROM ScheduleDetails
        WHERE isActive = 1
    )

    DECLARE @trains TABLE (
        id NVARCHAR(36),
        photoUrl NVARCHAR(MAX),
        partnerId NVARCHAR(36),
        classId NVARCHAR(36),
        [name] NVARCHAR(250),
        price INT
    )
    INSERT INTO @trains
    SELECT Trains.id, photoUrl, partnerId, classId, Trains.name,
        TicketPrices.ticketPrice AS price
    FROM Trains, TicketPrices
    WHERE partnerId = @partnerId
    AND Trains.id IN (
        SELECT trainId
        FROM Journeys
        WHERE Journeys.id IN (
            SELECT FilteredJourneys.id
            FROM @journeyIds AS FilteredJourneys,
                @scheduleIds AS FilteredSchedules
            WHERE FilteredJourneys.id = FilteredSchedules.journeyId
        )
    )
    AND TicketPrices.trainId = Trains.id
    AND TicketPrices.isActive = 1

    DECLARE @stations TABLE (
        [description] NTEXT,
        orderNumber INT,
        journeyId NVARCHAR(36)
    )
    INSERT INTO @stations
    SELECT [description], orderNumber, journeyId
    FROM JourneyDetails
    WHERE journeyId IN (
        SELECT FilteredJourneys.id
        FROM @journeyIds AS FilteredJourneys, 
            @trains AS FilteredTrains
        WHERE FilteredJourneys.trainId = FilteredTrains.id
    )

    DECLARE @options TABLE (
        id NVARCHAR(36),
        departureAt TIME(0),
        arrivalAt TIME(0),
        scheduleId NVARCHAR(36)
    )
    INSERT INTO @options
    SELECT id, departureAt, arrivalAt, scheduleId
    FROM ScheduleDetails
    WHERE scheduleId IN (
        SELECT id
        FROM @scheduleIds AS FilerterSchedules
        WHERE ScheduleDetails.scheduleId = FilerterSchedules.id
    )
    AND departureAt >= @pickupTime

    SELECT *, (
        SELECT [date], (
            SELECT *
            FROM @options
            WHERE scheduleId = FilteredSchedules.id
            ORDER BY departureAt
            FOR JSON PATH
        ) AS options
        FROM @scheduleIds AS FilteredSchedules, 
            @journeyIds AS FilteredJourneys
        WHERE FilteredJourneys.trainId = FilteredTrains.id
        AND FilteredSchedules.journeyId = FilteredJourneys.id
        FOR JSON PATH
    ) AS schedules, (
        SELECT * 
        FROM @stations AS FilteredStations
        WHERE FilteredStations.journeyId IN (
            SELECT FilteredJourneys.id
            FROM @journeyIds AS FilteredJourneys
            WHERE FilteredJourneys.trainId = FilteredTrains.id
        )
        ORDER BY journeyId
        FOR JSON PATH
    ) AS stations
    FROM @trains AS FilteredTrains
    FOR JSON AUTO
END
GO
/****** Object:  StoredProcedure [dbo].[SP_GetScheduleDetailsBySchedule]    Script Date: 7/31/2021 2:49:59 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER OFF
GO
CREATE   PROCEDURE [dbo].[SP_GetScheduleDetailsBySchedule]
    @scheduleId NVARCHAR(36),
    @pickUpTime TIME(0) = NULL
AS
BEGIN
    DECLARE @date NVARCHAR(20)
    DECLARE @schedule TABLE (
        [date] DATE
    )
    INSERT INTO @schedule 
    SELECT [date]
    FROM Schedules
    WHERE Schedules.id = @scheduleId

    SELECT @date = [date]
    FROM Schedules
    WHERE Schedules.id = @scheduleId

    IF (@pickUpTime IS NOT NULL)
    BEGIN
        DECLARE @now AS TIME(0)
        SET @now = DATEADD(HOUR, 7, CAST(GETDATE() AS TIME))

        DECLARE @chosenTime AS TIME(0)
        SET @chosenTime = CAST(@pickUpTime AS TIME(0))
         IF(DATEDIFF(MILLISECOND, @pickUpTime, @now) > 0 AND
            (SELECT [date] FROM @schedule) = CAST(GETDATE() AS DATE))
        BEGIN
            SET @chosenTime = DATEADD(MINUTE, 15, CAST(@now AS TIME(0)))
        END

        SELECT CONVERT(varchar(10), CAST(ScheduleDetails.departureAt AS TIME)) AS departureAt,
            CONVERT(varchar(10), CAST(ScheduleDetails.arrivalAt AS TIME)) AS arrivalAt, 
            ticketCount, ScheduleDetails.id, isActive, (
                SELECT CASE WHEN (SELECT ticketCount FROM @schedule) = 0
                THEN CAST(1 AS BIT)
                ELSE CAST(0 AS BIT) END
            ) AS isCancellable, (
            SELECT CASE WHEN CAST(GETDATE() AS DATE) <  (SELECT [date] FROM @schedule)
            THEN CAST(1 AS BIT) 
            ELSE CAST(0 AS BIT) 
            END
        ) AS canBeManipulated
        FROM [dbo].[ScheduleDetails]
        WHERE scheduleId = @scheduleId
        AND CAST(departureAt AS TIME(0)) >= @chosenTime
        AND isActive = 1
        ORDER BY departureAt
        RETURN
    END

    SELECT CONVERT(varchar(10), CAST(ScheduleDetails.departureAt AS TIME)) AS departureAt,
        CONVERT(varchar(10), CAST(ScheduleDetails.arrivalAt AS TIME)) AS arrivalAt, 
        ticketCount, id, isActive, isCancelled, (
            SELECT CASE WHEN ticketCount = 0
            THEN CAST(1 AS BIT)
            ELSE CAST(0 AS BIT) END
        ) AS isCancellable, (
            SELECT CASE WHEN DATEDIFF(hour,GETDATE(),@date +' '+ CAST((departureAt) AS NVARCHAR(20))) > 12 
            AND CAST(GETDATE() AS DATE) <  (SELECT [date] FROM @schedule)
            THEN CAST(1 AS BIT) 
            ELSE CAST(0 AS BIT) 
            END
        ) AS canBeManipulated
    FROM [dbo].[ScheduleDetails]
    WHERE scheduleId = @scheduleId
    AND isCancelled = 0
    ORDER BY departureAt
END
GO
/****** Object:  StoredProcedure [dbo].[SP_GetSchedulesByConditions]    Script Date: 7/31/2021 2:49:59 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER OFF
GO

CREATE   PROCEDURE [dbo].[SP_GetSchedulesByConditions]
(
    @pickupTime TIME(0),
    @date DATE,
    @depDistrict NVARCHAR(250),
    @depCity NVARCHAR(250),
    @depCountry NVARCHAR(250),
    @desDistrict NVARCHAR(250),
    @desCity NVARCHAR(250),
    @desCountry NVARCHAR(250)
)
AS
BEGIN
    DECLARE @now AS TIME(0)
    SET @now = DATEADD(HOUR, 7, CAST(GETDATE() AS TIME))

    DECLARE @chosenTime AS TIME(0)
    SET @chosenTime = CAST(@pickupTime AS TIME)

    IF(DATEDIFF(MILLISECOND, @pickUpTime, @now) > 0 AND @date = CAST(GETDATE() AS DATE))
    BEGIN
        SET @chosenTime =  DATEADD(MINUTE, 15, CAST(@now AS TIME))
    END

    SELECT Schedules.id AS scheduleId, Schedules.journeyId
    FROM (
        SELECT *
        FROM Schedules
        WHERE Schedules.[date] = @date
        AND Schedules.journeyId IN (
            SELECT Journeys.id
            FROM Journeys
            WHERE isActive = 1
            AND Journeys.id IN (
                SELECT journeyId
                FROM JourneyDetails
                WHERE district = @depDistrict
                AND city = @depCity
                AND country = @depCountry
            )
            AND Journeys.id IN (
                SELECT journeyId
                FROM JourneyDetails
                WHERE district = @desDistrict
                AND city = @desCity
                AND country = @desCountry
            )
        )
    ) AS Schedules, ScheduleDetails
    WHERE ScheduleDetails.departureAt >= @chosenTime
    AND Schedules.id = ScheduleDetails.scheduleId
    GROUP BY Schedules.id, Schedules.journeyId
END
GO
/****** Object:  StoredProcedure [dbo].[SP_GetSecretFieldScheduleDetail]    Script Date: 7/31/2021 2:49:59 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER OFF
GO

CREATE   PROCEDURE [dbo].[SP_GetSecretFieldScheduleDetail]
    @scheduleDetailId NVARCHAR(36)
AS
BEGIN
    DECLARE @date NVARCHAR(15)
    DECLARE @ticketCount INT
    DECLARE @departureAt NVARCHAR(15)
    SELECT @date = s.date, @ticketCount = sd.ticketCount, @departureAt = sd.departureAt
    FROM ScheduleDetails sd,Schedules s
    WHERE sd.id = @scheduleDetailId
    AND s.id = sd.scheduleId
    GROUP BY s.[date], sd.[ticketCount],sd.departureAt
    SELECT CONVERT(varchar(10), CAST(ScheduleDetails.departureAt AS TIME)) AS departureAt,
        CONVERT(varchar(10), CAST(ScheduleDetails.arrivalAt AS TIME)) AS arrivalAt, 
        ticketCount, id, isActive, isCancelled,(
            SELECT CASE WHEN @ticketCount = 0
            THEN CAST(1 AS BIT)
            ELSE CAST(0 AS BIT) END
        ) AS isCancellable,
        (
            SELECT CASE WHEN DATEDIFF(hour,GETDATE(),@date +' '+ @departureAt) > 12 AND  CAST(GETDATE() AS DATE) <  @date
            THEN CAST(1 AS BIT)
            ELSE CAST(0 AS BIT) END
        ) AS canBeManipulated
    FROM ScheduleDetails
    WHERE id = @scheduleDetailId
END
GO
/****** Object:  StoredProcedure [dbo].[SP_GetTicketFullInformation]    Script Date: 7/31/2021 2:49:59 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER OFF
GO
CREATE   PROCEDURE [dbo].[SP_GetTicketFullInformation]
    @scheduleDetailId NVARCHAR(36)
AS
BEGIN
    DECLARE @scheduleId NVARCHAR(36)
    DECLARE @journeyId NVARCHAR(36)
    DECLARE @trainId NVARCHAR(36)

    SELECT @scheduleId = scheduleId 
    FROM ScheduleDetails 
    WHERE id = @scheduleDetailId

    SELECT @journeyId=journeyId 
    FROM Schedules 
    WHERE id =@scheduleId

    SELECT @trainId = trainId 
    FROM Journeys 
    WHERE id = @journeyId

    DECLARE @innerJSON nvarchar(max)

    SET @innerJSON =(SELECT * 
                FROM Trains 
                WHERE id = @trainId
                FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
    SELECT (
    JSON_QUERY(@innerJSON)
    ) AS train,
    departureAt, arrivalAt,
    (
        SELECT [date] 
        FROM Schedules 
        WHERE id = @scheduleId
    ) AS [date],
    (
        SELECT district, city, [description]
        FROM JourneyDetails 
        WHERE journeyId = @journeyId 
        ORDER BY (orderNumber) ASC
        FOR JSON PATH
    )AS stations
    FROM ScheduleDetails
    WHERE id = @scheduleDetailId
    FOR JSON PATH,WITHOUT_ARRAY_WRAPPER
END
GO
/****** Object:  StoredProcedure [dbo].[SP_GetTrainByJourney]    Script Date: 7/31/2021 2:49:59 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER OFF
GO

CREATE   PROCEDURE [dbo].[SP_GetTrainByJourney]
(
    @journeyId NVARCHAR(36)
)
AS
BEGIN
    DECLARE @trainId NVARCHAR(36)
    SET @trainId = (
        SELECT trainId
        FROM Journeys
        WHERE id = @journeyId
    )

    SELECT Trains.*, ticketPrice
    FROM Trains, (
        SELECT ticketPrice
        FROM TicketPrices
        WHERE trainId = @trainId
        AND isActive = 1
    ) AS ticketPrice
    WHERE Trains.id = @trainId
END
GO
/****** Object:  StoredProcedure [dbo].[SP_GetTrainsByPartner]    Script Date: 7/31/2021 2:49:59 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER OFF
GO
CREATE   PROCEDURE [dbo].[SP_GetTrainsByPartner]
(
    @partnerId NVARCHAR(36)
)
AS
BEGIN
    SELECT Trains.*,TicketPrices.ticketPrice AS ticketPrice
    FROM Trains, TicketPrices
    WHERE Trains.partnerId = @partnerId
    AND Trains.isRegistered = 1
    AND TicketPrices.trainId = Trains.id
    AND TicketPrices.isActive = 1
END
GO
/****** Object:  StoredProcedure [dbo].[SP_RegisterTrain]    Script Date: 7/31/2021 2:49:59 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER OFF
GO
CREATE   PROCEDURE [dbo].[SP_RegisterTrain]
    @name NVARCHAR(250),
    @photoUrl NVARCHAR(MAX),
    @ticketPrice INT,
    @partnerId NVARCHAR(36),
    @classId NVARCHAR(36)
AS
BEGIN
    BEGIN TRY
        BEGIN TRAN
            DECLARE @insertedTrain TABLE (
                id NVARCHAR(36)
            )
            INSERT INTO [dbo].[Trains]
            (
                [name], [photoUrl], [partnerId], [classId]
            )
            OUTPUT inserted.id INTO @insertedTrain
            VALUES
            (
                @name, @photoUrl, @partnerId, @classId
            )

            DECLARE @insertedTrainId NVARCHAR(36)
            SELECT @insertedTrainId = id FROM @insertedTrain

            INSERT INTO [dbo].[TicketPrices]
            (
                [ticketPrice], [trainId]
            )
            VALUES
            (
                @ticketPrice, @insertedTrainId
            )
        SELECT Trains.*, ticketPrice 
        FROM Trains, (
            SELECT ticketPrice
            FROM TicketPrices
            WHERE trainId = @insertedTrainId
            AND isActive = 1
        ) AS ticketPrice
        WHERE Trains.id = @insertedTrainId
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
/****** Object:  StoredProcedure [dbo].[SP_RevokeTickets]    Script Date: 7/31/2021 2:49:59 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER OFF
GO
CREATE   PROCEDURE [dbo].[SP_RevokeTickets]
    @scheduleDetailId NVARCHAR(36),
    @numberOfTickets INT
AS
BEGIN
    BEGIN TRY
        BEGIN TRAN
        DECLARE @ticketCount INT
        SELECT @ticketCount = ticketCount FROM ScheduleDetails WHERE id = @scheduleDetailId
        
        IF (@numberOfTickets > @ticketCount)
        BEGIN
            SELECT CAST(0 AS BIT) AS success;
        END
        ELSE
        BEGIN
            UPDATE ScheduleDetails
            SET ticketCount = ticketCount - @numberOfTickets
            WHERE id = @scheduleDetailId;
            SELECT CAST(1 AS BIT) AS success;
        END

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
/****** Object:  StoredProcedure [dbo].[SP_UnregisterTrain]    Script Date: 7/31/2021 2:49:59 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER OFF
GO
CREATE   PROCEDURE [dbo].[SP_UnregisterTrain]
   @trainId NVARCHAR(36)
AS
BEGIN
    DECLARE @canBeUnregistered BIT
    SET @canBeUnregistered = (
        SELECT CASE WHEN NOT EXISTS (
            SELECT *
            FROM Journeys
            WHERE Journeys.trainId = @trainId
            AND Journeys.isActive = 1
        )
        THEN CAST(1 AS BIT)
        ELSE CAST(0 AS BIT) END
    )

    IF (@canBeUnregistered = 1)
    BEGIN
        UPDATE Trains
        SET isRegistered = 0
        WHERE id = @trainId
    END

    SELECT @canBeUnregistered as canBeUnregistered
END
GO
/****** Object:  StoredProcedure [dbo].[SP_UpdateTrainInformation]    Script Date: 7/31/2021 2:49:59 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER OFF
GO

CREATE   PROCEDURE [dbo].[SP_UpdateTrainInformation]
(
    @vehicleId NVARCHAR(36),
    @name NVARCHAR(250) = NULL,
    @ticketPrice INT = NULL,
    @classId NVARCHAR(36) = NULL,
    @photoUrl NVARCHAR(MAX) = NULL
)
AS
BEGIN
    BEGIN TRY
        UPDATE [dbo].[Trains]
        SET
            [name] = ISNULL(@name, [name]),
            [photoUrl] = ISNULL(@photoUrl, photoUrl),
            [classId] = ISNULL(@classId,classId)
        WHERE id = @vehicleId

        IF (@ticketPrice IS NOT NULL)
        BEGIN
            INSERT INTO [dbo].[TicketPrices]
            (
                [ticketPrice], [trainId]
            )
            VALUES
            (
                @ticketPrice, @vehicleId 
            )
        END

        SELECT Trains.*, ticketPrice 
        FROM Trains, (
            SELECT ticketPrice
            FROM TicketPrices
            WHERE trainId = @vehicleId
            AND isActive = 1
        ) AS ticketPrice
        WHERE Trains.id = @vehicleId
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
