import React, { useState } from 'react';
import { useHistory } from 'react-router';
import queryString from 'query-string';
import TrainExchangeTicket from './TrainExchangeTicket';
import axios from 'axios';
import { BASE_API_URL } from '../../../../constants';

export default function BusExchangeTicketManagement({ train }) {
  const history = useHistory();
  const [loadingGetFinalPrice, setLoadingGetFinalPrice] = useState(false);
  const [getPrice, setGetPrice] = useState({});
  const {
    date,
    numberOfPax,
    depDescription,
    depDistrict,
    depCity,
    depCountry,
    desDescription,
    desDistrict,
    desCity,
    desCountry,
    distance,
    sec,
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
    `depDescription=${depDescription}&depDistrict=${depDistrict}` +
    `&depCity=${depCity}&depCountry=${depCountry}`;
  const destination =
    `desDescription=${desDescription}&desDistrict=${desDistrict}` +
    `&desCity=${desCity}&desCountry=${desCountry}`;

  const totalPrice = train.price * numberOfPax;

  const [idOfDepartureAt, setIdOfDepartureAt] = useState('');
  const handleChangeIdOfDepartureAt = (event) => {
    setIdOfDepartureAt(event.target.value);
  };

  const [openTimeSchedules, setOpenTimeSchedules] = useState(false);
  const handleOpenTimeSchedules = () => {
    setOpenTimeSchedules(true);
  };
  const handleCloseTimeSchedules = () => {
    setOpenTimeSchedules(false);
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
      console.log(error.message);
    }
  };

  const handleOrderTicket = () => {
    history.push({
      pathname: '/exchange-ticket/booking/trains',
      search:
        `?date=${date}&pickUpTime=${
          train.schedules[0].options?.[
            train.schedules[0].options?.findIndex(
              (option) => option.id === idOfDepartureAt
            )
          ]?.departureAt
        }&numberOfPax=${numberOfPax}` +
        `&${departure}&${destination}&distance=${distance}&sec=${sec}&seatType=''`,
      state: {
        value: {
          scheduleId: idOfDepartureAt,
          id: train.id,
          classId: train.classId,
          oldTicketPrice: oldTicketPrice,
          finalPrice: getPrice.finalPrice,
          newTicketPrice: getPrice.newTicketPrice,
          refundAmount: getPrice.refundAmount,
        },
      },
    });
  };

  return (
    <TrainExchangeTicket
      loadingGetFinalPrice={loadingGetFinalPrice}
      date={train.date}
      name={train.name}
      price={train.price}
      photoUrl={train.photoUrl}
      options={train.schedules[0].options}
      stations={train.stations}
      totalPrice={totalPrice}
      handleOrderTicket={handleOrderTicket}
      numberOfPassengers={numberOfPax}
      idOfDepartureAt={idOfDepartureAt}
      handleGetFinalPrice={handleGetFinalPrice}
      openOrderForm={openOrderForm}
      handleOpenOrderForm={handleOpenOrderForm}
      handleCloseOrderForm={handleCloseOrderForm}
      openTimeSchedules={openTimeSchedules}
      handleOpenTimeSchedules={handleOpenTimeSchedules}
      handleCloseTimeSchedules={handleCloseTimeSchedules}
      handleChangeIdOfDepartureAt={handleChangeIdOfDepartureAt}
    />
  );
}
