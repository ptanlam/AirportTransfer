import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { connect } from 'react-redux';
import { useHistory } from 'react-router';
import AirportTransferTableBookingRoute from './AirportTransferTableBookingRoute';

function AirportTransferTableBookingRouteManagement() {
  const { register, errors, handleSubmit, control } = useForm();
  const history = useHistory();

  const service = new window.google.maps.DistanceMatrixService();

  const [numberOfGuests, setNumberOfGuests] = useState(1);
  const handleIncreaseNumberOfGuests = () => {
    if (numberOfGuests >= 10) return;
    setNumberOfGuests(numberOfGuests + 1);
  };
  const handleDecreaseNumberOfGuests = () => {
    if (numberOfGuests <= 1) return;
    setNumberOfGuests(numberOfGuests - 1);
  };

  const onSubmit = (data) => {
    const { date, time, departure, destination } = data;
    service.getDistanceMatrix(
      {
        origins: [departure.description],
        destinations: [destination.description],
        travelMode: 'DRIVING',
      },
      (response) => {
        const distance = response.rows[0].elements[0].distance.value;
        const sec = response?.rows[0]?.elements[0]?.duration?.value || 1217;
        const {
          placeId: depPlaceId,
          description: depDescription,
          district: depDistrict,
          city: depCity,
          country: depCountry,
        } = data.departure;
        const {
          placeId: desPlaceId,
          description: desDescription,
          district: desDistrict,
          city: desCity,
          country: desCountry,
        } = data.destination;
        const departure =
          `depPlaceId=${depPlaceId}&depDescription=${depDescription}&depDistrict=${depDistrict}` +
          `&depCity=${depCity}&depCountry=${depCountry}`;
        const destination =
          `desPlaceId=${desPlaceId}&desDescription=${desDescription}&desDistrict=${desDistrict}` +
          `&desCity=${desCity}&desCountry=${desCountry}`;
        history.push({
          pathname: '/airport-transfer/fullSearch',
          search:
            `?date=${date}&pickUpTime=${time}&numberOfPax=${numberOfGuests}&${departure}` +
            `&${destination}&distance=${distance}&sec=${sec}&seatType=''`,
        });
      },
    );
  };

  return (
    <AirportTransferTableBookingRoute
      register={register}
      errors={errors}
      control={control}
      onSubmit={handleSubmit(onSubmit)}
      numberOfGuests={numberOfGuests}
      handleIncreaseNumberOfGuests={handleIncreaseNumberOfGuests}
      handleDecreaseNumberOfGuests={handleDecreaseNumberOfGuests}
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
)(AirportTransferTableBookingRouteManagement);
