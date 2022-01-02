import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { BASE_API_URL } from '../../../../../../constants';
import JourneyDetails from './JourneyDetails';

export default function JourneyDetailsManagement({
  vehicleId,
  dialogOpen,
  closeDialog,
  transportType,
}) {
  const baseUrl = `${BASE_API_URL}/${transportType}/journeys`;

  const [loading, setLoading] = useState(false);
  const [manipulating, setManipulating] = useState(false);
  const [journeys, setJourneys] = useState([]);

  useEffect(() => {
    (async function () {
      setLoading(true);
      try {
        if (vehicleId === '') return;
        if (dialogOpen === false) return;
        const response = await axios.get(`${baseUrl}?vehicleId=${vehicleId}`);
        setJourneys([...response.data.journeys]);
      } catch (error) {
        if (error.response.status === 401) {
          toast.warning('Please login again to continue!');
        } else {
          toast.error(error.response.data.message);
        }
      } finally {
        setLoading(false);
      }
    })();
  }, [baseUrl, vehicleId, dialogOpen]);

  const manipulateJourney = async (journeyId, isActive) => {
    try {
      setManipulating(true);
      const action = isActive ? 'deactivate' : 'activate';
      const response = await axios.patch(
        `${baseUrl}/${journeyId}?action=${action}`,
        {},
      );
      setJourneys([...response.data.journeys]);
      toast.success(response.data.message);
    } catch (error) {
      if (error.response.status === 401) {
        toast.warning('Please login again to continue!');
      } else {
        toast.error(error.response.data.message);
      }
    } finally {
      setManipulating(false);
    }
  };

  return (
    <JourneyDetails
      loading={loading}
      journeys={journeys}
      dialogOpen={dialogOpen}
      closeDialog={closeDialog}
      manipulating={manipulating}
      onJourneyClick={manipulateJourney}
    />
  );
}
