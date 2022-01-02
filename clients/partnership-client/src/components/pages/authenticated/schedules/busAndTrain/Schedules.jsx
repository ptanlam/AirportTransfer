import DateFnsUtils from '@date-io/date-fns';
import {
  Box,
  Button,
  Container,
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
import React from 'react';
import getJourneyFromStations from '../../../../../utils/getJourneyFromStations';
import BigNotification from '../../../../commons/BigNotification';
import ScheduleLoadingIndicator from '../ScheduleLoadingIndicator';
import ScheduleTable from './ScheduleTable';

export default function AirportTransferSchedules({
  loading,
  journeys,
  vehicles,
  schedules,
  vehicleId,
  openDialog,
  selectedDate,
  journeyIndex,
  transportType,
  onVehicleChange,
  onJourneyChange,
  handleDateChange,
  areAllSchedulesInactive,
}) {
  const hasVehicles = !!vehicles.length;
  const hasJourneys = !!journeys.length;
  const canAddSchedule =
    schedules.length === 0 &&
    new Date(selectedDate) >= new Date() &&
    areAllSchedulesInactive;

  return (
    <Box
      position='absolute'
      top={0}
      width='100%'
      minHeight='100vh'
      overflow='scroll'
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
                  justify='space-between'
                  alignItems='center'
                  style={{ overflow: 'hidden' }}>
                  <Grid item xs={6}>
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
                  {hasJourneys && (
                    <>
                      <Grid container item justify='flex-end' xs={6}>
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
                      <Grid container item justify='center' xs={12}>
                        <FormControl>
                          <InputLabel shrink>Journeys</InputLabel>
                          <Select
                            value={journeyIndex}
                            onChange={onJourneyChange}>
                            {journeys.map((journey, index) => (
                              <MenuItem
                                value={index}
                                key={journey.id}
                                disabled={!journey.isActive}>
                                <Typography variant='subtitle1'>
                                  {getJourneyFromStations(journey.stations)}
                                </Typography>
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Grid>
                    </>
                  )}
                </Grid>
              </Paper>
            </Grid>

            <Grid item>
              {loading ? (
                <ScheduleLoadingIndicator />
              ) : (
                <Grid
                  container
                  direction='column'
                  alignItems='center'
                  style={{ gap: 20 }}>
                  {hasJourneys ? (
                    <>
                      <Grid item>
                        <ScheduleTable
                          schedules={schedules}
                          transportType={transportType}
                        />
                      </Grid>

                      <Grid item>
                        <Tooltip
                          disableFocusListener
                          title={
                            <Typography
                              variant='caption'
                              style={{ fontWeight: 'bold' }}>
                              You can just add one schedule per day and adding
                              before at least 1 day
                            </Typography>
                          }>
                          <span>
                            <Button
                              variant='contained'
                              onClick={openDialog}
                              disabled={!canAddSchedule}>
                              Add schedule
                            </Button>
                          </span>
                        </Tooltip>
                      </Grid>
                    </>
                  ) : (
                    <Grid>
                      <BigNotification message='Please add journey for this vehicle before adding schedules!' />
                    </Grid>
                  )}
                </Grid>
              )}
            </Grid>
          </Grid>
        ) : (
          <BigNotification message='You are not having any vehicle at present!' />
        )}
      </Container>
    </Box>
  );
}
