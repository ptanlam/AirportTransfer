CREATE DATABASE [Bus_Service_DB]
GO

USE [Bus_Service_DB]
GO
/****** Object:  Table [dbo].[Buses]    Script Date: 7/31/2021 7:48:50 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Buses](
	[id] [nvarchar](36) NOT NULL,
	[name] [nvarchar](250) NOT NULL,
	[guestQuantity] [int] NOT NULL,
	[partnerId] [nvarchar](36) NOT NULL,
	[classId] [nvarchar](36) NOT NULL,
	[photoUrl] [nvarchar](max) NOT NULL,
	[isRegistered] [bit] NOT NULL,
	[createdAt] [datetime] NULL,
	[updatedAt] [datetime] NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[JourneyDetails]    Script Date: 7/31/2021 7:48:50 AM ******/
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
/****** Object:  Table [dbo].[Journeys]    Script Date: 7/31/2021 7:48:50 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Journeys](
	[id] [nvarchar](36) NOT NULL,
	[isActive] [bit] NOT NULL,
	[travelTime] [time](0) NOT NULL,
	[createdAt] [datetime2](7) NOT NULL,
	[busId] [nvarchar](36) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ScheduleDetails]    Script Date: 7/31/2021 7:48:50 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ScheduleDetails](
	[id] [nvarchar](36) NOT NULL,
	[scheduleId] [nvarchar](36) NOT NULL,
	[departureAt] [time](0) NOT NULL,
	[arrivalAt] [time](0) NOT NULL,
	[remainingTickets] [int] NOT NULL,
	[isActive] [bit] NULL,
	[isCancelled] [bit] NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Schedules]    Script Date: 7/31/2021 7:48:50 AM ******/
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
	[numberOfVehicles] [int] NOT NULL,
	[numOfJourneys]  AS (ceiling((datediff(minute,[startTime],[endTime])*(1.))/ltrim(datediff(minute,(0),[gap])))) PERSISTED,
	[numberOfTickets] [int] NOT NULL,
	[journeyId] [nvarchar](36) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[TicketPrices]    Script Date: 7/31/2021 7:48:50 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[TicketPrices](
	[id] [nvarchar](36) NOT NULL,
	[busId] [nvarchar](36) NOT NULL,
	[ticketPrice] [int] NOT NULL,
	[availableDate] [datetime2](7) NOT NULL,
	[isActive] [bit] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[Buses] ADD  DEFAULT (newid()) FOR [id]
GO
ALTER TABLE [dbo].[Buses] ADD  DEFAULT ((1)) FOR [isRegistered]
GO
ALTER TABLE [dbo].[Buses] ADD  DEFAULT (getdate()) FOR [createdAt]
GO
ALTER TABLE [dbo].[Buses] ADD  DEFAULT (getdate()) FOR [updatedAt]
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
ALTER TABLE [dbo].[JourneyDetails]  WITH CHECK ADD  CONSTRAINT [FK_Journey_JourneyDetail] FOREIGN KEY([journeyId])
REFERENCES [dbo].[Journeys] ([id])
GO
ALTER TABLE [dbo].[JourneyDetails] CHECK CONSTRAINT [FK_Journey_JourneyDetail]
GO
ALTER TABLE [dbo].[Journeys]  WITH CHECK ADD  CONSTRAINT [FK_Bus_Journey] FOREIGN KEY([busId])
REFERENCES [dbo].[Buses] ([id])
GO
ALTER TABLE [dbo].[Journeys] CHECK CONSTRAINT [FK_Bus_Journey]
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
ALTER TABLE [dbo].[TicketPrices]  WITH CHECK ADD  CONSTRAINT [FK_Bus_TicketPrice] FOREIGN KEY([busId])
REFERENCES [dbo].[Buses] ([id])
GO
ALTER TABLE [dbo].[TicketPrices] CHECK CONSTRAINT [FK_Bus_TicketPrice]
GO
/****** Object:  StoredProcedure [dbo].[SP_ActivateJourney]    Script Date: 7/31/2021 7:48:50 AM ******/
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

    DECLARE @busId NVARCHAR(36) 
    SET @busId = (
        SELECT busId 
        FROM Journeys 
        WHERE Journeys.id = @journeyId
    )

    EXEC SP_GetJourneysByBus @busId
END
GO
/****** Object:  StoredProcedure [dbo].[SP_ActivateScheduleDetail]    Script Date: 7/31/2021 7:48:50 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER OFF
GO
CREATE PROCEDURE [dbo].[SP_ActivateScheduleDetail]
    @scheduleDetailId NVARCHAR(36)
AS
BEGIN
    UPDATE [dbo].[ScheduleDetails]
    SET
        [isActive] = 1
    WHERE id = @scheduleDetailId
    
    DECLARE @schedule TABLE (
        numberOfTickets INT,
        [date] DATE
    )
    INSERT INTO @schedule 
    SELECT Schedules.numberOfTickets, Schedules.[date]
    FROM Schedules, ScheduleDetails
    WHERE ScheduleDetails.id = @scheduleDetailId
    AND Schedules.id =  ScheduleDetails.scheduleId

    SELECT CONVERT(varchar(10), CAST(ScheduleDetails.departureAt AS TIME)) AS departureAt,
        CONVERT(varchar(10), CAST(ScheduleDetails.arrivalAt AS TIME)) AS arrivalAt, 
        remainingTickets, id, isActive, isCancelled, (
                SELECT CASE WHEN remainingTickets = (SELECT numberOfTickets FROM @schedule)
                THEN CAST(1 AS BIT)
                ELSE CAST(0 AS BIT) END
            ) AS isCancellable, (
            SELECT CASE WHEN CAST(GETDATE() AS DATE) <  (SELECT [date] FROM @schedule)
            THEN CAST(1 AS BIT) 
            ELSE CAST(0 AS BIT) 
            END
        ) AS canBeManipulated
    FROM ScheduleDetails
    WHERE id = @scheduleDetailId
END
GO
/****** Object:  StoredProcedure [dbo].[SP_AddJourney]    Script Date: 7/31/2021 7:48:50 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER OFF
GO

CREATE PROCEDURE [dbo].[SP_AddJourney]
(
    @busId NVARCHAR(36),
    @travelTime INT
)
AS
BEGIN
    BEGIN
        DECLARE @duration TIME(0)
        SET @duration = CAST(DATEADD(SECOND, @travelTime, '00:00:00') AS TIME(0))
        DECLARE @journey TABLE (
            [id] NVARCHAR(36),
            [isActive] BIT DEFAULT 1,
            [travelTime] TIME(0),
            [createdAt] DATETIME2,
            [busId] NVARCHAR(36)
        )
        INSERT INTO [dbo].[Journeys]
        (
            [busId], [travelTime]
        )
        OUTPUT inserted.* INTO @journey
        VALUES
        (
            @busId, @duration
        )
    END

    BEGIN
        SELECT *
        FROM @journey
    END
END
GO
/****** Object:  StoredProcedure [dbo].[SP_AddJourneyDetails]    Script Date: 7/31/2021 7:48:50 AM ******/
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
    (
     [orderNumber], [description], [placeId], [district], [city], [country], [journeyId]
    )
    OUTPUT inserted.* INTO @insertedDetails
    VALUES
    (
     @orderNumber, @description, @placeId, @district, @city, @country, @journeyId
    )
    SELECT * FROM @insertedDetails
END
GO
/****** Object:  StoredProcedure [dbo].[SP_AddSchedule]    Script Date: 7/31/2021 7:48:50 AM ******/
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
    @journeyId NVARCHAR(36),
    @numberOfVehicles INT
)
AS
BEGIN
    BEGIN TRY
        BEGIN TRAN
        DECLARE @numberOfTickets INT 
        SET @numberOfTickets = @numberOfVehicles * (
            SELECT guestQuantity
            FROM Buses
            WHERE id = (
                SELECT busId
                FROM Journeys
                WHERE id = @journeyId
            )
        )

        DECLARE @insertedSchedule TABLE (id NVARCHAR(36))
        INSERT INTO Schedules 
        ( 
            [date], [startTime], [endTime], [gap], [journeyId],
            [numberOfVehicles], [numberOfTickets]
        )
        OUTPUT inserted.id INTO @insertedSchedule
        VALUES
        (
            @date, @startTime, @endTime, @gap, @journeyId,
            @numberOfVehicles, @numberOfTickets
        )

        DECLARE @scheduleId NVARCHAR(36)
        SET @scheduleId = (SELECT id FROM @insertedSchedule)

        DECLARE @travelTime TIME(0)
        SET @travelTime = (
            SELECT travelTime
            FROM Journeys
            WHERE id = @journeyId
        )

        EXEC [dbo].[SP_GenerateScheduleDetails] @scheduleId = @scheduleId,
            @numberOfTickets = @numberOfTickets, @travelTime = @travelTime
        
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
/****** Object:  StoredProcedure [dbo].[SP_BookBus]    Script Date: 7/31/2021 7:48:50 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER OFF
GO
CREATE PROCEDURE [dbo].[SP_BookBus]
    @scheduleDetailId NVARCHAR(36),
    @numberOfTickets INT
AS
BEGIN
    BEGIN TRY
        BEGIN TRAN

        DECLARE @numberOfRemainingTickets INT
        SET @numberOfRemainingTickets = (
            SELECT remainingTickets
            FROM ScheduleDetails
            WHERE id = @scheduleDetailId
        )

        IF (@numberOfRemainingTickets >= @numberOfTickets)
        BEGIN
            UPDATE ScheduleDetails
            SET remainingTickets = remainingTickets - @numberOfTickets
            WHERE id = @scheduleDetailId
            SELECT CAST(1 AS BIT) as success
        END
        ELSE 
        BEGIN
            SELECT CAST(0 AS BIT) as success
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
/****** Object:  StoredProcedure [dbo].[SP_CancelScheduleDetail]    Script Date: 7/31/2021 7:48:50 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER OFF
GO
CREATE PROCEDURE [dbo].[SP_CancelScheduleDetail]
    @scheduleDetailId NVARCHAR(36)
AS
BEGIN
    BEGIN TRY
        BEGIN TRAN

        DECLARE @schedule TABLE (
            numberOfTickets INT,
            [date] DATE
        )
        INSERT INTO @schedule 
        SELECT Schedules.numberOfTickets, Schedules.[date]
        FROM Schedules, ScheduleDetails
        WHERE ScheduleDetails.id = @scheduleDetailId
        AND Schedules.id =  ScheduleDetails.scheduleId

        DECLARE @remainingTickets INT
        SET @remainingTickets = (
            SELECT remainingTickets
            FROM ScheduleDetails
            WHERE id = @scheduleDetailId
        )

        IF (@remainingTickets = (SELECT numberOfTickets FROM @schedule))
        BEGIN
            UPDATE ScheduleDetails
            SET isCancelled = 1
            WHERE id = @scheduleDetailId
        END

        SELECT CONVERT(varchar(10), CAST(ScheduleDetails.departureAt AS TIME)) AS departureAt,
        CONVERT(varchar(10), CAST(ScheduleDetails.arrivalAt AS TIME)) AS arrivalAt, 
        remainingTickets, id, isActive, isCancelled, (
                SELECT CASE WHEN remainingTickets = (SELECT numberOfTickets FROM @schedule)
                THEN CAST(1 AS BIT)
                ELSE CAST(0 AS BIT) END
            ) AS isCancellable, (
                SELECT CASE WHEN CAST(GETDATE() AS DATE) <  (SELECT [date] FROM @schedule)
                THEN CAST(1 AS BIT) 
                ELSE CAST(0 AS BIT) 
                END
            ) AS canBeManipulated
        FROM ScheduleDetails
        WHERE id = @scheduleDetailId


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
/****** Object:  StoredProcedure [dbo].[SP_DeactivateJourney]    Script Date: 7/31/2021 7:48:50 AM ******/
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

    DECLARE @busId NVARCHAR(36) 
    SET @busId = (
        SELECT busId 
        FROM Journeys 
        WHERE Journeys.id = @journeyId
    )

    EXEC SP_GetJourneysByBus @busId
