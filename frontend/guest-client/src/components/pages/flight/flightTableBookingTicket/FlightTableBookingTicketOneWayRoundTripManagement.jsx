import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { connect } from 'react-redux';
import { useHistory } from 'react-router';
import FlightTableBookingTicketOneWayRoundTrip from './FlightTableBookingTicketOneWayRoundTrip';

function FlightTableBookingTicketOneWayRoundTripManagement() {
  const history = useHistory();
  const { register, errors, handleSubmit, control } = useForm();
  const [checked, setChecked] = useState(false);

  const handleChangeChecked = (event) => {
    setChecked(event.target.checked);
  };
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
  const [numberOfGuests, setNumberOfGuests] = useState([1, 1, 1]);
  const [totalGuests, setTotalGuests] = useState();

  useEffect(() => {
    setTotalGuests(numberOfGuests.reduce((acc, cur) => acc + cur));
    return () => {};
  }, [numberOfGuests]);

  const handleIncreaseNumberOfGuests = (typeOfGuest) => {
    if (typeOfGuest === 'babies') {
      if (numberOfGuests[2] >= numberOfGuests[0]) return;
      if (numberOfGuests[2] >= 4) return;
      setNumberOfGuests([
        numberOfGuests[0],
        numberOfGuests[1],
        numberOfGuests[2] + 1,
      ]);
    } else {
      if (numberOfGuests[0] + numberOfGuests[1] >= 7) return;
      switch (typeOfGuest) {
        case 'adults':
          setNumberOfGuests([
            numberOfGuests[0] + 1,
            numberOfGuests[1],
            numberOfGuests[2],
          ]);
          break;
        case 'children':
          setNumberOfGuests([
            numberOfGuests[0],
            numberOfGuests[1] + 1,
            numberOfGuests[2],
          ]);
          break;
        default:
          break;
      }
    }
  };
  const handleDecreaseNumberOfGuests = (typeOfGuest) => {
    if (numberOfGuests[0] < 1) return;

    switch (typeOfGuest) {
      case 'adults':
        if (numberOfGuests[0] <= numberOfGuests[2]) return;
        setNumberOfGuests([
          numberOfGuests[0] - 1,
          numberOfGuests[1],
          numberOfGuests[2],
        ]);
        break;
      case 'children':
        if (numberOfGuests[1] < 1) return;
        setNumberOfGuests([
          numberOfGuests[0],
          numberOfGuests[1] - 1,
          numberOfGuests[2],
        ]);
        break;
      case 'babies':
        if (numberOfGuests[2] < 1) return;
        setNumberOfGuests([
          numberOfGuests[0],
          numberOfGuests[1],
          numberOfGuests[2] - 1,
        ]);
        break;

      default:
        break;
    }
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
        pathname: '/flight/fullSearch',
        search:
          `?&date=${data.date}&isRoundTrip=${checked}&returnDate=${data.return}` +
          `&${departure}&${destination}&seatType=${valueOfSeatType}&numberOfPax=${totalGuests}`,
      });
      return;
    }
    history.push({
      pathname: '/flight/fullSearch',
      search: `?&date=${data.date}&${departure}&${destination}&seatType=${valueOfSeatType}&numberOfPax=${totalGuests}`,
    });
  };

  return (
    <FlightTableBookingTicketOneWayRoundTrip
      checked={checked}
      handleChangeChecked={handleChangeChecked}
      id={id}
      open={open}
      anchorEl={anchorEl}
      handleOpenAnchorEl={handleOpenAnchorEl}
      handleCloseAnchorEl={handleCloseAnchorEl}
      register={register}
      errors={errors}
      control={control}
      onSubmit={handleSubmit(onSubmit)}
      valueOfSeatType={valueOfSeatType}
      handleChangeValueOfSeatType={handleChangeValueOfSeatType}
      numberOfGuests={numberOfGuests}
      handleIncreaseNumberOfGuests={handleIncreaseNumberOfGuests}
      handleDecreaseNumberOfGuests={handleDecreaseNumberOfGuests}
    />
  );
}

function mapStateToProps() {
  return {};
}

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FlightTableBookingTicketOneWayRoundTripManagement);
