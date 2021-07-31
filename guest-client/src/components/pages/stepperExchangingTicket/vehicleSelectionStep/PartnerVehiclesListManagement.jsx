import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router';
import queryString from 'query-string';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import schedulesActions from '../../../../redux/actions/schedulesActions';
import PartnerVehiclesList from './PartnerVehiclesList';
import NoVehicle from '../../../commons/NoVehicle';
import SkeletonLoading from '../../../commons/SkeletonLoading';
import { BUSES, CARS, TRAINS, FLIGHTS } from '../../../../constants';
import carsActions from '../../../../redux/actions/carsActions';
import chonVe from '../../../../assets/images/chon-ve.png';
import flightsActions from '../../../../redux/actions/flightsActions';
import { toast } from 'react-toastify';

function PartnerVehiclesListManagement({
  getSchedulesByPartnerId,
  getCarsByPartnerId,
  getFlightsByPartnerId,
  getFlightsByPartnerIdHasReturnDate,
  buses,
  cars,
  trains,
  flights,
}) {
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const {
    date,
    pickUpTime,
    depDistrict,
    depCity,
    depCountry,
    desDistrict,
    desCity,
    desCountry,
    partnerId,
    sec,
    seatType,
    numberOfPax,
    isRoundTrip,
    returnDate,
  } = queryString.parse(history.location.search);
  const vehicleType = history.location.pathname.split('/').pop();
  const hasNoFlights = vehicleType === 'flights' && flights.length === 0;
  const hasNoVehicle =
    cars.length === 0 && buses.length === 0 && trains.length === 0;

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        switch (vehicleType) {
          case 'cars':
            await getCarsByPartnerId(
              date,
              pickUpTime,
              depCity,
              depCountry,
              parseInt(sec),
              CARS,
              partnerId,
            );
            break;
          case 'buses':
            await getSchedulesByPartnerId(
              date,
              pickUpTime,
              depDistrict,
              depCity,
              depCountry,
              desDistrict,
              desCity,
              desCountry,
              BUSES,
              partnerId,
            );
            break;
          case 'trains':
            await getSchedulesByPartnerId(
              date,
              pickUpTime,
              depDistrict,
              depCity,
              depCountry,
              desDistrict,
              desCity,
              desCountry,
              TRAINS,
              partnerId,
            );
            break;
          case 'flights':
            if (!isRoundTrip) {
              return await getFlightsByPartnerId(
                date,
                depCity,
                depCountry,
                desCity,
                desCountry,
                seatType,
                numberOfPax,
                FLIGHTS,
                partnerId,
              );
            }
            await getFlightsByPartnerIdHasReturnDate(
              date,
              depCity,
              depCountry,
              desCity,
              desCountry,
              seatType,
              numberOfPax,
              FLIGHTS,
              partnerId,
              isRoundTrip,
              returnDate,
            );
            break;
          default:
            break;
        }
      } catch (error) {
        toast.error('Có lỗi xảy ra!');
      } finally {
        setLoading(false);
      }
    })();
  }, [
    getSchedulesByPartnerId,
    date,
    pickUpTime,
    depDistrict,
    depCity,
    depCountry,
    desDistrict,
    desCity,
    getCarsByPartnerId,
    desCountry,
    partnerId,
    vehicleType,
    sec,
    seatType,
    numberOfPax,
    isRoundTrip,
    returnDate,
    getFlightsByPartnerId,
    getFlightsByPartnerIdHasReturnDate,
  ]);

  switch (vehicleType) {
    case 'flights':
      return (
        <Container>
          <Box component='img' src={chonVe} width='100%' />
          {loading ? (
            <SkeletonLoading />
          ) : hasNoFlights ? (
            <NoVehicle vehicleType='flight' />
          ) : (
            <PartnerVehiclesList flights={flights} vehicleType={vehicleType} />
          )}
        </Container>
      );
    default:
      return (
        <Container>
          <Box component='img' src={chonVe} width='100%' />
          {loading ? (
            <SkeletonLoading />
          ) : hasNoVehicle ? (
            <NoVehicle />
          ) : (
            <PartnerVehiclesList
              buses={buses}
              cars={cars}
              trains={trains}
              vehicleType={vehicleType}
            />
          )}
        </Container>
      );
  }
}

function mapStateToProps(state) {
  return {
    buses: state.schedulesExchange.buses,
    cars: state.schedulesExchange.cars,
    trains: state.schedulesExchange.trains,
    flights: state.schedulesExchange.flights,
  };
}

const mapDispatchToProps = {
  getSchedulesByPartnerId: schedulesActions.getSchedulesByPartnerId,
  getCarsByPartnerId: carsActions.getCarsByPartnerId,
  getFlightsByPartnerId: flightsActions.getFlightsByPartnerId,
  getFlightsByPartnerIdHasReturnDate:
    flightsActions.getFlightsByPartnerIdHasReturnDate,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PartnerVehiclesListManagement);
