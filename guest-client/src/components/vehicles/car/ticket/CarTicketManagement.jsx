import React, { useState } from 'react';
import { useHistory } from 'react-router';
import queryString from 'query-string';
import CarTicket from './CarTicket';

export default function CarTicketManagement({ car }) {
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

  const price =
    car.standardPricePerKm[0].standardPricePerKm * (distance / 1000);
  const numberOfCarsAvailable = car.cars.length;

  const [openOrderForm, setOpenOrderForm] = useState(false);
  const handleOpenOrderForm = () => {
    setOpenOrderForm(true);
  };
  const handleCloseOrderForm = () => {
    setOpenOrderForm(false);
  };

  const [numberOfCars, setNumberOfCars] = useState(1);
  const handleIncreaseNumberOfCars = () => {
    if (numberOfCars >= numberOfCarsAvailable) return;
    if (numberOfCars >= 10) return;
    setNumberOfCars(numberOfCars + 1);
  };
  const handleDecreaseNumberOfCars = () => {
    if (numberOfCars > 1) setNumberOfCars(numberOfCars - 1);
  };

  const arrayOfCarId = [];
  car.cars
    .slice(0, numberOfCars)
    .map((value, index) => arrayOfCarId.push({ id: value.id }));

  const schedule = {
    date: date,
    start: pickUpTime,
    travel: parseInt(sec),
    cars: arrayOfCarId,
    details: [
      {
        placeId: depPlaceId,
        description: depDescription,
        district: depDistrict,
        city: depCity,
        country: depCountry,
        orderNumber: 0,
      },
      {
        placeId: desPlaceId,
        description: desDescription,
        district: desDistrict,
        city: desCity,
        country: desCountry,
        orderNumber: 1,
      },
    ],
  };

  const handleOrderTicket = () => {
    history.push({
      pathname: `/booking/cars`,
      search:
        `?date=${date}&pickUpTime=${pickUpTime}&numberOfPax=${numberOfPax}&${departure}` +
        `&${destination}&distance=${distance}&sec=${sec}&seatType=null`,
      state: {
        value: {
          schedule: schedule,
          totalPrice: price * numberOfCars,
          classId: car.classId,
          partnerId: car.partnerId,
          numberOfPax: numberOfPax,
        },
      },
    });
  };

  return (
    <CarTicket
      date={date}
      pickUpTime={pickUpTime}
      depDescription={depDescription}
      desDescription={desDescription}
      name={car.name}
      guestQuantity={car.guestQuantity}
      luggagePayload={car.luggagePayload}
      price={price}
      photoUrl={car.photoUrl}
      partnerId={car.partnerId}
      numberOfCarsAvailable={numberOfCarsAvailable}
      numberOfCars={numberOfCars}
      handleOrderTicket={handleOrderTicket}
      openOrderForm={openOrderForm}
      handleOpenOrderForm={handleOpenOrderForm}
      handleCloseOrderForm={handleCloseOrderForm}
      handleIncreaseNumberOfCars={handleIncreaseNumberOfCars}
      handleDecreaseNumberOfCars={handleDecreaseNumberOfCars}
    />
  );
}
