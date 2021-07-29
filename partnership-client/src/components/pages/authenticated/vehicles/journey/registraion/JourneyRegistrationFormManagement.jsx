import axios from 'axios';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { BASE_API_URL } from '../../../../../../constants';
import JourneyRegistrationForm from './JourneyRegistrationForm';

export default function JourneyRegistrationFormManagement({
  vehicleId,
  dialogOpen,
  closeDialog,
  transportType,
}) {
  const baseUrl = `${BASE_API_URL}/${transportType}/journeys`;

  const [loading, setLoading] = useState(false);
  const [numberOfStations, setNumberOfStations] = useState(2);
  const { control, handleSubmit, errors } = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
  });
  const service = new window.google.maps.DistanceMatrixService();

  const increaseNumberOfStations = () => {
    setNumberOfStations(numberOfStations + 1);
  };

  const decreaseNumberOfStations = () => {
    if (numberOfStations <= 2) {
      toast.error('Minimum number of stations is 2');
      return;
    }
    setNumberOfStations(numberOfStations - 1);
  };

  const onSubmit = async (data) => {
    setLoading(true);
    const isValid = data.stations.every(
      (station) => Object.keys(station).length > 0,
    );

    if (!isValid) {
      toast.error('Cannot add schedule!');
      return;
    }

    let travelTime = 0;
    const stations = data.stations.map((station) => station.description);
    const departures = stations.slice(0, stations.length - 1);
    const destinations = stations.slice(1);

    service.getDistanceMatrix(
      {
        destinations: destinations,
        origins: departures,
        travelMode: 'DRIVING',
      },
      (distances) => {
        travelTime = distances.rows.reduce((acc, curr, index) => {
          return acc + curr?.elements[index]?.duration?.value || 1217;
        }, 0);
        axios
          .post(`${baseUrl}`, {
            stations: data.stations,
            vehicleId,
            travelTime,
          })
          .then((response) => {
            toast.success(response.data.message);
            setNumberOfStations(2);
            closeDialog();
          })
          .catch((error) => {
            if (error.response.status === 401) {
              toast.warning('Please login to continue!');
            } else {
              toast.error(error.response.data);
            }
          })
          .finally(() => {
            setLoading(false);
          });
      },
    );
  };

  return (
    <>
      <JourneyRegistrationForm
        errors={errors}
        loading={loading}
        control={control}
        dialogOpen={dialogOpen}
        closeDialog={closeDialog}
        onSubmit={handleSubmit(onSubmit)}
        numberOfStations={numberOfStations}
        increaseNumberOfStations={increaseNumberOfStations}
        decreaseNumberOfStations={decreaseNumberOfStations}
      />
    </>
  );
}
