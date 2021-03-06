CREATE DATABASE [Booking_Service_DB]
GO

USE [Booking_Service_DB]
GO
/****** Object:  Table [dbo].[CancellationTickets]    Script Date: 7/31/2021 2:37:34 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[CancellationTickets](
	[id] [nvarchar](36) NOT NULL,
	[oldTicketId] [nvarchar](36) NOT NULL,
	[originalPrice] [decimal](22, 2) NOT NULL,
	[lostPercentage] [int] NOT NULL,
	[refundAmount]  AS (CONVERT([decimal](22,2),round(([originalPrice]-(([originalPrice]*[lostPercentage])*(1.))/(100))/(23000),(2),(1)))) PERSISTED,
	[createdAt] [datetime2](7) NULL,
	[updatedAt] [datetime2](7) NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Contacts]    Script Date: 7/31/2021 2:37:34 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Contacts](
	[id] [nvarchar](36) NOT NULL,
	[contactFullName] [nvarchar](250) NOT NULL,
	[phoneNumber] [nvarchar](15) NOT NULL,
	[email] [nvarchar](320) NOT NULL,
	[createdAt] [datetime2](7) NULL,
	[updatedAt] [datetime2](7) NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
UNIQUE NONCLUSTERED 
(
	[phoneNumber] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ExchangeTickets]    Script Date: 7/31/2021 2:37:34 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ExchangeTickets](
	[id] [nvarchar](36) NOT NULL,
	[oldTicketId] [nvarchar](36) NOT NULL,
	[lostPercentage] [int] NOT NULL,
	[newTicketId] [nvarchar](36) NOT NULL,
	[createdAt] [datetime2](7) NULL,
	[updatedAt] [datetime2](7) NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Tickets]    Script Date: 7/31/2021 2:37:34 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Tickets](
	[id] [nvarchar](36) NOT NULL,
	[scheduleDetailId] [nvarchar](36) NOT NULL,
	[vehicleType] [nvarchar](250) NOT NULL,
	[captureId] [nvarchar](20) NOT NULL,
	[classId] [nvarchar](36) NOT NULL,
	[ticketPrice] [decimal](20, 2) NULL,
	[title] [nvarchar](250) NOT NULL,
	[fullName] [nvarchar](250) NOT NULL,
	[partnerId] [nvarchar](36) NOT NULL,
	[isCancelled] [bit] NOT NULL,
	[canBeManipulated] [bit] NOT NULL,
	[contactId] [nvarchar](36) NULL,
	[createdAt] [datetime2](7) NULL,
	[updatedAt] [datetime2](7) NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[CancellationTickets] ADD  DEFAULT (newid()) FOR [id]
GO
ALTER TABLE [dbo].[CancellationTickets] ADD  DEFAULT (sysdatetime()) FOR [createdAt]
GO
ALTER TABLE [dbo].[CancellationTickets] ADD  DEFAULT (sysdatetime()) FOR [updatedAt]
GO
ALTER TABLE [dbo].[Contacts] ADD  DEFAULT (newid()) FOR [id]
GO
ALTER TABLE [dbo].[Contacts] ADD  DEFAULT (sysdatetime()) FOR [createdAt]
GO
ALTER TABLE [dbo].[Contacts] ADD  DEFAULT (sysdatetime()) FOR [updatedAt]
GO
ALTER TABLE [dbo].[ExchangeTickets] ADD  DEFAULT (newid()) FOR [id]
GO
ALTER TABLE [dbo].[ExchangeTickets] ADD  DEFAULT (sysdatetime()) FOR [createdAt]
GO
ALTER TABLE [dbo].[ExchangeTickets] ADD  DEFAULT (sysdatetime()) FOR [updatedAt]
GO
ALTER TABLE [dbo].[Tickets] ADD  DEFAULT (newid()) FOR [id]
GO
ALTER TABLE [dbo].[Tickets] ADD  DEFAULT ((0)) FOR [isCancelled]
GO
ALTER TABLE [dbo].[Tickets] ADD  DEFAULT ((1)) FOR [canBeManipulated]
GO
ALTER TABLE [dbo].[Tickets] ADD  DEFAULT (sysdatetime()) FOR [createdAt]
GO
ALTER TABLE [dbo].[Tickets] ADD  DEFAULT (sysdatetime()) FOR [updatedAt]
GO
ALTER TABLE [dbo].[CancellationTickets]  WITH CHECK ADD  CONSTRAINT [FK_Ticket_CancellationTicket] FOREIGN KEY([oldTicketId])
REFERENCES [dbo].[Tickets] ([id])
GO
ALTER TABLE [dbo].[CancellationTickets] CHECK CONSTRAINT [FK_Ticket_CancellationTicket]
GO
ALTER TABLE [dbo].[ExchangeTickets]  WITH CHECK ADD  CONSTRAINT [FK_NewTicket_ExchangeTicket] FOREIGN KEY([newTicketId])
REFERENCES [dbo].[Tickets] ([id])
GO
ALTER TABLE [dbo].[ExchangeTickets] CHECK CONSTRAINT [FK_NewTicket_ExchangeTicket]
GO
ALTER TABLE [dbo].[ExchangeTickets]  WITH CHECK ADD  CONSTRAINT [FK_OldTicket_ExchangeTicket] FOREIGN KEY([oldTicketId])
REFERENCES [dbo].[Tickets] ([id])
GO
ALTER TABLE [dbo].[ExchangeTickets] CHECK CONSTRAINT [FK_OldTicket_ExchangeTicket]
GO
ALTER TABLE [dbo].[Tickets]  WITH CHECK ADD  CONSTRAINT [FK_Contacts_Tickets] FOREIGN KEY([contactId])
REFERENCES [dbo].[Contacts] ([id])
GO
ALTER TABLE [dbo].[Tickets] CHECK CONSTRAINT [FK_Contacts_Tickets]
GO
/****** Object:  StoredProcedure [dbo].[SP_CreateCancellationTicket]    Script Date: 7/31/2021 2:37:34 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE   PROCEDURE [dbo].[SP_CreateCancellationTicket]
    @oldTicketId NVARCHAR(36),
    @lostPercentage INT
AS
BEGIN
    BEGIN TRY

        DECLARE @captureId NVARCHAR(20)
        SELECT @captureId = captureId FROM Tickets WHERE id = @oldTicketId 
        DECLARE @originalPrice DECIMAL(20,2) = 
        (
            SELECT ticketPrice 
            FROM Tickets 
            WHERE id = @oldTicketId
        )

        UPDATE Tickets
        SET isCancelled = 1
        WHERE id = @oldTicketId

        INSERT INTO [dbo].[CancellationTickets]
        (
        [oldTicketId],[originalPrice],[lostPercentage]
        )
        OUTPUT INSERTED.*,@captureId AS captureId
        VALUES
        (
        @oldTicketId, @originalPrice, @lostPercentage
        )
    END TRY
    BEGIN CATCH
        SELECT ERROR_MESSAGE() AS ErrorMessage
    END CATCH
END
GO
/****** Object:  StoredProcedure [dbo].[SP_CreateContact]    Script Date: 7/31/2021 2:37:34 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER OFF
GO
CREATE   PROCEDURE [dbo].[SP_CreateContact]
    @contactFullName NVARCHAR(250),
    @phoneNumber NVARCHAR(15),
    @email NVARCHAR(320)
AS
BEGIN
    DECLARE @doesExist BIT = 0
    SET @doesExist = 
    (SELECT CASE 
    WHEN EXISTS 
        (SELECT * 
        FROM Contacts 
        WHERE email = @email 
        AND phoneNumber = @phoneNumber)
    THEN  CAST(1 AS BIT)
    ELSE CAST(0 AS BIT)
    END
    )
    IF(@doesExist = 1)
    BEGIN 
    SELECT * 
    FROM Contacts 
    WHERE email = @email 
    AND phoneNumber = @phoneNumber
    END
    ELSE
    BEGIN 
    INSERT INTO [dbo].[Contacts]
    ( 
     [contactFullName], [phoneNumber], [email]
    )OUTPUT inserted.*
    VALUES
    ( 
     @contactFullName, @phoneNumber, @email
    )
    END
END
GO
/****** Object:  StoredProcedure [dbo].[SP_CreateExchangeTicket]    Script Date: 7/31/2021 2:37:34 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER OFF
GO
CREATE   PROCEDURE [dbo].[SP_CreateExchangeTicket]
    @oldTicketId NVARCHAR(36),
    @lostPercentage INT,
    @newTicketId NVARCHAR(36)
AS
BEGIN
    UPDATE Tickets
    SET isCancelled = 1
    WHERE id = @oldTicketId

    UPDATE Tickets
    SET canBeManipulated = 0
    WHERE id = @newTicketId

    INSERT INTO [dbo].[ExchangeTickets]
    (
    [oldTicketId], [lostPercentage], [newTicketId]
    )
    OUTPUT inserted.*
    VALUES
    (
    @oldTicketId, @lostPercentage, @newTicketId
    )
END
GO
/****** Object:  StoredProcedure [dbo].[SP_CreateTicket]    Script Date: 7/31/2021 2:37:34 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER OFF
GO
CREATE   PROCEDURE [dbo].[SP_CreateTicket]
    @scheduleDetailId NVARCHAR(36),
    @ticketPrice INT,
    @captureId NVARCHAR(20),
    @vehicleType NVARCHAR(250),
    @classId NVARCHAR(36),
    @title NVARCHAR(250),
    @fullName NVARCHAR(250),
    @partnerId NVARCHAR(36),
    @contactId NVARCHAR(36)
AS
BEGIN
    -- Insert rows into table 'Tickets' in schema '[dbo]'
    INSERT INTO [dbo].[Tickets]
    ( -- Columns to insert data into
     [scheduleDetailId], [ticketPrice],[vehicleType],[captureId],[classId],[title],[fullName], [partnerId], [contactId]
    )
    OUTPUT inserted.*
    VALUES
    ( -- First row: values for the columns in the list above
     @scheduleDetailId, @ticketPrice, @vehicleType, @captureId, @classId, @title, @fullName, @partnerId, @contactId
    )
END
GO
/****** Object:  StoredProcedure [dbo].[SP_GetNumberOfTicketsByPartner]    Script Date: 7/31/2021 2:37:34 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER OFF
GO
CREATE   PROCEDURE [dbo].[SP_GetNumberOfTicketsByPartner]
   @partnerId NVARCHAR(36),
   @year INT
AS
BEGIN
    DECLARE @report TABLE (
        [month] INT,
        numberOfSoldTickets DECIMAL(22,2),
        numberOfCancelledTickets DECIMAL(22,2)
    )

    DECLARE @saleReport TABLE (
        [month] INT,
        monthSale DECIMAL(22,2),
        cancellationProfit DECIMAL(22,2),
        cancellationLost DECIMAL(22,2)
    )

    DECLARE @currentMonth INT = MONTH(GETDATE())
    DECLARE @currentYear INT = YEAR(GETDATE())

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
        
        DECLARE @numberOfSoldTickets DECIMAL(22,2)
        SELECT @numberOfSoldTickets = COUNT(id) 
        FROM Tickets
        WHERE partnerId = @partnerId
        AND MONTH(createdAt) = @month
        AND YEAR(createdAt) = @year

        DECLARE @numberOfCancelledTickets DECIMAL(22,2)
        SELECT @numberOfCancelledTickets = COUNT(id) 
        FROM Tickets
        WHERE partnerId = @partnerId
        AND isCancelled = 1
        AND MONTH(createdAt) = @month
        AND YEAR(createdAt) = @year

        DECLARE @monthSale DECIMAL(22,2) = 0  
        SELECT @monthSale = @monthSale + ticketPrice 
        FROM Tickets 
        WHERE partnerId = @partnerId 
        AND MONTH(createdAt) = @month
        AND YEAR(createdAt) = @year
        AND isCancelled = 0

        DECLARE @cancellationProfit DECIMAL(22,2) = 0
        SELECT @cancellationProfit = @cancellationProfit + (ct.originalPrice*ct.lostPercentage/100)
        FROM CancellationTickets ct, Tickets t
        WHERE t.partnerId = @partnerId
        AND t.id = ct.oldTicketId
        AND MONTH(t.createdAt) = @month
        AND YEAR(t.createdAt) = @year

        DECLARE @cancellationLost DECIMAL(22,2) = 0
        SELECT @cancellationLost = @cancellationLost + refundAmount*23000
        FROM CancellationTickets ct, Tickets t
        WHERE t.partnerId = @partnerId
        AND t.id = ct.oldTicketId
        AND MONTH(t.createdAt) = @month
        AND YEAR(t.createdAt) = @year

        INSERT INTO @report
        SELECT @month AS [month], @numberOfSoldTickets AS numberOfSoldTickets, @numberOfCancelledTickets AS numberOfCancelledTickets

        INSERT INTO @saleReport
        SELECT @month AS [month], @monthSale AS monthSale, @cancellationProfit AS cancellationProfit, @cancellationLost AS cancellationLost

        SET @month = @month + 1
    END
    SELECT r.[month],r.numberOfCancelledTickets,r.numberOfSoldTickets,sr.monthSale,sr.cancellationProfit,sr.cancellationLost FROM @report r INNER JOIN @saleReport sr ON r.[month] = sr.[month]
END
GO
/****** Object:  StoredProcedure [dbo].[SP_GetTicketById]    Script Date: 7/31/2021 2:37:34 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER OFF
GO
CREATE PROCEDURE [dbo].[SP_GetTicketById]
    @id NVARCHAR(36)
AS
BEGIN
    SELECT * FROM Tickets WHERE id = @id
END
GO
/****** Object:  StoredProcedure [dbo].[SP_GetTicketsByEmail]    Script Date: 7/31/2021 2:37:34 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER OFF
GO
CREATE   PROCEDURE [dbo].[SP_GetTicketsByEmail]
   @email NVARCHAR(320),
   @limit AS INT,
   @offset AS INT
AS
BEGIN
   SELECT COUNT(t.id)as total,
      (
      SELECT t.id, t.scheduleDetailId, t.ticketPrice, t.vehicleType, t.captureId, t.classId ,t.title, t.fullName, t.partnerId, t.isCancelled,t.canBeManipulated,t.createdAt, t.updatedAt
      FROM Tickets t,Contacts c
      WHERE c.email = @email
      AND c.id = t.contactId
      GROUP BY t.id,t.scheduleDetailId,t.ticketPrice,t.vehicleType,t.captureId,t.classId,t.createdAt, t.title, t.fullName,t.updatedAt,t.partnerId, t.isCancelled,t.canBeManipulated
      ORDER BY t.createdAt DESC
      OFFSET @offset * @limit ROWS
      FETCH NEXT @limit ROWS ONLY
      FOR JSON PATH
      ) AS tickets
      
      FROM Tickets t,Contacts c
      WHERE c.email = @email
      AND c.id = t.contactId
      FOR JSON PATH, WITHOUT_ARRAY_WRAPPER
END
GO
/****** Object:  StoredProcedure [dbo].[SP_GetTicketsByMonth]    Script Date: 7/31/2021 2:37:34 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER OFF
GO
CREATE   PROCEDURE [dbo].[SP_GetTicketsByMonth]
    @month INT,
    @year INT
AS
BEGIN
   SELECT * 
   FROM Tickets 
   WHERE Month(createdAt) = @month 
   AND Year(createdAt) = @year
END
GO
/****** Object:  StoredProcedure [dbo].[SP_GetTicketsByScheduleDetailId]    Script Date: 7/31/2021 2:37:34 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER OFF
GO
CREATE   PROCEDURE [dbo].[SP_GetTicketsByScheduleDetailId]
   @scheduleDetailId NVARCHAR(36)
AS
BEGIN
    SELECT t.id,t.scheduleDetailId,t.ticketPrice,t.vehicleType,t.captureId,t.classId,t.createdAt,t.updatedAt,c.contactFullName,c.email,c.phoneNumber
   FROM Tickets t,Contacts c
   WHERE t.scheduleDetailId = @scheduleDetailId
   AND c.id = t.contactId
   AND t.isCancelled = 0
   AND t.canBeManipulated = 1
   GROUP BY t.id,t.scheduleDetailId,t.ticketPrice,t.vehicleType,t.captureId,t.classId,t.createdAt,t.updatedAt,c.contactFullName,c.email,c.phoneNumber
END
GO
