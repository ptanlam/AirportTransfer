import React, { useState } from 'react';
import { useHistory } from 'react-router';
import queryString from 'query-string';
import BusTicket from './BusTicket';

export default function BusTicketManagement({ bus }) {
  const history = useHistory();
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

  const departure =
    `depDescription=${depDescription}&depDistrict=${depDistrict}` +
    `&depCity=${depCity}&depCountry=${depCountry}`;
  const destination =
    `desDescription=${desDescription}&desDistrict=${desDistrict}` +
    `&desCity=${desCity}&desCountry=${desCountry}`;

  const price = bus.bus.ticketPrice;
  const totalPrice = price * numberOfPax;

  const [idOfDepartureAt, setIdOfDepartureAt] = useState('');
  const handleChangeIdOfDepartureAt = (event) => {
    setIdOfDepartureAt(event.target.value);
  };

  const [openTimeSchedules, setOpenTimeSchedules] = useState(false);
  const handleOpenTimeSchedules = () => {
    setOpenTimeSchedules(!openTimeSchedules);
  };
  const handleCloseTimeSchedules = () => {
    setOpenTimeSchedules(false);
  };

  const [openOrderForm, setOpenOrderForm] = useState(false);
  const handleOpenOrderForm = () => {
    setOpenOrderForm(!openOrderForm);
  };
  const handleCloseOrderForm = () => {
    setOpenOrderForm(false);
  };

  const handleOrderTicket = () => {
    history.push({
      pathname: '/booking/buses',
      search:
        `?date=${date}&pickUpTime=${
          bus.options?.[
            bus.options?.findIndex((option) => option.id === idOfDepartureAt)
          ]?.departureAt
        }&numberOfPax=${numberOfPax}` +
        `&${departure}&${destination}&distance=${distance}&sec=${sec}&seatType=''`,
      state: {
        value: {
          scheduleId: idOfDepartureAt,
          id: bus.bus.id,
          totalPrice: totalPrice,
          classId: bus.bus.classId,
          partnerId: bus.vehicleClass.partnerId,
          numberOfPax: numberOfPax,
        },
      },
    });
  };

  return (
    <BusTicket
      date={date}
      name={bus.bus.name}
      options={bus.options}
      stations={bus.stations}
      photoUrl={bus.bus.photoUrl}
      price={bus.bus.ticketPrice}
      totalPrice={totalPrice}
      partnerLogo={bus.partner.logoUrl}
      rank={bus.vehicleClass.name}
      handleOrderTicket={handleOrderTicket}
      numberOfPassengers={numberOfPax}
      idOfDepartureAt={idOfDepartureAt}
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