END
GO
/****** Object:  StoredProcedure [dbo].[SP_DeactivateScheduleDetail]    Script Date: 7/31/2021 7:48:50 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER OFF
GO
CREATE PROCEDURE [dbo].[SP_DeactivateScheduleDetail]
    @scheduleDetailId NVARCHAR(36)
AS
BEGIN
    UPDATE [dbo].[ScheduleDetails]
    SET
        [isActive] = 0
    WHERE id = @scheduleDetailId
    
    DECLARE @schedule TABLE (
        numberOfTickets INT,
        [date] DATE
    )
    INSERT INTO @schedule 
    SELECT Schedules.numberOfTickets, Schedules.[date]
    FROM Schedules, ScheduleDetails
    WHERE ScheduleDetails.id = @scheduleDetailId
    AND Schedules.id =  ScheduleDetails.scheduleId

    SELECT CONVERT(varchar(10), CAST(ScheduleDetails.departureAt AS TIME)) AS departureAt,
        CONVERT(varchar(10), CAST(ScheduleDetails.arrivalAt AS TIME)) AS arrivalAt, 
        remainingTickets, id, isActive, isCancelled, (
            SELECT CASE WHEN remainingTickets = (SELECT numberOfTickets FROM @schedule)
            THEN CAST(1 AS BIT)
            ELSE CAST(0 AS BIT) END
        ) AS isCancellable, (
            SELECT CASE WHEN CAST(GETDATE() AS DATE) <  (SELECT [date] FROM @schedule)
            THEN CAST(1 AS BIT) 
            ELSE CAST(0 AS BIT) 
            END
        ) AS canBeManipulated
    FROM ScheduleDetails
    WHERE id = @scheduleDetailId
END
GO
/****** Object:  StoredProcedure [dbo].[SP_GenerateScheduleDetails]    Script Date: 7/31/2021 7:48:50 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER OFF
GO
CREATE   PROCEDURE [dbo].[SP_GenerateScheduleDetails]
(   
    @scheduleId NVARCHAR(36),
    @numberOfTickets INT,
    @travelTime TIME(0)
)
AS
BEGIN
    DECLARE @counter INT 
    DECLARE @start TIME(0)
    DECLARE @gap TIME(0)
    DECLARE @end TIME(0)

    SET @counter =  (SELECT numOfJourneys FROM Schedules WHERE Schedules.id = @scheduleId)
    SET @gap = (SELECT gap FROM Schedules WHERE Schedules.id = @scheduleId)
    SET @start = (SELECT startTime  FROM Schedules WHERE Schedules.id = @scheduleId)
    SET @end = CONVERT(TIME,DATEADD(MI,CONVERT(INT,LTRIM(DATEDIFF(MINUTE, 0, @travelTime))),@start)) 

    WHILE (@counter > 0)
    BEGIN
        INSERT INTO [dbo].[ScheduleDetails]
        (
        [departureAt], [arrivalAt], [scheduleId], [remainingTickets]
        )
        VALUES
        ( 
        @start, @end, @scheduleId, @numberOfTickets
        )
        SET @start = CONVERT(TIME,DATEADD(MI,CONVERT(INT,LTRIM(DATEDIFF(MINUTE, 0, @gap))),@start))
        SET @end = CONVERT(TIME,DATEADD(MI,CONVERT(INT,LTRIM(DATEDIFF(MINUTE, 0, @travelTime))),@start))
        SET @counter  = @counter  - 1
    END

    DECLARE @schedule TABLE (
        numberOfTickets INT,
        [date] DATE
    )
    INSERT INTO @schedule 
    SELECT numberOfTickets, [date]
    FROM Schedules
    WHERE id = @scheduleId

    SELECT CONVERT(varchar(10), CAST(ScheduleDetails.departureAt AS TIME)) AS departureAt,
        CONVERT(varchar(10), CAST(ScheduleDetails.arrivalAt AS TIME)) AS arrivalAt,
        id, remainingTickets, scheduleId, isActive, isCancelled, (
            SELECT CASE WHEN remainingTickets < (SELECT numberOfTickets FROM @schedule)
            THEN CAST(1 AS BIT)
            ELSE CAST(0 AS BIT) END
        ) AS isCancellable, (
            SELECT CASE WHEN CAST(GETDATE() AS DATE) <  (SELECT [date] FROM @schedule)
            THEN CAST(1 AS BIT) 
            ELSE CAST(0 AS BIT) 
            END
        ) AS canBeManipulated
    FROM ScheduleDetails 
    WHERE scheduleId = @scheduleId 
    ORDER BY departureAt ASC 
END
GO
/****** Object:  StoredProcedure [dbo].[SP_GetBusByJourney]    Script Date: 7/31/2021 7:48:50 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER OFF
GO
CREATE PROCEDURE [dbo].[SP_GetBusByJourney]
(
    @journeyId NVARCHAR(36)
)
AS
BEGIN
    DECLARE @busId NVARCHAR(36)
    SET @busId = (
        SELECT busId
        FROM Journeys
        WHERE id = @journeyId
    )

    SELECT Buses.*, ticketPrice
    FROM Buses, (
        SELECT ticketPrice
        FROM TicketPrices
        WHERE busId = @busId
        AND isActive = 1
    ) AS ticketPrice
    WHERE Buses.id = @busId
END
GO
/****** Object:  StoredProcedure [dbo].[SP_GetBusesByPartner]    Script Date: 7/31/2021 7:48:50 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER OFF
GO

CREATE PROCEDURE [dbo].[SP_GetBusesByPartner]
(
    @partnerId NVARCHAR(36)
)
AS
BEGIN
    SELECT Buses.*, ticketPrice
    FROM Buses, TicketPrices
    WHERE Buses.partnerId = @partnerId
    AND Buses.isRegistered = 1
    AND TicketPrices.busId = Buses.id
    AND TicketPrices.isActive = 1
END
GO
/****** Object:  StoredProcedure [dbo].[SP_GetJourneyDetailsByJourney]    Script Date: 7/31/2021 7:48:50 AM ******/
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
/****** Object:  StoredProcedure [dbo].[SP_GetJourneysByBus]    Script Date: 7/31/2021 7:48:50 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER OFF
GO

CREATE PROCEDURE [dbo].[SP_GetJourneysByBus]
(
    @busId NVARCHAR(36)
)
AS
BEGIN
    SELECT CONVERT(varchar(10), CAST(Journeys.travelTime AS TIME)) AS travelTime,
        Journeys.busId, Journeys.createdAt, Journeys.id, Journeys.isActive, 
        (SELECT CASE WHEN EXISTS (
            SELECT *
            FROM [Schedules]
            WHERE [date] >= CAST(GETDATE() AS DATE)
            AND journeyId = Journeys.id
        )
        THEN CAST(1 AS BIT)
        ELSE CAST(0 AS BIT) END) as stillHasSchedule
    FROM Journeys
    WHERE Journeys.busId = @busId
    ORDER BY Journeys.isActive DESC
END
GO
/****** Object:  StoredProcedure [dbo].[SP_GetScheduleById]    Script Date: 7/31/2021 7:48:51 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
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
        id, journeyId, [date], numberOfVehicles
    FROM Schedules
    WHERE Schedules.id = @scheduleId
END
GO
/****** Object:  StoredProcedure [dbo].[SP_GetScheduleByJourneyAndDate]    Script Date: 7/31/2021 7:48:51 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER OFF
GO
CREATE PROCEDURE [dbo].[SP_GetScheduleByJourneyAndDate]
(
    @journeyId NVARCHAR(36), 
    @date DATE
)
AS
BEGIN
    SELECT CONVERT(varchar(10), CAST(Schedules.startTime AS TIME)) AS startTime,
        CONVERT(varchar(10), CAST(Schedules.endTime AS TIME)) AS endTime,
        CONVERT(varchar(10), CAST(Schedules.gap AS TIME)) AS gap,
        id, journeyId, [date], numberOfVehicles, travelTime
    FROM Schedules, (
        SELECT travelTime
        FROM Journeys
        WHERE id = @journeyId
    ) AS Journey
    WHERE Schedules.journeyId = @journeyId
    AND Schedules.[date] = @date
END
GO
/****** Object:  StoredProcedure [dbo].[SP_GetScheduleDetailsByPartnerAndConditions]    Script Date: 7/31/2021 7:48:51 AM ******/
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
    DECLARE @now AS TIME(0)
    SET @now = DATEADD(HOUR, 7, CAST(GETDATE() AS TIME))

    DECLARE @chosenTime AS TIME(0)
    SET @chosenTime = CAST(@pickupTime AS TIME)

    IF(DATEDIFF(MILLISECOND, @pickUpTime, @now) > 0 AND @date = CAST(GETDATE() AS DATE))
    BEGIN
        SET @chosenTime =  DATEADD(MINUTE, 15, CAST(@now AS TIME))
    END


    DECLARE @journeyIds TABLE (
        id NVARCHAR(36),
        busId NVARCHAR(36)
    )
    INSERT INTO @journeyIds
    SELECT Journeys.id, busId
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
        WHERE remainingTickets >= 1
        AND isActive = 1 
    )

    DECLARE @buses TABLE (
        id NVARCHAR(36),
        photoUrl NVARCHAR(MAX),
        partnerId NVARCHAR(36),
        classId NVARCHAR(36),
        [name] NVARCHAR(250),
        price INT
    )
    INSERT INTO @buses
    SELECT Buses.id, photoUrl, partnerId, classId, Buses.name,
        TicketPrices.ticketPrice AS price
    FROM Buses, TicketPrices
    WHERE partnerId = @partnerId
    AND Buses.id IN (
        SELECT busId
        FROM Journeys
        WHERE Journeys.id IN (
            SELECT FilteredJourneys.id
            FROM @journeyIds AS FilteredJourneys,
                @scheduleIds AS FilteredSchedules
            WHERE FilteredJourneys.id = FilteredSchedules.journeyId
        )
    )
    AND TicketPrices.busId = Buses.id
    AND TicketPrices.isActive = 1

    DECLARE @stations TABLE (
        id NVARCHAR(36),
        [description] NTEXT,
        orderNumber INT,
        journeyId NVARCHAR(36)
    )
    INSERT INTO @stations
    SELECT id, [description], orderNumber, journeyId
    FROM JourneyDetails
    WHERE journeyId IN (
        SELECT FilteredJourneys.id
        FROM @journeyIds AS FilteredJourneys, 
            @buses AS FilteredBuses
        WHERE FilteredJourneys.busId = FilteredBuses.id
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
    AND isActive = 1
    AND departureAt >= @chosenTime
    AND remainingTickets >= @numberOfPax

    SELECT ISNULL((
        SELECT *, (
            SELECT FilteredSchedules.id, [date], (
                SELECT ISNULL((
                    SELECT *
                    FROM @options
                    WHERE scheduleId = FilteredSchedules.id
                    ORDER BY departureAt
                    FOR JSON PATH
                ), '[]')
            ) AS options
            FROM @scheduleIds AS FilteredSchedules, 
                @journeyIds AS FilteredJourneys
            WHERE FilteredJourneys.busId = FilteredBuses.id
            AND FilteredSchedules.journeyId = FilteredJourneys.id
            FOR JSON PATH
        ) AS schedules, (
            SELECT * 
            FROM @stations AS FilteredStations
            WHERE FilteredStations.journeyId IN (
                SELECT FilteredJourneys.id
                FROM @journeyIds AS FilteredJourneys
                WHERE FilteredJourneys.busId = FilteredBuses.id
            )
            ORDER BY journeyId, orderNumber
            FOR JSON PATH
        ) AS stations
        FROM @buses AS FilteredBuses
        FOR JSON AUTO
    ), '[]')
END
GO
/****** Object:  StoredProcedure [dbo].[SP_GetScheduleDetailsBySchedule]    Script Date: 7/31/2021 7:48:51 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE   PROCEDURE [dbo].[SP_GetScheduleDetailsBySchedule]
    @scheduleId NVARCHAR(36),
    @pickUpTime TIME(0) = NULL
AS
BEGIN
    DECLARE @schedule TABLE (
        numberOfTickets INT,
        [date] DATE
    )
    INSERT INTO @schedule 
    SELECT numberOfTickets, [date]
    FROM Schedules
    WHERE id = @scheduleId

    IF (@pickUpTime IS NOT NULL)
    BEGIN
        DECLARE @now AS TIME(0)
        SET @now = DATEADD(HOUR, 7, CAST(GETDATE() AS TIME))

        DECLARE @chosenTime AS TIME(0)
        SET @chosenTime =  CAST(@pickUpTime AS TIME(0))
        IF(DATEDIFF(MILLISECOND, @pickUpTime, @now) > 0 AND
            (SELECT [date] FROM @schedule) = CAST(GETDATE() AS DATE))
        BEGIN
            SET @chosenTime = DATEADD(MINUTE, 15, CAST(@now AS TIME(0)))
        END

        SELECT CONVERT(varchar(10), CAST(ScheduleDetails.departureAt AS TIME)) AS departureAt,
            CONVERT(varchar(10), CAST(ScheduleDetails.arrivalAt AS TIME)) AS arrivalAt, 
            remainingTickets, ScheduleDetails.id, isActive, (
                SELECT CASE WHEN remainingTickets = (SELECT numberOfTickets FROM @schedule)
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
        remainingTickets, id, isActive, isCancelled, (
            SELECT CASE WHEN remainingTickets = (SELECT numberOfTickets FROM @schedule)
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
    AND isCancelled = 0
    ORDER BY departureAt
END
GO
/****** Object:  StoredProcedure [dbo].[SP_GetSchedulesByConditions]    Script Date: 7/31/2021 7:48:51 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER OFF
GO
CREATE PROCEDURE [dbo].[SP_GetSchedulesByConditions]
(
    @pickupTime TIME(0),
    @numberOfPax INT,
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
    WHERE CAST(departureAt AS TIME(0)) >= @chosenTime
    AND Schedules.id = ScheduleDetails.scheduleId
    AND ScheduleDetails.isActive = 1
    AND ScheduleDetails.remainingTickets >= @numberOfPax
    GROUP BY Schedules.id, Schedules.journeyId
END
GO
/****** Object:  StoredProcedure [dbo].[SP_GetTicketInformation]    Script Date: 7/31/2021 7:48:51 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER OFF
GO
CREATE PROCEDURE [dbo].[SP_GetTicketInformation]
    @scheduleDetailId NVARCHAR(36)
AS
BEGIN
    DECLARE @scheduleId NVARCHAR(36)
    SET @scheduleId = (
        SELECT Schedules.id
        FROM Schedules, ScheduleDetails
        WHERE ScheduleDetails.id = @scheduleDetailId
        AND Schedules.id = ScheduleDetails.scheduleId
    )

    DECLARE @journeyId NVARCHAR(36)
    SET @journeyId = (
        SELECT Journeys.id
        FROM Journeys, Schedules
        WHERE Schedules.id = @scheduleId
        AND Journeys.id = Schedules.journeyId
    )

    DECLARE @busId NVARCHAR(36)
    SET @busId = (
        SELECT Buses.id
        FROM Buses, Journeys
        WHERE Journeys.id = @journeyId
        AND Buses.id = Journeys.busId
    )

    DECLARE @innerJSON NVARCHAR(MAX)
    SET @innerJSON = (
        SELECT * 
        FROM Buses
        WHERE Buses.id = @busId
        FOR JSON PATH, WITHOUT_ARRAY_WRAPPER
    )

    SELECT ISNULL((
        SELECT Schedules.id as id, Schedules.[date] as [date], Schedules.startTime as departureAt, Schedules.endTime as arrivalAt, Schedules.gap as gap, Schedules.numberOfVehicles as numberOfVehicles, Schedules.numOfJourneys as numOfJourneys,Schedules.numberOfTickets, (
            JSON_QUERY(@innerJSON)
        ) AS bus, (
            SELECT * 
            FROM JourneyDetails
            WHERE JourneyDetails.journeyId = @journeyId
            FOR JSON PATH 
        ) AS stations, (
            SELECT *
            FROM ScheduleDetails
            WHERE ScheduleDetails.id = @scheduleDetailId
            FOR JSON PATH
        ) as details
        FROM Schedules
        WHERE Schedules.id = @scheduleId
        FOR JSON AUTO, WITHOUT_ARRAY_WRAPPER
    ), '[]')
END
GO
/****** Object:  StoredProcedure [dbo].[SP_RegisterBus]    Script Date: 7/31/2021 7:48:51 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER OFF
GO

CREATE PROCEDURE [dbo].[SP_RegisterBus]
(
    @name NVARCHAR(250),
    @guestQuantity INT,
    @photoUrl NVARCHAR(MAX),
    @ticketPrice INT,
    @partnerId NVARCHAR(36),
    @classId NVARCHAR(36)
)
AS
BEGIN
    BEGIN TRY
        BEGIN TRAN
            DECLARE @insertedBus TABLE (
                id NVARCHAR(36)
            )

            INSERT INTO [dbo].[Buses]
            (
                [name], [guestQuantity], [photoUrl], [partnerId], [classId]
            )
            OUTPUT inserted.id INTO @insertedBus
            VALUES
            (
                @name, @guestQuantity, @photoUrl, @partnerId, @classId
            )

            DECLARE @insertedBusId NVARCHAR(36)
            SET @insertedBusId = (SELECT id FROM @insertedBus)

            INSERT INTO [dbo].[TicketPrices]
            (
                [ticketPrice], [busId]
            )
            VALUES
            (
                @ticketPrice, @insertedBusId
            )
            
        IF @@TRANCOUNT > 0
        BEGIN
            COMMIT TRAN
        END

        SELECT Buses.*, ticketPrice 
        FROM Buses, (
            SELECT ticketPrice
            FROM TicketPrices
            WHERE busId = @insertedBusId
            AND isActive = 1
        ) AS ticketPrice
        WHERE Buses.id = @insertedBusId
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
/****** Object:  StoredProcedure [dbo].[SP_RevokeTickets]    Script Date: 7/31/2021 7:48:51 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER OFF
GO
CREATE PROCEDURE [dbo].[SP_RevokeTickets]
    @scheduleDetailId NVARCHAR(36),
    @numberOfTickets INT
AS
BEGIN
    BEGIN TRY
        BEGIN TRAN

        DECLARE @schedule TABLE (
            numberOfTickets INT,
            remainingTickets INT
        )
        INSERT INTO @schedule
        SELECT numberOfTickets, remainingTickets
        FROM ScheduleDetails, Schedules
        WHERE ScheduleDetails.id = @scheduleDetailId
        AND Schedules.id = ScheduleDetails.scheduleId

        IF (@numberOfTickets + (SELECT remainingTickets FROM @schedule) <= 
            (SELECT numberOfTickets FROM @schedule))
        BEGIN
            UPDATE [dbo].[ScheduleDetails]
            SET
                [remainingTickets] = remainingTickets + @numberOfTickets
            WHERE id = @scheduleDetailId
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
/****** Object:  StoredProcedure [dbo].[SP_UnregisterBus]    Script Date: 7/31/2021 7:48:51 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER OFF
GO
CREATE PROCEDURE [dbo].[SP_UnregisterBus]
    @busId NVARCHAR(36)
AS
BEGIN
    DECLARE @canBeUnregistered BIT
    SET @canBeUnregistered = (
        SELECT CASE WHEN NOT EXISTS (
            SELECT *
            FROM Journeys
            WHERE Journeys.busId = @busId
            AND Journeys.isActive = 1
        )
        THEN CAST(1 AS BIT)
        ELSE CAST(0 AS BIT) END
    )

    IF (@canBeUnregistered = 1)
    BEGIN
        UPDATE Buses
        SET isRegistered = 0
        WHERE id = @busId
    END
END
GO
/****** Object:  StoredProcedure [dbo].[SP_UpdateBusInformation]    Script Date: 7/31/2021 7:48:51 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER OFF
GO

CREATE PROCEDURE [dbo].[SP_UpdateBusInformation]
(
    @busId NVARCHAR(36),
    @name NVARCHAR(250) = NULL,
    @guestQuantity INT = NULL,
    @ticketPrice INT = NULL,
    @classId NVARCHAR(36) = NULL,
    @photoUrl NVARCHAR(MAX) = NULL
)
AS
BEGIN
    BEGIN TRY
        UPDATE [dbo].[Buses]
        SET
            [name] = ISNULL(@name, name),
            [guestQuantity] = ISNULL(@guestQuantity, guestQuantity),
            [classId] = ISNULL(@classId, classId),
            [photoUrl] = ISNULL(@photoUrl, photoUrl)
        WHERE id = @busId

        IF (@ticketPrice IS NOT NULL)
        BEGIN
            INSERT INTO [dbo].[TicketPrices]
            (
                [ticketPrice], [busId]
            )
            VALUES
            (
                @ticketPrice, @busId
            )
        END

        SELECT Buses.*, ticketPrice 
        FROM Buses, (
            SELECT ticketPrice
            FROM TicketPrices
            WHERE busId = @busId
            AND isActive = 1
        ) AS ticketPrice
        WHERE Buses.id = @busId
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
