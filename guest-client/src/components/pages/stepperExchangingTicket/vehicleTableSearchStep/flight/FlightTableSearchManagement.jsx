import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { connect } from 'react-redux';
import { useHistory } from 'react-router';
import FlightTableSearch from './FlightTableSearch';

function FlightTableSearchManagement() {
  const history = useHistory();
  const { register, errors, handleSubmit, control } = useForm();
  const [checked, setChecked] = useState(false);
  const handleChangeChecked = (event) => {
    setChecked(event.target.checked);
  };
  const { partnerId } = history.location.state;
  const [anchorEl, setAnchorEl] = useState(null);
  const handleOpenAnchorEl = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseAnchorEl = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const [valueOfSeatType, setValueOfSeatType] = useState({});
  const handleChangeValueOfSeatType = (value) => {
    setValueOfSeatType(value);
  };

  const onSubmit = (data) => {
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
    if (checked) {
      history.push({
        pathname: '/exchange-ticket/fullSearch/flights',
        search:
          `?&date=${data.date}&isRoundTrip=${checked}&returnDate=${data.return}` +
          `&${departure}&${destination}&seatType=${valueOfSeatType}&numberOfPax=1&partnerId=${partnerId}`,
      });
      return;
    }
    history.push({
      pathname: '/exchange-ticket/fullSearch/flights',
      search: `?&date=${data.date}&${departure}&${destination}&seatType=${valueOfSeatType}&numberOfPax=1&partnerId=${partnerId}`,
    });
  };

  return (
    <FlightTableSearch
      id={id}
      open={open}
      anchorEl={anchorEl}
      handleOpenAnchorEl={handleOpenAnchorEl}
      handleCloseAnchorEl={handleCloseAnchorEl}
      register={register}
      errors={errors}
      control={control}
      onSubmit={handleSubmit(onSubmit)}
      handleChangeValueOfSeatType={handleChangeValueOfSeatType}
      checked={checked}
      handleChangeChecked={handleChangeChecked}
    />
  );
}

function mapStateToProps() {
  return {};
}

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FlightTableSearchManagement);
