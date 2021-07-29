import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import carScheduleActions from '../../../../../redux/actions/carScheduleActions';
import Schedules from './Schedules';

function SchedulesManagement({ vehicles, schedules, isActive, getSchedule }) {
  const [loading, setLoading] = useState(false);
  const [vehicleId, setVehicleId] = useState(vehicles[0]?.id);
  const [vehicleIndex, setVehicleIndex] = useState(0);
  const [licencePlateId, setLicencePlateId] = useState(
    vehicles[vehicleIndex]?.details[0]?.id,
  );
  const [selectedDate, setSelectedDate] = React.useState(
    new Date().toLocaleDateString(),
  );

  useEffect(() => {
    (async function () {
      setLoading(true);
      try {
        if (vehicles.length === 0) return;
        if (!licencePlateId) return;
        if (!isActive) return;
        await getSchedule(licencePlateId, selectedDate);
      } catch (error) {
        if (error?.response?.status === 401) {
          toast.warning('Please login to continue!');
        } else {
          toast.error(error.response.data.message);
        }
      } finally {
        setLoading(false);
      }
    })();
  }, [getSchedule, isActive, licencePlateId, selectedDate, vehicles.length]);

  const handleDateChange = (date) => {
    setSelectedDate(new Date(date).toLocaleDateString());
  };

  const onVehicleChange = (e) => {
    setVehicleId(e.target.value);
    const changedVehicleIndex = vehicles.findIndex(
      (vehicle) => vehicle.id === e.target.value,
    );
    setVehicleIndex(changedVehicleIndex);
    setLicencePlateId(vehicles[changedVehicleIndex]?.details[0]?.id);
  };

  const onLicencePlateChange = (e) => {
    setLicencePlateId(e.target.value);
  };

  return (
    <Schedules
      loading={loading}
      vehicles={vehicles}
      schedules={schedules}
      vehicleId={vehicleId}
      vehicleIndex={vehicleIndex}
      selectedDate={selectedDate}
      licencePlateId={licencePlateId}
      onVehicleChange={onVehicleChange}
      handleDateChange={handleDateChange}
      onLicencePlateChange={onLicencePlateChange}
    />
  );
}

function mapStateToProps(state) {
  return {
    vehicles: state.vehicles,
    schedules: state.carSchedules,
    isActive: state.partner.isActive,
    loading: state.apiCallsInProgress > 0,
  };
}

const mapDispatchToProps = {
  getSchedule: carScheduleActions.getSchedulesByCarAndDate,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SchedulesManagement);
