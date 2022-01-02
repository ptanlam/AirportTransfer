import React from 'react';
import BusExchangeTicketManagement from '../../../vehicles/bus/exchangeTicket/BusExchangeTicketManagement';
import CarExchangeTicketManagement from '../../../vehicles/car/exchangeTicket/CarExchangeTicketManagement';
import TrainExchangeTicketManagement from '../../../vehicles/train/exchangeTicket/TrainExchangeTicketManagement';
import FlightExchangeTicketManagement from '../../../vehicles/flight/exchangeTicket/FlightExchangeTicketManagement';

export default function PartnerVehiclesList({
  buses,
  cars,
  trains,
  flights,
  vehicleType,
}) {
  switch (vehicleType) {
    case 'cars':
      return (
        <>
          {cars.map((car, index) => (
            <CarExchangeTicketManagement key={index} car={car} />
          ))}
        </>
      );
    case 'buses':
      return (
        <>
          {buses.map((bus, index) => (
            <BusExchangeTicketManagement key={index} bus={bus} />
          ))}
        </>
      );
    case 'trains':
      return (
        <>
          {trains.map((train, index) => (
            <TrainExchangeTicketManagement key={index} train={train} />
          ))}
        </>
      );
    case 'flights':
      return (
        <>
          {flights.map((flight, index) =>
            flight.schedules.map((schedule, index) => (
              <FlightExchangeTicketManagement
                key={index}
                schedule={schedule}
                flight={flight}
              />
            ))
          )}
        </>
      );
    default:
      break;
  }
}
