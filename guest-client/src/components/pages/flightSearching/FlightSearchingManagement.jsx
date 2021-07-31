import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router';
import queryString from 'query-string';
import { FLIGHTS } from '../../../constants';
import FlightSearching from './FlightSearching';
import flightsActions from '../../../redux/actions/flightsActions';
import { toast } from 'react-toastify';

function FlightSearchingManagement({
  flights,
  getFlightsByCondition,
  getFlightsByConditionHasReturnDate,
}) {
  const history = useHistory();
  const {
    date,
    depDescription,
    depCity,
    depCountry,
    desDescription,
    desCity,
    desCountry,
    seatType,
    numberOfPax,
    isRoundTrip,
    returnDate,
  } = queryString.parse(history.location.search);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let unmounted = false;
    async function fetchFlights() {
      try {
        setLoading(true);
        if (isRoundTrip) {
          await getFlightsByConditionHasReturnDate(
            date,
            depCity,
            depCountry,
            desCity,
            desCountry,
            seatType,
            numberOfPax,
            FLIGHTS,
            isRoundTrip,
            returnDate,
          );
        } else {
          await getFlightsByCondition(
            date,
            depCity,
            depCountry,
            desCity,
            desCountry,
            seatType,
            numberOfPax,
            FLIGHTS,
          );
        }
      } catch (error) {
        toast.error('Có lỗi xảy ra!');
      } finally {
        setLoading(false);
      }
    }

    if (unmounted) return;
    fetchFlights();

    return () => {
      unmounted = true;
    };
  }, [
    date,
    depCity,
    depCountry,
    desCity,
    desCountry,
    getFlightsByCondition,
    getFlightsByConditionHasReturnDate,
    isRoundTrip,
    numberOfPax,
    returnDate,
    seatType,
  ]);

  return (
    <FlightSearching
      loading={loading}
      flights={flights}
      date={date}
      numberOfPax={numberOfPax}
      seatType={seatType}
      depDescription={depDescription}
      desDescription={desDescription}
    />
  );
}

function mapStateToProps(state) {
  return {
    flights: state.schedules.flights,
  };
}

const mapDispatchToProps = {
  getFlightsByCondition: flightsActions.getFlightsByCondition,
  getFlightsByConditionHasReturnDate:
    flightsActions.getFlightsByConditionHasReturnDate,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FlightSearchingManagement);
