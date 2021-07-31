import React from 'react';
import Grid from '@material-ui/core/Grid';
import BusTicketManagement from '../vehicles/bus/ticket/BusTicketManagement';
import CarTicketManagement from '../vehicles/car/ticket/CarTicketManagement';
import TrainTicketManagement from '../vehicles/train/ticket/TrainTicketManagement';
import FlightTicketManagement from '../vehicles/flight/ticket/FlightTicketManagement';

export default function VehiclesList({
  cars,
  buses,
  trains,
  flights,
  vehicleType,
}) {
  return (
    <>
      {vehicleType === 'cars' && (
        <Grid item container direction='column'>
          {cars.map((car) => (
            <Grid item xs={12} key={car.id}>
              <CarTicketManagement car={car} />
            </Grid>
          ))}
        </Grid>
      )}
      {vehicleType === 'buses' && (
        <Grid item container direction='column'>
          {buses.map((bus) => (
            <Grid item key={bus.bus.id}>
              <BusTicketManagement bus={bus} />
            </Grid>
          ))}
        </Grid>
      )}
      {vehicleType === 'trains' && (
        <Grid item container direction='column'>
          {trains.map((train) => (
            <Grid item key={train.train.id}>
              <TrainTicketManagement train={train} />
            </Grid>
          ))}
        </Grid>
      )}
      {vehicleType === 'flights' && (
        <Grid item container direction='column' spacing={1}>
          {flights.map((flight) => (
            <Grid item key={flight.schedule.id}>
              <FlightTicketManagement flight={flight} />
            </Grid>
          ))}
        </Grid>
      )}
    </>
  );
}
