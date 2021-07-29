import { Button, Grid, Typography } from '@material-ui/core';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import flightScheduleActions from '../../../../../redux/actions/flightScheduleActions';

function TicketsRegistrationForm({ scheduleId, numberOfSeats, postTickets }) {
  const { handleSubmit, register } = useForm();
  const [loading, setLoading] = useState();

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await postTickets(scheduleId, data, numberOfSeats);
      toast.success('Add tickets successfully!');
    } catch (error) {
      if (error.response.status === 401) {
        toast.warning('Please login again to continue!');
      } else {
        toast.error(error.response.data.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid
        container
        direction='column'
        spacing={2}
        justify='center'
        alignItems='center'
        style={{ height: '100%' }}>
        <Grid item>
          <Typography align='center' variant='body2'>
            You have not uploaded tickets for this schedule yet!
          </Typography>
        </Grid>
        <Grid item>
          <input
            required
            type='file'
            ref={register}
            id={scheduleId}
            name='ticketsFile'
            disabled={loading}
            accept='.csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel'
          />
        </Grid>
        <Grid item>
          <Button
            type='submit'
            color='primary'
            disabled={loading}
            variant='contained'>
            {loading ? 'Your uploaded tickets is processing...' : 'Upload'}
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}

function mapStateToProps(state, ownState) {
  const vehicleIndex = state.vehicles.findIndex(
    (vehicle) => vehicle.id === ownState.vehicleId,
  );
  const numberOfSeats = state.vehicles[vehicleIndex].guestQuantity;
  return { numberOfSeats };
}

const mapDispatchToProps = {
  postTickets: flightScheduleActions.postTickets,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TicketsRegistrationForm);
