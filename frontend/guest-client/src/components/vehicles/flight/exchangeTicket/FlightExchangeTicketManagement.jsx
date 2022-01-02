import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { connect } from 'react-redux';
import queryString from 'query-string';
import axios from 'axios';
import { BASE_API_URL } from '../../../../constants';
import convertToDateTimeString from '../../../../utils/convertToDateTimeString';
import FlightExchangeTicket from './FlightExchangeTicket';
import { toast } from 'react-toastify';

function FlightExchangeTicketManagement({ flight, schedule }) {
  const history = useHistory();
  const journeys = schedule.journeys;
  const [getPrice, setGetPrice] = useState({});
  const [loadingGetFinalPrice, setLoadingGetFinalPrice] = useState(false);
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
  const {
    vehicleType,
    partnerId,
    oldTicketId,
    oldTicketPrice,
    lostPercentage,
    ...getPolicy
  } = JSON.parse(localStorage.getItem('refundTicket'));

  const departure =
    `depPlaceId=${depPlaceId}&depDescription=${depDescription}&depDistrict=${depDistrict}` +
    `&depCity=${depCity}&depCountry=${depCountry}`;
  const destination =
    `desPlaceId=${desPlaceId}desDescription=${desDescription}&desDistrict=${desDistrict}` +
    `&desCity=${desCity}&desCountry=${desCountry}`;

  const [openFlightDetails, setOpenFlightDetails] = useState(false);
  const handleOpenFlightDetails = () => {
    setOpenFlightDetails(!openFlightDetails);
  };

  const [openOrderForm, setOpenOrderForm] = useState(false);
  const handleOpenOrderForm = () => {
    setOpenOrderForm(true);
  };
  const handleCloseOrderForm = () => {
    setOpenOrderForm(false);
  };

  const handleGetFinalPrice = async (data) => {
    setLoadingGetFinalPrice(true);
    try {
      const response = await axios.post(
        `${BASE_API_URL}/booking/exchange/finalPrice`,
        { getPolicy, newTicketPrice: data, oldTicketPrice: oldTicketPrice }
      );
      setGetPrice(response.data);
      setLoadingGetFinalPrice(false);
      handleOpenOrderForm();
    } catch (error) {
      toast.error('Có lỗi xảy ra!');
    }
  };

  const handleOrderTicket = () => {
    history.push({
      pathname: '/exchange-ticket/booking/flights',
      search:
        `?date=${date}&numberOfPax=${numberOfPax}` +
        `&${departure}&${destination}&seatType=${seatType}`,
      state: {
        value: {
          id: flight.id,
          scheduleId: schedule.id,
          partnerId: flight.partnerId,
          oldTicketId: oldTicketId,
          oldTicketPrice: oldTicketPrice,
          finalPrice: getPrice.finalPrice,
          newTicketPrice: getPrice.newTicketPrice,
          refundAmount: getPrice.refundAmount,
        },
      },
    });
  };

  return (
    <FlightExchangeTicket
      loadingGetFinalPrice={loadingGetFinalPrice}
      date={date}
      depCity={depCity}
      desCity={desCity}
      departure={depDescription}
      destination={desDescription}
      numberOfPassengers={numberOfPax}
      name={flight.name}
      partnerPhoto={flight.partner.logoUrl}
      partnerName={flight.partner.name}
      partnerId={flight.partnerId}
      price={schedule.price}
      departureAt={convertToDateTimeString(schedule.departureAt)}
      arrivalAt={
        journeys.length > 1
          ? convertToDateTimeString(
              schedule.journeys[journeys.length - 1].arrivalAt
            )
          : convertToDateTimeString(schedule.journeys[0].arrivalAt)
      }
      journeys={journeys}
      openFlightDetails={openFlightDetails}
      handleOpenFlightDetails={handleOpenFlightDetails}
      handleOrderTicket={handleOrderTicket}
      openOrderForm={openOrderForm}
      handleOpenOrderForm={handleOpenOrderForm}
      handleCloseOrderForm={handleCloseOrderForm}
      handleGetFinalPrice={handleGetFinalPrice}
    />
  );
}

function mapStateToProps(state) {
  return {};
}

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FlightExchangeTicketManagement);
