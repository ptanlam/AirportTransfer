import DateFnsUtils from '@date-io/date-fns';
import {
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Tooltip,
  Typography,
} from '@material-ui/core';
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import flightScheduleActions from '../../../../../redux/actions/flightScheduleActions';
import BigNotification from '../../../../commons/BigNotification';
import ScheduleLoadingIndicator from '../ScheduleLoadingIndicator';
import ScheduleCardView from './ScheduleCardView';

function Schedules({
  loading,
  vehicles,
  schedules,
  vehicleId,
  openDialog,
  selectedDate,
  cancelSchedule,
  onVehicleChange,
  handleDateChange,
  refundAllTicketsOfSchedule,
}) {
  const [innerLoading, setInnerLoading] = useState(false);
  const [dialog, setDialog] = useState({
    open: false,
    action: '',
    content: '',
  });
  const [chosenScheduleId, setChosenScheduleId] = useState(null);

  const openRefundDialog = (scheduleId) => {
    setChosenScheduleId(scheduleId);
    setDialog({
      open: true,
      action: 'refund',
      content: 'Do you really want to refund all tickets in this schedule?',
    });
  };

  const openCancellationDialog = (scheduleId) => {
    setChosenScheduleId(scheduleId);
    setDialog({
      open: true,
      action: 'cancel',
      content: 'Do you really want to cancel this schedule?',
    });
  };

  const closeDialog = () => {
    setChosenScheduleId(null);
    setDialog({
      open: false,
      action: '',
      content: '',
    });
  };

  const onRefundClick = async () => {
    setDialog({
      open: false,
      action: '',
      content: '',
    });
    try {
      setInnerLoading(true);
      await refundAllTicketsOfSchedule(chosenScheduleId);
      toast.success('Refund successfully!');
    } catch (error) {
      if (error.response.status === 401) {
        toast.warning('Please login again to continue!');
      } else {
        toast.error(error.response.data.message);
      }
    } finally {
      setInnerLoading(false);
    }
  };

  const onCancelScheduleClick = async () => {
    setInnerLoading(true);
    try {
      await cancelSchedule(chosenScheduleId);
      closeDialog(false);
      toast.success('Cancel schedule successfully!');
    } catch (error) {
      if (error.response.status === 401) {
        toast.warning('Please login again to continue!');
      } else {
        toast.error(error.response.data.message);
      }
    } finally {
      setInnerLoading(false);
    }
  };

  return (
    <Box
      position='absolute'
      top={0}
      width='100%'
      minHeight='100vh'
      bgcolor='#1D80C3'>
      <Container style={{ paddingTop: 110, marginBottom: 30 }}>
        {vehicles.length ? (
          <Grid container direction='column' style={{ gap: 20 }}>
            <Paper style={{ padding: 20 }}>
              <Grid
                container
                item
                spacing={2}
                justify='space-between'
                style={{ overflow: 'hidden' }}>
                <Grid container item justify='center' xs={12} lg={6}>
                  <FormControl>
                    <InputLabel shrink>Vehicles</InputLabel>
                    <Select value={vehicleId} onChange={onVehicleChange}>
                      {vehicles.map((vehicle) => (
                        <MenuItem value={vehicle.id} key={vehicle.id}>
                          <Typography variant='subtitle1'>
                            {vehicle.name}
                          </Typography>
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>

                <Grid container item justify='center' xs={12} lg={6}>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                      disableToolbar
                      variant='inline'
                      format='MM/dd/yyyy'
                      margin='normal'
                      id='date-picker-inline'
                      label='Date picker inline'
                      value={selectedDate}
                      onChange={handleDateChange}
                      KeyboardButtonProps={{
                        'aria-label': 'change date',
                      }}
                    />
                  </MuiPickersUtilsProvider>
                </Grid>
              </Grid>
            </Paper>

            <Grid item>
              <Container maxWidth='md'>
                {loading ? (
                  <ScheduleLoadingIndicator />
                ) : (
                  <Grid
                    container
                    direction='column'
                    alignItems='center'
                    style={{ gap: 20 }}>
                    {schedules.length > 0 ? (
                      schedules.map((schedule) => (
                        <Grid item key={schedule.id}>
                          <ScheduleCardView
                            schedule={schedule}
                            vehicleId={vehicleId}
                            loading={innerLoading}
                            chosenScheduleId={chosenScheduleId}
                            openRefundDialog={openRefundDialog}
                            openCancellationDialog={openCancellationDialog}
                          />
                        </Grid>
                      ))
                    ) : (
                      <Grid item>
                        <BigNotification message='You are not having any schedule for this date!' />
                      </Grid>
                    )}
                    <Grid item>
                      <Tooltip
                        disableFocusListener
                        title='You can just add the schedule before at least 1 day'>
                        <span>
                          <Button
                            variant='contained'
                            onClick={openDialog}
                            disabled={new Date(selectedDate) < new Date()}>
                            Add schedule
                          </Button>
                        </span>
                      </Tooltip>
                    </Grid>
                  </Grid>
                )}
              </Container>
            </Grid>
          </Grid>
        ) : (
          <BigNotification message='Please register at least 1 flight before adding schedule!' />
        )}
      </Container>

      <Dialog open={dialog.open}>
        <DialogTitle>Waring</DialogTitle>
        <DialogContent>
          <Typography>{dialog.content}</Typography>
        </DialogContent>
        <DialogActions>
          <Button disabled={innerLoading} onClick={closeDialog}>
            Back
          </Button>
          <Button
            onClick={() => {
              dialog.action === 'refund'
                ? onRefundClick()
                : onCancelScheduleClick();
            }}
            disabled={innerLoading}
            color='secondary'
            variant='contained'>
            {innerLoading ? 'Cancelling...' : 'Confirm'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

function mapStateToProps(state) {
  return {};
}

const mapDispatchToProps = {
  cancelSchedule: flightScheduleActions.cancelSchedule,
  refundAllTicketsOfSchedule: flightScheduleActions.refundAllTicketsOfSchedule,
};

export default connect(mapStateToProps, mapDispatchToProps)(Schedules);
