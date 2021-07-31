import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router';
import queryString from 'query-string';
import AirportTransferSearching from './AirportTransferSearching';
import schedulesActions from '../../../redux/actions/schedulesActions';
import { CARS, BUSES, TRAINS } from '../../../constants';
import carsActions from '../../../redux/actions/carsActions';
import { toast } from 'react-toastify';

function AirportTransferSearchingManagement({
  cars,
  buses,
  trains,
  getSchedules,
  getCars,
}) {
  const history = useHistory();
  const {
    date,
    pickUpTime,
    numberOfPax,
    depDescription,
    depDistrict,
    depCity,
    depCountry,
    desDistrict,
    desCity,
    desCountry,
    sec,
  } = queryString.parse(history.location.search);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function getAirportTransferSchedules() {
      try {
        setLoading(true);
        await getSchedules(
          date,
          pickUpTime,
          numberOfPax,
          depDistrict,
          depCity,
          depCountry,
          desDistrict,
          desCity,
          desCountry,
          BUSES,
        );
        await getSchedules(
          date,
          pickUpTime,
          numberOfPax,
          depDistrict,
          depCity,
          depCountry,
          desDistrict,
          desCity,
          desCountry,
          TRAINS,
        );
        await getCars(
          date,
          pickUpTime,
          depCity,
          depCountry,
          parseInt(sec),
          CARS,
        );
      } catch (error) {
        toast.error('Có lỗi xảy ra!');
      } finally {
        setLoading(false);
      }
    }

    getAirportTransferSchedules();
  }, [
    getCars,
    getSchedules,
    date,
    pickUpTime,
    numberOfPax,
    depDistrict,
    depCity,
    depCountry,
    desDistrict,
    desCity,
    desCountry,
    sec,
  ]);

  const [valueOfTab, setValueOfTab] = useState(false);
  const handleChangeTab = (event, newValue) => {
    setValueOfTab(newValue);
  };

  return (
    <AirportTransferSearching
      tab={valueOfTab}
      day={date}
      time={pickUpTime}
      departure={depDescription}
      cars={cars}
      buses={buses}
      trains={trains}
      loading={loading}
      handleChangeTab={handleChangeTab}
    />
  );
}

function mapStateToProps(state) {
  return {
    cars: state.schedules.cars,
    buses: state.schedules.buses,
    trains: state.schedules.trains,
  };
}

const mapDispatchToProps = {
  getSchedules: schedulesActions.getSchedules,
  getCars: carsActions.getCars,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AirportTransferSearchingManagement);
