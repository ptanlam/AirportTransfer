import DateFnsUtils from '@date-io/date-fns';
import {
  Box,
  Button,
  CircularProgress,
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
  Typography,
} from '@material-ui/core';
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import carScheduleActions from '../../../../../redux/actions/carScheduleActions';
import BigNotification from '../../../../commons/BigNotification';
import ScheduleCardView from './ScheduleCardView';

function Schedules({
  loading,
  vehicles,
  schedules,
  vehicleId,
  selectedDate,
  vehicleIndex,
  licencePlateId,
  onVehicleChange,
  handleDateChange,
  cancelCarSchedule,
  onLicencePlateChange,
}) {
  const [cancellationLoading, setCancellationLoading] = useState(false);
  const [chosenScheduleId, setChosenScheduleId] = useState(null);
  const [dialog, setDialog] = useState({ open: false, content: '' });

  const hasVehicles = !!vehicles.length && !!licencePlateId;
  const hasSchedules = !!schedules.length;

  const handleOpenDialog = (scheduleId) => {
    setChosenScheduleId(scheduleId);
    setDialog({
      open: true,
      content: 'Do you really want to cancel this schedule?',
    });
  };

  const handleCloseDialog = () => {
    setChosenScheduleId(null);
    setDialog({
      open: false,
      content: '',
    });
  };

  const handleConfirmCancelClick = async () => {
    setCancellationLoading(true);
    setDialog({ open: false, content: '' });
    try {
      await cancelCarSchedule(chosenScheduleId);
      toast.success('Cancel schedule successfully!');
    } catch (error) {
      if (error.response.status === 401) {
        toast.warning('Please login again to continue!');
      } else {
        toast.error(error.response.data.message);
      }
    } finally {
      setCancellationLoading(false);
    }
  };

  return (
    <Box
      position='absolute'
      top={0}
      width='100%'
      minHeight='100vh'
      pb={5}
      bgcolor='#1D80C3'>
      <Container style={{ paddingTop: 110, marginBottom: 30 }}>
        {hasVehicles ? (
          <Grid container direction='column' style={{ gap: 20 }}>
            <Grid item>
              <Paper style={{ padding: 20 }}>
                <Grid
                  container
                  item
                  spacing={2}
                  justify='space-around'
                  style={{ overflow: 'hidden' }}>
                  <Grid container item alignItems='center' xs={12} md={5}>
                    <FormControl>
                      <InputLabel shrink>Vehicle models</InputLabel>
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
                  <Grid
                    container
                    item
                    alignItems='center'
                    // justify='center'
                    xs={6}
                    md={2}>
                    <FormControl>
                      <InputLabel shrink>Licence plates</InputLabel>
                      <Select
                        value={licencePlateId}
                        onChange={onLicencePlateChange}>
                        {vehicles[vehicleIndex].details.map((detail) => (
                          <MenuItem value={detail.id} key={detail.id}>
                            <Typography variant='subtitle1'>
                              {detail.licencePlate}
                            </Typography>
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid
                    container
                    item
                    alignItems='center'
                    justify='flex-end'
                    xs={6}
                    md={5}>
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
            </Grid>

            <Grid container item style={{ gap: 20 }}>
              <Container maxWidth='md'>
                <Grid container direction='column' style={{ gap: 10 }}>
                  {loading ? (
                    <Grid container item justify='center'>
                      <CircularProgress style={{ color: 'white' }} />
                    </Grid>
                  ) : hasSchedules ? (
                    schedules.map((schedule) => (
                      <Grid item key={schedule.id}>
                        <ScheduleCardView
                          schedule={schedule}
                          loading={cancellationLoading}
                          handleOpenDialog={handleOpenDialog}
                        />
                      </Grid>
                    ))
                  ) : (
                    <BigNotification
                      message={`This car has no schedule on ${selectedDate}!`}
                    />
                  )}
                </Grid>
              </Container>
            </Grid>
          </Grid>
        ) : (
          <BigNotification message='You are not having any cars at present!' />
        )}
      </Container>

      <Dialog open={dialog.open}>
        <DialogTitle>Warning</DialogTitle>
        <DialogContent>
          <Typography>{dialog.content}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Back</Button>
          <Button onClick={handleConfirmCancelClick} color='secondary'>
            Confirm
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
  cancelCarSchedule: carScheduleActions.cancelCarSchedule,
};

export default connect(mapStateToProps, mapDispatchToProps)(Schedules);
