import { yupResolver } from '@hookform/resolvers/yup';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { connect } from 'react-redux';
import { useHistory } from 'react-router';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import journeyActions from '../../../../../redux/actions/journeyActions';
import scheduleActions from '../../../../../redux/actions/scheduleActions';
import ScheduleRegistrationForm from './ScheduleRegistrationForm';
import Schedules from './Schedules';

const busScheduleSchema = yup.object().shape({
  startTime: yup
    .string()
    .test('not empty', 'Start time cant be empty', function (value) {
      return !!value;
    })
    .test(
      'start_time_test',
      'Start time must be before end time',
      function (value) {
        const { endTime } = this.parent;
        return moment(value, 'HH:mm').isSameOrBefore(moment(endTime, 'HH:mm'));
      },
    ),
  endTime: yup.string().required('End time is required'),
  gap: yup
    .string()
    .test(
      'gap_between_start_and_end_test',
      'Gap must be smaller than the gap between start time and end time',
      function (value) {
        const { startTime, endTime } = this.parent;
        const maximumGap = moment
          .utc(endTime, 'HH:mm')
          .subtract(moment.utc(startTime, 'HH:mm'))
          .format('HH:mm');
        return value < maximumGap;
      },
    )
    .test(
      'gap_greater_than_0_test',
      'Gap must be greater than 0',
      function (value) {
        return value !== '00:00';
      },
    )
    .required('Gap is required'),
  numberOfVehicles: yup
    .number('Number of vehicles must be a number')
    .typeError('Number of vehicles must be a number')
    .min(1, 'Minimum number of vehicles is 1')
    .required('Number of vehicles is required'),
});

const trainScheduleSchema = yup.object().shape({
  startTime: yup
    .string()
    .test('not empty', 'Start time cant be empty', function (value) {
      return !!value;
    })
    .test(
      'start_time_test',
      'Start time must be before end time',
      function (value) {
        const { endTime } = this.parent;
        return moment(value, 'HH:mm').isSameOrBefore(moment(endTime, 'HH:mm'));
      },
    ),
  endTime: yup.string().required('End time is required'),
  gap: yup
    .string()
    .test(
      'gap_test',
      'Gap must be smaller than the gap between start time and end time',
      function (value) {
        const { startTime, endTime } = this.parent;
        const maximumGap = moment
          .utc(endTime, 'HH:mm')
          .subtract(moment.utc(startTime, 'HH:mm'))
          .format('HH:mm');
        return value < maximumGap;
      },
    )
    .required('Gap is required'),
});

function getScheduleSchema(transportType) {
  if (transportType === 'buses') {
    return yupResolver(busScheduleSchema);
  } else if (transportType === 'trains') {
    return yupResolver(trainScheduleSchema);
  }
}

function SchedulesManagement({
  vehicles,
  journeys,
  isActive,
  schedules,
  getJourneys,
  postSchedule,
  getSchedules,
  transportType,
  areAllSchedulesInactive,
}) {
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const { register, handleSubmit, errors } = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
    resolver: getScheduleSchema(transportType),
  });
  const [vehicleId, setVehicleId] = useState(vehicles[0]?.id);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [journeyIndex, setJourneyIndex] = useState(0);
  const [selectedDate, setSelectedDate] = React.useState(
    new Date().toLocaleDateString(),
  );

  useEffect(() => {
    (async function () {
      try {
        setLoading(true);
        if (transportType === 'flights') history.push('/partner/tickets');
        if (vehicles.length === 0) return;
        if (!isActive) return;
        await getJourneys(transportType, vehicleId);
      } catch (error) {
        if (error?.response?.status === 401) {
          toast.warning('Please login again to continue!');
        } else {
          toast.error(error.response.data.message);
        }
      } finally {
        setLoading(false);
      }
    })();
  }, [
    getJourneys,
    history,
    isActive,
    transportType,
    vehicleId,
    vehicles.length,
  ]);

  useEffect(() => {
    (async function () {
      try {
        setLoading(true);
        await getSchedules(
          transportType,
          journeys[journeyIndex].id,
          selectedDate,
        );
      } catch (error) {
        if (error?.response?.status === 401) {
          toast.warning('Please login to continue!');
        } else {
          toast.error(error?.response?.data?.message);
        }
      } finally {
        setLoading(false);
      }
    })();
  }, [getSchedules, journeyIndex, journeys, selectedDate, transportType]);

  const onVehicleChange = (e) => {
    setVehicleId(e.target.value);
  };

  const onJourneyChange = (e) => {
    setJourneyIndex(e.target.value);
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
    try {
      await postSchedule(transportType, {
        ...data,
        date: selectedDate,
        journeyId: journeys[journeyIndex].id,
      });
      closeDialog();
      toast.success('Add schedule successfully!');
    } catch (error) {
      if (error?.response?.status === 401) {
        toast.warning('Please login again to continue!');
      } else {
        toast.error(error.response.data.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Schedules
        loading={loading}
        vehicles={vehicles}
        journeys={journeys}
        schedules={schedules}
        vehicleId={vehicleId}
        openDialog={openDialog}
        journeyIndex={journeyIndex}
        selectedDate={selectedDate}
        transportType={transportType}
        onJourneyChange={onJourneyChange}
        onVehicleChange={onVehicleChange}
        handleDateChange={handleDateChange}
        areAllSchedulesInactive={areAllSchedulesInactive}
      />

      <ScheduleRegistrationForm
        errors={errors}
        loading={loading}
        register={register}
        dialogOpen={dialogOpen}
        closeDialog={closeDialog}
        transportType={transportType}
        onSubmit={handleSubmit(onAddScheduleSubmit)}
      />
    </>
  );
}

function mapStateToProps(state) {
  const schedules = state.schedule.details;
  const areAllSchedulesInactive = schedules.every((schedule) => {
    return schedule.isActive === false;
  });
  return {
    areAllSchedulesInactive,
    vehicles: state.vehicles,
    journeys: state.journeys,
    isActive: state.partner.isActive,
    schedules: state.schedule.details,
    transportType: state.partner.transportType,
  };
}

const mapDispatchToProps = {
  getJourneys: journeyActions.getJourneysByVehicle,
  getSchedules: scheduleActions.getScheduleByJourney,
  postSchedule: scheduleActions.postSchedule,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SchedulesManagement);
