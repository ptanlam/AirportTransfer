import React from 'react';
import { useForm } from 'react-hook-form';
import { connect } from 'react-redux';
import { useHistory } from 'react-router';
import VehiclesTableSearch from './VehiclesTableSearch';

function VehiclesTableSearchManagement() {
  const { register, errors, handleSubmit, control } = useForm();
  const history = useHistory();
  const { partnerId, vehicleType } = history.location.state;

  const service = new window.google.maps.DistanceMatrixService();

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
        const sec = response.rows[0].elements[0].duration.value;
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
          pathname: `/exchange-ticket/fullSearch/${vehicleType}`,
          search:
            `?date=${date}&pickUpTime=${time}&numberOfPax=1&${departure}` +
            `&${destination}&distance=${distance}&sec=${sec}&partnerId=${partnerId}`,
        });
      }
    );
  };

  return (
    <VehiclesTableSearch
      register={register}
      errors={errors}
      control={control}
      onSubmit={handleSubmit(onSubmit)}
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
)(VehiclesTableSearchManagement);
