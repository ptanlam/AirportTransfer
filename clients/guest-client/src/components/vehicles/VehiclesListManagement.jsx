import React from 'react';
import { connect } from 'react-redux';
import VehicleList from './VehiclesList';

function VehiclesListManagement({ cars, buses, trains, flights, vehicleType }) {
  return (
    <VehicleList
      cars={cars}
      buses={buses}
      trains={trains}
      flights={flights}
      vehicleType={vehicleType}
    />
  );
}

function mapStateToProps(state) {
  return {
    cars: state.schedules.cars,
    buses: state.schedules.buses,
    trains: state.schedules.trains,
    flights: state.schedules.flights,
  };
}

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(VehiclesListManagement);
