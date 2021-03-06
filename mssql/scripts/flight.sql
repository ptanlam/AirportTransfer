CREATE DATABASE [Flight_Service_DB]
GO

USE [Flight_Service_DB]
GO
/****** Object:  Table [dbo].[Flights]    Script Date: 7/31/2021 10:08:23 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Flights](
	[id] [nvarchar](36) NOT NULL,
	[name] [nvarchar](250) NOT NULL,
	[guestQuantity] [int] NOT NULL,
	[partnerId] [nvarchar](36) NOT NULL,
	[photoUrl] [nvarchar](max) NOT NULL,
	[isRegistered] [bit] NOT NULL,
	[createdAt] [datetime2](7) NOT NULL,
	[updatedAt] [datetime2](7) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[JourneyDetails]    Script Date: 7/31/2021 10:08:23 AM ******/
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
/****** Object:  Table [dbo].[Journeys]    Script Date: 7/31/2021 10:08:23 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Journeys](
	[id] [nvarchar](36) NOT NULL,
	[departureAt] [datetime2](7) NOT NULL,
	[arrivalAt] [datetime2](7) NOT NULL,
	[createdAt] [datetime2](7) NOT NULL,
	[updatedAt] [datetime2](7) NOT NULL,
	[scheduleId] [nvarchar](36) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Schedules]    Script Date: 7/31/2021 10:08:23 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Schedules](
	[id] [nvarchar](36) NOT NULL,
	[departureAt] [datetime2](7) NOT NULL,
	[arrivalAt] [datetime2](7) NOT NULL,
	[createdAt] [datetime2](7) NOT NULL,
	[updatedAt] [datetime2](7) NOT NULL,
	[flightId] [nvarchar](36) NOT NULL,
	[isActive] [bit] NULL,
	[isCancelled] [bit] NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Tickets]    Script Date: 7/31/2021 10:08:23 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Tickets](
	[id] [nvarchar](36) NOT NULL,
	[scheduleId] [nvarchar](36) NOT NULL,
	[price] [int] NOT NULL,
	[seatPosition] [nvarchar](20) NOT NULL,
	[seatType] [nvarchar](20) NOT NULL,
	[isBooked] [bit] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[Flights] ADD  DEFAULT (newid()) FOR [id]
GO
ALTER TABLE [dbo].[Flights] ADD  DEFAULT ((1)) FOR [isRegistered]
GO
ALTER TABLE [dbo].[Flights] ADD  DEFAULT (getdate()) FOR [createdAt]
GO
ALTER TABLE [dbo].[Flights] ADD  DEFAULT (getdate()) FOR [updatedAt]
GO
ALTER TABLE [dbo].[JourneyDetails] ADD  DEFAULT (newid()) FOR [id]
GO
ALTER TABLE [dbo].[Journeys] ADD  DEFAULT (newid()) FOR [id]
GO
ALTER TABLE [dbo].[Journeys] ADD  DEFAULT (getdate()) FOR [createdAt]
GO
ALTER TABLE [dbo].[Journeys] ADD  DEFAULT (getdate()) FOR [updatedAt]
GO
ALTER TABLE [dbo].[Schedules] ADD  DEFAULT (newid()) FOR [id]
GO
ALTER TABLE [dbo].[Schedules] ADD  DEFAULT (getdate()) FOR [createdAt]
GO
ALTER TABLE [dbo].[Schedules] ADD  DEFAULT (getdate()) FOR [updatedAt]
GO
ALTER TABLE [dbo].[Schedules] ADD  DEFAULT ((1)) FOR [isActive]
GO
ALTER TABLE [dbo].[Schedules] ADD  DEFAULT ((0)) FOR [isCancelled]
GO
ALTER TABLE [dbo].[Tickets] ADD  DEFAULT (newid()) FOR [id]
GO
ALTER TABLE [dbo].[Tickets] ADD  DEFAULT ((0)) FOR [isBooked]
GO
ALTER TABLE [dbo].[JourneyDetails]  WITH CHECK ADD  CONSTRAINT [FK_Journey_JourneyDetail] FOREIGN KEY([journeyId])
REFERENCES [dbo].[Journeys] ([id])
GO
ALTER TABLE [dbo].[JourneyDetails] CHECK CONSTRAINT [FK_Journey_JourneyDetail]
GO
ALTER TABLE [dbo].[Journeys]  WITH CHECK ADD  CONSTRAINT [FK_Schedule_Journey] FOREIGN KEY([scheduleId])
REFERENCES [dbo].[Schedules] ([id])
GO
ALTER TABLE [dbo].[Journeys] CHECK CONSTRAINT [FK_Schedule_Journey]
GO
ALTER TABLE [dbo].[Schedules]  WITH CHECK ADD  CONSTRAINT [FK_Flight_Schedule] FOREIGN KEY([flightId])
REFERENCES [dbo].[Flights] ([id])
GO
ALTER TABLE [dbo].[Schedules] CHECK CONSTRAINT [FK_Flight_Schedule]
GO
ALTER TABLE [dbo].[Tickets]  WITH CHECK ADD  CONSTRAINT [FK_Schedule_Ticket] FOREIGN KEY([scheduleId])
REFERENCES [dbo].[Schedules] ([id])
GO
ALTER TABLE [dbo].[Tickets] CHECK CONSTRAINT [FK_Schedule_Ticket]
GO
/****** Object:  StoredProcedure [dbo].[SP_ActivateSchedule]    Script Date: 7/31/2021 10:08:23 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER OFF
GO
CREATE PROCEDURE [dbo].[SP_ActivateSchedule]
    @scheduleId NVARCHAR(36)
AS
BEGIN
    UPDATE Schedules
    SET isActive = 1
    WHERE id = @scheduleId

     SELECT Schedules.*, (
        SELECT CASE WHEN ((
            SELECT COUNT(*)
            FROM Tickets
            WHERE isBooked = 0 
            AND scheduleId = @scheduleId) = (
                SELECT guestQuantity
                FROM Flights
                WHERE id = Schedules.flightId
            ) 
            AND isActive = 0
        )
        THEN CAST(1 AS BIT)
        ELSE CAST(0 AS BIT) END
    ) AS isCancellable
    FROM Schedules
    WHERE id = @scheduleId
END
GO
/****** Object:  StoredProcedure [dbo].[SP_AddJourney]    Script Date: 7/31/2021 10:08:23 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER OFF
GO
CREATE PROCEDURE [dbo].[SP_AddJourney]
(
    @scheduleId NVARCHAR(36),
    @departureAt DATETIME2,
    @arrivalAt DATETIME2
)
AS
BEGIN
    INSERT INTO [dbo].[Journeys]
    ( 
     [scheduleId], [departureAt], [arrivalAt]
    )
    OUTPUT inserted.*
    VALUES
    ( 
     @scheduleId, @departureAt, @arrivalAt
    )
END
GO
/****** Object:  StoredProcedure [dbo].[SP_AddJourneyDetails]    Script Date: 7/31/2021 10:08:23 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER OFF
GO
CREATE PROCEDURE [dbo].[SP_AddJourneyDetails]
(
    @orderNumber INT,
    @description NTEXT,
    @placeId NVARCHAR(50),
    @district NVARCHAR(250),
    @city NVARCHAR(250),
    @country NVARCHAR(250),
    @journeyId NVARCHAR(36)
)
AS
BEGIN
    INSERT INTO [dbo].[JourneyDetails]
    ( 
     [orderNumber], [description], [placeId], [district],
     [city], [country], [journeyId]
    )
    OUTPUT inserted.*
    VALUES
    ( 
     @orderNumber, @description, @placeId, @district,
     @city, @country, @journeyId
    )
END
GO
/****** Object:  StoredProcedure [dbo].[SP_AddSchedule]    Script Date: 7/31/2021 10:08:23 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER OFF
GO
CREATE PROCEDURE [dbo].[SP_AddSchedule]
(
    @flightId NVARCHAR(36),
    @departureAt DATETIME2,
    @arrivalAt DATETIME2
)
AS
BEGIN
    INSERT INTO [dbo].[Schedules]
    ( 
     [flightId], [departureAt], [arrivalAt]
    )
    OUTPUT inserted.*
    VALUES
    ( 
     @flightId, @departureAt, @arrivalAt
    )
END
GO
/****** Object:  StoredProcedure [dbo].[SP_AddTickets]    Script Date: 7/31/2021 10:08:23 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER OFF
GO
CREATE PROCEDURE [dbo].[SP_AddTickets]
(
    @scheduleId NVARCHAR(36),
    @price INT,
    @seatPosition NVARCHAR(20),
    @seatType NVARCHAR(20)
)
AS
BEGIN
    INSERT INTO [dbo].[Tickets]
    ( 
     [scheduleId], [price], [seatPosition],
     [seatType]
    )
    OUTPUT inserted.*
    VALUES
    ( 
     @scheduleId, @price, @seatPosition,
     @seatType
    )
END
GO
/****** Object:  StoredProcedure [dbo].[SP_CancelSchedule]    Script Date: 7/31/2021 10:08:23 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER OFF
GO
CREATE PROCEDURE [dbo].[SP_CancelSchedule]
    @scheduleId NVARCHAR(36)
AS
BEGIN
    DECLARE @canBeCancelled BIT
    SET @canBeCancelled = (
        SELECT (
            SELECT CASE WHEN NOT EXISTS ((
                    SELECT *
                    FROM Tickets
                    WHERE isBooked = 1
                    AND scheduleId = @scheduleId
                )
            )
            THEN CAST(1 AS BIT)
            ELSE CAST(0 AS BIT) END
        )
        FROM Schedules
        WHERE id =@scheduleId
        AND isActive = 0
    )

    IF (@canBeCancelled = 1)
    BEGIN
        UPDATE Schedules
        SET isCancelled = 1
        OUTPUT inserted.*
        WHERE id = @scheduleId
    END
END
GO
/****** Object:  StoredProcedure [dbo].[SP_DeactivateSchedule]    Script Date: 7/31/2021 10:08:23 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER OFF
GO
CREATE PROCEDURE [dbo].[SP_DeactivateSchedule]
    @scheduleId NVARCHAR(36)
AS
BEGIN
    UPDATE Schedules
    SET isActive = 0
    WHERE id = @scheduleId

    SELECT Schedules.*, (
        SELECT CASE WHEN ((
                SELECT COUNT(*)
                FROM Tickets
                WHERE isBooked = 0 
                AND scheduleId = @scheduleId
            ) = (
                SELECT guestQuantity
                FROM Flights
                WHERE id = Schedules.flightId
            ) 
                AND isActive = 0
        )
        THEN CAST(1 AS BIT)
        ELSE CAST(0 AS BIT) END
    ) AS isCancellable
    FROM Schedules
    WHERE id = @scheduleId
END
GO
/****** Object:  StoredProcedure [dbo].[SP_GetBookedTicketsBySchedule]    Script Date: 7/31/2021 10:08:23 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER OFF
GO
CREATE PROCEDURE [dbo].[SP_GetBookedTicketsBySchedule]
    @scheduleId NVARCHAR(36)
AS
BEGIN
    SELECT *
    FROM Tickets
    WHERE scheduleId = @scheduleId
    AND isBooked = 1
END
GO
/****** Object:  StoredProcedure [dbo].[SP_GetFlightById]    Script Date: 7/31/2021 10:08:23 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER OFF
GO
CREATE PROCEDURE [dbo].[SP_GetFlightById]
    @flightId NVARCHAR(36)
AS
BEGIN
    SELECT *
    FROM Flights
    WHERE id = @flightId
END
GO
/****** Object:  StoredProcedure [dbo].[SP_GetFlightsByPartner]    Script Date: 7/31/2021 10:08:23 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER OFF
GO
CREATE PROCEDURE [dbo].[SP_GetFlightsByPartner]
(
    @partnerId NVARCHAR(36)
)
AS
BEGIN
    SELECT *
    FROM Flights
    WHERE Flights.partnerId = @partnerId
END
GO
/****** Object:  StoredProcedure [dbo].[SP_GetJourneyDetailsByJourney]    Script Date: 7/31/2021 10:08:23 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER OFF
GO
CREATE PROCEDURE [dbo].[SP_GetJourneyDetailsByJourney]
    @journeyId NVARCHAR(36)
AS
BEGIN
    SELECT *
    FROM JourneyDetails
    WHERE journeyId = @journeyId
    ORDER BY orderNumber
END
GO
/****** Object:  StoredProcedure [dbo].[SP_GetJourneysBySchedule]    Script Date: 7/31/2021 10:08:23 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER OFF
GO
CREATE PROCEDURE [dbo].[SP_GetJourneysBySchedule]
(
    @scheduleId NVARCHAR(36)
)
AS
BEGIN
    SELECT *
    FROM Journeys
    WHERE scheduleId = @scheduleId
    ORDER BY departureAt
END
GO
/****** Object:  StoredProcedure [dbo].[SP_GetRoundTripSchedulesByConditions]    Script Date: 7/31/2021 10:08:23 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER OFF
GO
CREATE PROCEDURE [dbo].[SP_GetRoundTripSchedulesByConditions]
    @departureDate DATETIME2(7),
    @returnDate DATETIME2(7),
    @seatType NVARCHAR(20),
    @depCity NVARCHAR(250),
    @depCountry NVARCHAR(250),
    @desCity NVARCHAR(250),
    @desCountry NVARCHAR(250),
    @numberOfPax INT
AS
BEGIN
    DECLARE @filteredSchedules TABLE (
        remainingTickets INT,
        scheduleId NVARCHAR(36)
    )
    
    INSERT INTO @filteredSchedules (remainingTickets, scheduleId)
    SELECT DISTINCT COUNT(isBooked) as 'remainingTickets', scheduleId 
    FROM Tickets
    WHERE seatType = @seatType
    AND scheduleId IN (
        SELECT id
        FROM Schedules
        WHERE isActive = 1
        AND id IN (
            SELECT Departure.scheduleId
            FROM (
                SELECT *
                FROM Journeys
                WHERE id IN (
                    SELECT journeyId
                    FROM JourneyDetails
                    WHERE JourneyDetails.city = @depCity
                    AND JourneyDetails.country = @depCountry
                    AND orderNumber = 0
                )
                AND CAST(departureAt AS DATE) = @departureDate
            ) AS Departure, (
                SELECT *
                FROM Journeys
                WHERE id IN (
                    SELECT journeyId
                    FROM JourneyDetails
                    WHERE JourneyDetails.city = @desCity
                    AND JourneyDetails.country = @desCountry
                    AND orderNumber = (2* (
                        SELECT COUNT(scheduleId)
                        FROM  Journeys
                        WHERE Journeys.scheduleId = Schedules.id
                    ))- 2                 
                )
                AND CAST(departureAt AS DATE) = @returnDate
            ) AS Destination
            WHERE Departure.scheduleId = Destination.scheduleId
        )
    )
    GROUP BY isBooked, scheduleId
    HAVING isBooked = 0
    SELECT scheduleId
    FROM @filteredSchedules
    WHERE remainingTickets >= @numberOfPax
END
GO
/****** Object:  StoredProcedure [dbo].[SP_GetRoundTripSchedulesByPartnerAndConditions]    Script Date: 7/31/2021 10:08:23 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER OFF
GO
CREATE PROCEDURE [dbo].[SP_GetRoundTripSchedulesByPartnerAndConditions]
    @partnerId NVARCHAR(36),
    @departureDate DATE,
    @returnDate DATE,
    @seatType NVARCHAR(20),
    @depCity NVARCHAR(250),
    @depCountry NVARCHAR(250),
    @desCity NVARCHAR(250),
    @desCountry NVARCHAR(250)
AS
BEGIN
     SELECT id, [name], photoUrl, partnerId, (
        SELECT ISNULL((
            SELECT id, departureAt, arrivalAt, (
                SELECT JourneyDetails.[description], JourneyDetails.orderNumber,
                    CONCAT(Journeys.departureAt, 'Z') departureAt,
                    CONCAT(Journeys.arrivalAt, 'Z') arrivalAt
                FROM Journeys, JourneyDetails
                WHERE Journeys.scheduleId = Schedules.id
                AND JourneyDetails.journeyId = Journeys.id
                ORDER BY orderNumber
                FOR JSON PATH
            ) AS journeys, (
                SELECT price
                FROM Tickets
                WHERE scheduleId = Schedules.id
                AND seatType = @seatType
                AND isBooked = 0
                GROUP BY price
            ) AS price
            FROM Schedules
            WHERE Schedules.flightId = Flights.id
            AND isActive = 1
            AND (
                SELECT COUNT(*)
                FROM Tickets
                WHERE scheduleId = Schedules.id
                AND seatType = @seatType
                AND isBooked = 0
            ) >= 1
            AND id IN (
                SELECT Departure.scheduleId
                FROM (
                    SELECT *
                    FROM Journeys
                    WHERE id IN (
                        SELECT journeyId
                        FROM JourneyDetails
                        WHERE JourneyDetails.city = @depCity
                        AND JourneyDetails.country = @depCountry
                        AND orderNumber = 0
                    )
                    AND CAST(departureAt AS DATE) = @departureDate
                ) AS Departure, (
                    SELECT *
                    FROM Journeys
                    WHERE id IN (
                        SELECT journeyId
                        FROM JourneyDetails
                        WHERE JourneyDetails.city = @desCity
                        AND JourneyDetails.country = @desCountry
                        AND orderNumber = (2 * (
                            SELECT COUNT(scheduleId)
                            FROM  Journeys
                            WHERE Journeys.scheduleId = Schedules.id
                        )) - 2
                    )
                    AND CAST(departureAt AS DATE) = @returnDate
                ) AS Destination
                WHERE Departure.scheduleId = Destination.scheduleId
            )
            FOR JSON PATH
        ), '[]')
    ) AS schedules
    FROM Flights
    WHERE partnerId = @partnerId 
    FOR JSON AUTO
END
GO
/****** Object:  StoredProcedure [dbo].[SP_GetScheduleById]    Script Date: 7/31/2021 10:08:23 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER OFF
GO
CREATE PROCEDURE [dbo].[SP_GetScheduleById]
    @scheduleId NVARCHAR(36)
AS
BEGIN
    SELECT *
    FROM Schedules
    WHERE id = @scheduleId
END
GO
/****** Object:  StoredProcedure [dbo].[SP_GetSchedulesByConditions]    Script Date: 7/31/2021 10:08:23 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER OFF
GO
CREATE PROCEDURE [dbo].[SP_GetSchedulesByConditions]
    @date DATE,
    @seatType NVARCHAR(20),
    @depCity NVARCHAR(250),
    @depCountry NVARCHAR(250),
    @desCity NVARCHAR(250),
    @desCountry NVARCHAR(250),
    @numberOfPax INT
AS
BEGIN
    DECLARE @filteredSchedules TABLE (
        remainingTickets INT,
        scheduleId NVARCHAR(36)
    )

    INSERT INTO @filteredSchedules (remainingTickets, scheduleId)
    SELECT DISTINCT COUNT(isBooked) as 'remainingTickets', scheduleId 
    FROM Tickets
    WHERE seatType = @seatType
    AND scheduleId IN (
        SELECT id
        FROM Schedules
        WHERE CAST(departureAt AS DATE) = @date
        AND isActive = 1
        AND id IN (
            SELECT Departure.scheduleId
            FROM (
                SELECT *
                FROM Journeys
                WHERE id IN (
                    SELECT journeyId
                    FROM JourneyDetails
                    WHERE JourneyDetails.city = @depCity
                    AND JourneyDetails.country = @depCountry
                    AND orderNumber = 0
                )
            ) AS Departure, (
                SELECT *
                FROM Journeys
                WHERE id IN (
                    SELECT journeyId
                    FROM JourneyDetails
                    WHERE JourneyDetails.city = @desCity
                    AND JourneyDetails.country = @desCountry
                    AND orderNumber = (2 * (
                        SELECT COUNT(scheduleId)
                        FROM  Journeys
                        WHERE Journeys.scheduleId = Schedules.id
                    )) - 1
                )
            ) AS Destination
            WHERE Departure.scheduleId = Destination.scheduleId
        )
    )
    GROUP BY isBooked, scheduleId
    HAVING isBooked = 0

    SELECT scheduleId
    FROM @filteredSchedules
    WHERE remainingTickets >= @numberOfPax
END
GO
/****** Object:  StoredProcedure [dbo].[SP_GetSchedulesByFlightAndDate]    Script Date: 7/31/2021 10:08:23 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER OFF
GO
CREATE PROCEDURE [dbo].[SP_GetSchedulesByFlightAndDate]
(
    @flightId NVARCHAR(36),
    @date DATETIME2
)
AS
BEGIN
    SELECT Schedules.*, (
        SELECT CASE WHEN NOT EXISTS((
            SELECT *
            FROM Tickets
            WHERE isBooked = 1 
            AND scheduleId = Schedules.id
        ))
        THEN CAST(1 AS BIT)
        ELSE CAST(0 AS BIT) END
    ) AS isCancellable
    FROM Schedules
    WHERE flightId = @flightId
    AND CONVERT(char(10), departureAt, 126) = CONVERT(char(10), @date, 126)
    AND isCancelled = 0
    ORDER BY departureAt
END
GO
/****** Object:  StoredProcedure [dbo].[SP_GetSchedulesByPartnerAndConditions]    Script Date: 7/31/2021 10:08:23 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER OFF
GO
CREATE PROCEDURE [dbo].[SP_GetSchedulesByPartnerAndConditions]
    @partnerId NVARCHAR(36),
    @date DATE,
    @seatType NVARCHAR(20),
    @depCity NVARCHAR(250),
    @depCountry NVARCHAR(250),
    @desCity NVARCHAR(250),
    @desCountry NVARCHAR(250)
AS
BEGIN
    SELECT id, [name], photoUrl, partnerId, (
        SELECT ISNULL((
            SELECT id, departureAt, arrivalAt, (
                SELECT JourneyDetails.[description], JourneyDetails.orderNumber,
                    CONCAT(Journeys.departureAt, 'Z') departureAt,
                    CONCAT(Journeys.arrivalAt, 'Z') arrivalAt
                FROM Journeys, JourneyDetails
                WHERE Journeys.scheduleId = Schedules.id
                AND JourneyDetails.journeyId = Journeys.id
                ORDER BY orderNumber
                FOR JSON PATH
            ) AS journeys, (
                SELECT price
                FROM Tickets
                WHERE scheduleId = Schedules.id
                AND seatType = @seatType
                AND isBooked = 0
                GROUP BY price
            ) AS price
            FROM Schedules
            WHERE Schedules.flightId = Flights.id
            AND CAST(departureAt AS DATE) = @date
            AND isActive = 1
            AND (
                SELECT COUNT(*)
                FROM Tickets
                WHERE scheduleId = Schedules.id
                AND seatType = @seatType
                AND isBooked = 0
            ) >= 1
            AND id IN (
                SELECT Departure.scheduleId
                FROM (
                    SELECT *
                    FROM Journeys
                    WHERE id IN (
                        SELECT journeyId
                        FROM JourneyDetails
                        WHERE JourneyDetails.city = @depCity
                        AND JourneyDetails.country = @depCountry
                        AND orderNumber = 0
                    )
                ) AS Departure, (
                    SELECT *
                    FROM Journeys
                    WHERE id IN (
                        SELECT journeyId
                        FROM JourneyDetails
                        WHERE JourneyDetails.city = @desCity
                        AND JourneyDetails.country = @desCountry
                        AND orderNumber = (2 * (
                            SELECT COUNT(scheduleId)
                            FROM  Journeys
                            WHERE Journeys.scheduleId = Schedules.id
                        )) - 1
                    )
                ) AS Destination
                WHERE Departure.scheduleId = Destination.scheduleId
            )
            FOR JSON PATH
        ), '[]')
    ) AS schedules
    FROM Flights
    WHERE partnerId = @partnerId 
    FOR JSON AUTO
END
GO
/****** Object:  StoredProcedure [dbo].[SP_GetTicketFullInformation]    Script Date: 7/31/2021 10:08:23 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER OFF
GO

CREATE PROCEDURE [dbo].[SP_GetTicketFullInformation]
    @ticketId NVARCHAR(36)
AS
BEGIN
    DECLARE @scheduleId NVARCHAR(36)
    SET @scheduleId = (
        SELECT Schedules.id
        FROM Schedules, Tickets
        WHERE Tickets.id = @ticketId
        AND Tickets.scheduleId = Schedules.id
    )

    DECLARE @flightId NVARCHAR(36)
    SET @flightId = (
        SELECT Flights.id
        FROM Schedules, Flights
        WHERE Schedules.id = @scheduleId
        AND Flights.id = Schedules.flightId 
    )

    DECLARE @flightJSON NVARCHAR(MAX)
    SET @flightJSON = (
        SELECT * 
        FROM Flights
        WHERE Flights.id = @flightId
        FOR JSON PATH, WITHOUT_ARRAY_WRAPPER
    )

    DECLARE @ticketJSON NVARCHAR(MAX)
    SET @ticketJSON = (
        SELECT *
        FROM Tickets
        WHERE Tickets.id = @ticketId
        FOR JSON PATH, WITHOUT_ARRAY_WRAPPER
    )

    SELECT ISNULL((
        SELECT *, (
            JSON_QUERY(@flightJSON)
        ) AS flight, (
            SELECT JourneyDetails.*, Journeys.departureAt, 
                Journeys.arrivalAt
            FROM JourneyDetails, Journeys
            WHERE JourneyDetails.journeyId IN (
                SELECT Journeys.id
                FROM Schedules, Journeys
                WHERE Schedules.id = @scheduleId
                AND Journeys.scheduleId = Schedules.id
            )
            AND Journeys.id = JourneyDetails.journeyId
            ORDER BY JourneyDetails.orderNumber
            FOR JSON PATH 
        ) AS stations, (
            JSON_QUERY(@ticketJSON)
        ) as details
        FROM Schedules
        WHERE Schedules.id = @scheduleId
        FOR JSON AUTO, WITHOUT_ARRAY_WRAPPER
    ), '[]')
END
GO
/****** Object:  StoredProcedure [dbo].[SP_GetTicketPriceByScheduleAndSeatType]    Script Date: 7/31/2021 10:08:23 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER OFF
GO
CREATE PROCEDURE [dbo].[SP_GetTicketPriceByScheduleAndSeatType]
    @scheduleId NVARCHAR(36),
    @seatType NVARCHAR(20)
AS
BEGIN
    SELECT price
    FROM Tickets
    WHERE scheduleId = @scheduleId
    AND seatType = @seatType
    GROUP BY price
END
GO
/****** Object:  StoredProcedure [dbo].[SP_GetTicketsBySchedule]    Script Date: 7/31/2021 10:08:23 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER OFF
GO
CREATE PROCEDURE [dbo].[SP_GetTicketsBySchedule]
(
    @scheduleId NVARCHAR(36)
)
AS
BEGIN
   SELECT *
   FROM Tickets
   WHERE scheduleId = @scheduleId
   ORDER BY Tickets.seatPosition
END
GO
/****** Object:  StoredProcedure [dbo].[SP_GetTicketsForBooking]    Script Date: 7/31/2021 10:08:23 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER OFF
GO
CREATE PROCEDURE [dbo].[SP_GetTicketsForBooking] 
(
    @scheduleId NVARCHAR(36),
    @seatType NVARCHAR(20),
    @numberOfTickets INT
)
AS
BEGIN
    BEGIN TRY
        BEGIN TRAN
        DECLARE @numberOfRemainingTickets INT
        SET @numberOfRemainingTickets = (
            SELECT COUNT(*)
            FROM Tickets
            WHERE scheduleId = @scheduleId
            AND seatType = @seatType
            AND isBooked = 0
        )

        IF (@numberOfRemainingTickets >= @numberOfTickets)
        BEGIN
            DECLARE @bookedTickets AS TABLE (
                id NVARCHAR(36),
                price INT,
                seatPosition NVARCHAR(20),
                seatType NVARCHAR(20)
            )
            UPDATE Tickets
            SET [isBooked] = 1
            OUTPUT inserted.id, inserted.price, 
                inserted.seatPosition, inserted.seatType
                INTO @bookedTickets
            WHERE id IN (
                SELECT TOP (@numberOfTickets) id
                FROM Tickets
                WHERE scheduleId = @scheduleId
                AND seatType = @seatType
                AND isBooked = 0 
            )

            SELECT * FROM @bookedTickets
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
/****** Object:  StoredProcedure [dbo].[SP_RegisterFlight]    Script Date: 7/31/2021 10:08:23 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER OFF
GO

CREATE PROCEDURE [dbo].[SP_RegisterFlight]
(
    @name NVARCHAR(250),
    @guestQuantity INT,
    @partnerId NVARCHAR(36),
    @photoUrl NVARCHAR(MAX)
)
AS
BEGIN
    INSERT INTO [dbo].[Flights]
    ( -- Columns to insert data into
     [name], [guestQuantity], [partnerId], [photoUrl]
    )
    OUTPUT inserted.*
    VALUES
    (
     @name, @guestQuantity, @partnerId, @photoUrl
    )
END
GO
/****** Object:  StoredProcedure [dbo].[SP_RevokeTicket]    Script Date: 7/31/2021 10:08:23 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER OFF
GO
CREATE PROCEDURE [dbo].[SP_RevokeTicket]
    @ticketId NVARCHAR(36)
AS
BEGIN
    BEGIN TRY
        BEGIN TRAN
        DECLARE @isBooked BIT
        SET @isBooked = (
            SELECT isBooked
            FROM Tickets
            WHERE id = @ticketId
        )
        IF (@isBooked = 1)
        BEGIN
            UPDATE Tickets
            SET isBooked = 0
            OUTPUT inserted.*
            WHERE id = @ticketId
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
/****** Object:  StoredProcedure [dbo].[SP_UpdateFlight]    Script Date: 7/31/2021 10:08:23 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER OFF
GO

CREATE PROCEDURE [dbo].[SP_UpdateFlight]
    @flightId NVARCHAR(36),
    @name NVARCHAR(250) = NULL,
    @guestQuantity INT = NULL,
    @photoUrl NVARCHAR(MAX) = NULL
AS
BEGIN
    DECLARE @updatedFlight TABLE (
        [id] NVARCHAR(36)
    )

    UPDATE [dbo].[Flights]
    SET
        [name] = ISNULL(@name, name),
        [guestQuantity] = ISNULL(@guestQuantity, guestQuantity),
        [photoUrl] = ISNULL(@photoUrl, photoUrl)
    OUTPUT inserted.id INTO @updatedFlight
    WHERE id = @flightId

    SELECT * 
    FROM Flights
    WHERE Flights.id = (SELECT id FROM @updatedFlight)
END
GO
