import React, { useState, useRef } from 'react';
import { useHistory } from 'react-router';
import { connect } from 'react-redux';
import queryString from 'query-string';
import convertToDateTimeString from '../../../../utils/convertToDateTimeString';
import convertToDateString from '../../../../utils/convertToDateString';
import FlightTicket from './FlightTicket';

function FlightTicketManagement({ flight }) {
  const history = useHistory();
  const journeys = flight.schedule.journeys;
  const {
    date,
    depPlaceId,
    depDescription,
    depDistrict,
    depCity,
    depCountry,
    desPlaceId,
    desDescription,
    desDistrict,
    desCity,
    desCountry,
    numberOfPax,
    seatType,
  } = queryString.parse(history.location.search);
  const departure =
    `depPlaceId=${depPlaceId}&depDescription=${depDescription}&depDistrict=${depDistrict}` +
    `&depCity=${depCity}&depCountry=${depCountry}`;
  const destination =
    `desPlaceId=${desPlaceId}desDescription=${desDescription}&desDistrict=${desDistrict}` +
    `&desCity=${desCity}&desCountry=${desCountry}`;

  const [openFlightDetails, setOpenFlightDetails] = useState(false);
  const containerFlight = useRef(null);
  const handleOpenFlightDetails = () => {
    setOpenFlightDetails(!openFlightDetails);
  };

  const handleOrderTicket = () => {
    history.push({
      pathname: '/booking/flights',
      search:
        `?date=${date}&numberOfPax=${numberOfPax}` +
        `&${departure}&${destination}&seatType=${seatType}`,
      state: {
        value: {
          scheduleId: flight.schedule.id,
          id: flight.flight.id,
          numberOfPassengers: numberOfPax,
          totalPrice: flight.schedule.price * numberOfPax,
          partnerId: flight.flight.partnerId,
        },
      },
    });
  };

  return (
    <FlightTicket
      partnerPhoto={flight.partner.logoUrl}
      partnerName={flight.partner.name}
      date={date}
      depCity={depCity}
      desCity={desCity}
      departureDate={convertToDateString(
        flight.schedule.journeys[0].departureAt
      )}
      departureAt={convertToDateTimeString(
        flight.schedule.journeys[0].departureAt,
      )}
      arrivalAt={
        journeys.length > 2
          ? convertToDateTimeString(
              flight.schedule.journeys[journeys.length - 1].arrivalAt,
            )
          : convertToDateTimeString(flight.schedule.journeys[0].arrivalAt)
      }
      departure={depDescription}
      destination={desDescription}
      numberOfPassengers={numberOfPax}
      price={flight.schedule.price}
      journeys={journeys}
      openFlightDetails={openFlightDetails}
      containerFlight={containerFlight}
      handleOpenFlightDetails={handleOpenFlightDetails}
      handleOrderTicket={handleOrderTicket}
    />
  );
}

function mapStateToProps(state) {
  return {};
}

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FlightTicketManagement);
