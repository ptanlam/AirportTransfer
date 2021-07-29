import { Button, Grid, Paper, Typography } from '@material-ui/core';
import {
  Timeline,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineItem,
  TimelineOppositeContent,
  TimelineSeparator,
} from '@material-ui/lab';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import flightScheduleActions from '../../../../../redux/actions/flightScheduleActions';
import TicketsRegistrationForm from './TicketsRegistrationForm';
import TicketsTable from './TicketsTable';

function ScheduleCardView({
  loading,
  schedule,
  vehicleId,
  chosenScheduleId,
  openRefundDialog,
  manipulateSchedule,
  openCancellationDialog,
}) {
  const canAddTickets = new Date() < new Date(schedule.departureAt);
  const [manipulating, setManipulating] = useState(false);
  const refunding = schedule.id === chosenScheduleId && loading;

  const onManipulateScheduleClick = async (mode) => {
    setManipulating(true);
    try {
      await manipulateSchedule(schedule.id, mode);
      toast.success(`${mode} schedule successfully!`);
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
    <Paper style={{ padding: 20 }}>
      <Grid container direction='column' style={{ gap: 20 }}>
        {!schedule.isActive && (
          <Grid container item justify='center'>
            <Typography
              style={{
                background: 'grey',
                color: 'white',
                fontWeight: 'bold',
                padding: '5 20',
                borderRadius: 5,
              }}>
              Deactivated
            </Typography>
          </Grid>
        )}
        <Grid container item justify='center'>
          <Grid item xs={8}>
            <Timeline align='alternate'>
              {schedule.journeys.map((journey) =>
                journey.stations.map((station, stationIndex) => (
                  <TimelineItem key={station.id}>
                    <TimelineOppositeContent>
                      <Typography
                        variant='caption'
                        color={
                          schedule.isActive ? 'textPrimary' : 'textSecondary'
                        }>
                        {stationIndex === 0
                          ? new Date(journey.departureAt).toLocaleString()
                          : new Date(journey.arrivalAt).toLocaleString()}
                      </Typography>
                    </TimelineOppositeContent>
                    <TimelineSeparator>
                      <TimelineDot />
                      {stationIndex <
                        schedule.journeys[0].stations.length - 1 && (
                        <TimelineConnector />
                      )}
                    </TimelineSeparator>
                    <TimelineContent>
                      <Typography
                        variant='subtitle2'
                        color={
                          schedule.isActive ? 'textPrimary' : 'textSecondary'
                        }>
                        {station.description}
                      </Typography>
                    </TimelineContent>
                  </TimelineItem>
                )),
              )}
            </Timeline>
          </Grid>
          {canAddTickets && !schedule.tickets.length && (
            <Grid item xs={4}>
              <TicketsRegistrationForm
                vehicleId={vehicleId}
                scheduleId={schedule.id}
              />
            </Grid>
          )}
        </Grid>
        {!!schedule.tickets.length && (
          <>
            <Grid item>
              <TicketsTable tickets={schedule.tickets} />
            </Grid>
            <Grid container item justify='center' spacing={1}>
              <Grid item>
                {schedule.isActive ? (
                  <Button
                    size='small'
                    disabled={manipulating || !canAddTickets}
                    variant='contained'
                    onClick={() => onManipulateScheduleClick('Deactivate')}>
                    {manipulating ? 'Deactivating...' : 'Deactivate'}
                  </Button>
                ) : (
                  <Button
                    size='small'
                    disabled={manipulating || !canAddTickets || refunding}
                    variant='contained'
                    onClick={() => onManipulateScheduleClick('Activate')}>
                    {manipulating ? 'Activating...' : 'Activate'}
                  </Button>
                )}
              </Grid>
              <Grid item>
                <Button
                  color='primary'
                  variant='contained'
                  onClick={() => openRefundDialog(schedule.id)}
                  disabled={
                    schedule.isActive || schedule.isCancellable || refunding
                  }
                  size='small'>
                  {refunding ? 'Refunding...' : 'Refund'}
                </Button>
              </Grid>
              <Grid item>
                <Button
                  disabled={!schedule.isCancellable}
                  onClick={() => openCancellationDialog(schedule.id)}
                  size='small'
                  color='secondary'
                  variant='contained'>
                  Cancel
                </Button>
              </Grid>
            </Grid>
          </>
        )}
      </Grid>
    </Paper>
  );
}

function mapStateToProps(state) {
  return {};
}

const mapDispatchToProps = {
  manipulateSchedule: flightScheduleActions.manipulateSchedule,
};

export default connect(mapStateToProps, mapDispatchToProps)(ScheduleCardView);
