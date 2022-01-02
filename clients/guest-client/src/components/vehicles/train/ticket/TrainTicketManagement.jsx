import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { connect } from 'react-redux';
import queryString from 'query-string';
import TrainTicket from './TrainTicket';

function TrainTicketManagement({ train }) {
  const history = useHistory();

  const {
    date,
    pickUpTime,
    numberOfPax,
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
    distance,
    sec,
  } = queryString.parse(history.location.search);

  const departure =
    `depPlaceId=${depPlaceId}&depDescription=${depDescription}&depDistrict=${depDistrict}` +
    `&depCity=${depCity}&depCountry=${depCountry}`;
  const destination =
    `desPlaceId=${desPlaceId}&desDescription=${desDescription}&desDistrict=${desDistrict}` +
    `&desCity=${desCity}&desCountry=${desCountry}`;

  const totalPrice = train.train.ticketPrice * numberOfPax;

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
      pathname: `/booking/trains`,
      search:
        `?date=${date}&pickUpTime=${
          train.options?.[
            train.options?.findIndex((option) => option.id === idOfDepartureAt)
          ]?.departureAt
        }&numberOfPax=${numberOfPax}` +
        `&${departure}&${destination}&distance=${distance}&sec=${sec}&seatType=`,
      state: {
        value: {
          scheduleId: idOfDepartureAt,
          id: train.train.id,
          totalPrice: totalPrice,
          classId: train.train.classId,
          partnerId: train.vehicleClass.partnerId,
          numberOfPax: numberOfPax,
        },
      },
    });
  };

  return (
    <TrainTicket
      date={date}
      pickUpTime={pickUpTime}
      departure={departure}
      destination={destination}
      history={history}
      name={train.train.name}
      options={train.options}
      stations={train.stations}
      photoUrl={train.train.photoUrl}
      price={train.train.ticketPrice}
      totalPrice={totalPrice}
      numberOfPassengers={numberOfPax}
      handleOrderTicket={handleOrderTicket}
      openTimeSchedules={openTimeSchedules}
      openOrderForm={openOrderForm}
      idOfDepartureAt={idOfDepartureAt}
      handleOpenOrderForm={handleOpenOrderForm}
      handleCloseOrderForm={handleCloseOrderForm}
      handleOpenTimeSchedules={handleOpenTimeSchedules}
      handleCloseTimeSchedules={handleCloseTimeSchedules}
      handleChangeIdOfDepartureAt={handleChangeIdOfDepartureAt}
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
)(TrainTicketManagement);
