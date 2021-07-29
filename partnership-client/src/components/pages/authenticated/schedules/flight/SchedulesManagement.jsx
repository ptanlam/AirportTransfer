import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { connect } from 'react-redux';
import { useHistory } from 'react-router';
import { toast } from 'react-toastify';
import flightScheduleActions from '../../../../../redux/actions/flightScheduleActions';
import convertToLocalDateTimeString from '../../../../../utils/convertToLocalDateTimeString';
import ScheduleRegistrationForm from './ScheduleRegistrationForm';
import Schedules from './Schedules';

function SchedulesManagement({
  vehicles,
  schedules,
  isActive,
  getSchedules,
  postSchedule,
  transportType,
}) {
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [vehicleId, setVehicleId] = useState(vehicles[0]?.id);
  const [numberOfStations, setNumberOfStations] = useState(1);
  const [selectedDate, setSelectedDate] = React.useState(
    new Date().toLocaleDateString(),
  );
  const [dialogOpen, setDialogOpen] = useState(false);
  const { register, handleSubmit, control, errors } = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
  });

  useEffect(() => {
    (async function () {
      setLoading(true);
      try {
        if (transportType !== 'flights') history.push('/partner/schedules');
        if (vehicles.length === 0) return;
        if (!isActive) return;
        await getSchedules(vehicleId, selectedDate);
      } catch (error) {
        if (error.response.status === 401) {
          toast.warning('Please login again to continue!');
        } else {
          toast.error('Internal server error!');
        }
      } finally {
        setLoading(false);
      }
    })();
  }, [
    getSchedules,
    history,
    isActive,
    selectedDate,
    transportType,
    vehicleId,
    vehicles.length,
  ]);

  const onVehicleChange = (e) => {
    setVehicleId(e.target.value);
  };

  const handleDateChange = (date) => {
    setSelectedDate(new Date(date).toLocaleDateString());
  };

  const openDialog = () => {
    setDialogOpen(true);
  };

  const closeDialog = () => {
    setDialogOpen(false);
  };

  const onAddScheduleSubmit = async (data) => {
    setLoading(true);
    const schedule = {
      departureAt: convertToLocalDateTimeString(data.journeys[0].departureAt),
      arrivalAt: convertToLocalDateTimeString(
        data.journeys[data.journeys.length - 1].arrivalAt,
      ),
      journeys: data.journeys,
      flightId: vehicleId,
    };

    try {
      await postSchedule(schedule);
      closeDialog();
      setNumberOfStations(1);
      toast.success('Add schedule successfully!');
    } catch (error) {
      if (error.response.status === 401) {
        toast.warning('Please login to continue!');
      } else {
        toast.error(error.response.data.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const increaseNumberOfStations = () => {
    setNumberOfStations(numberOfStations + 1);
  };

  const decreaseNumberOfStations = () => {
    if (numberOfStations <= 1) {
      toast.error('Minimum number of transits is 1');
      return;
    }
    setNumberOfStations(numberOfStations - 1);
  };

  return (
    <>
      <Schedules
        loading={loading}
        vehicles={vehicles}
        schedules={schedules}
        vehicleId={vehicleId}
        openDialog={openDialog}
        selectedDate={selectedDate}
        onVehicleChange={onVehicleChange}
        handleDateChange={handleDateChange}
      />

      <ScheduleRegistrationForm
        errors={errors}
        loading={loading}
        control={control}
        register={register}
        dialogOpen={dialogOpen}
        closeDialog={closeDialog}
        selectedDate={selectedDate}
        numberOfStations={numberOfStations}
        onSubmit={handleSubmit(onAddScheduleSubmit)}
        increaseNumberOfStations={increaseNumberOfStations}
        decreaseNumberOfStations={decreaseNumberOfStations}
      />
    </>
  );
}

function mapStateToProps(state) {
  return {
    schedules: state.flightSchedules,
    vehicles: state.vehicles,
    isActive: state.partner.isActive,
    transportType: state.partner.transportType,
  };
}

const mapDispatchToProps = {
  getSchedules: flightScheduleActions.getSchedulesByFlightAndDate,
  postSchedule: flightScheduleActions.postFlightSchedule,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SchedulesManagement);
