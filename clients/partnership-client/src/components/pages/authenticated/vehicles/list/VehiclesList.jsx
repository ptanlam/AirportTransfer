import {
  Box,
  Button,
  Container,
  Grid,
  IconButton,
  Typography,
} from '@material-ui/core';
import AddBoxRoundedIcon from '@material-ui/icons/AddBoxRounded';
import AddIcon from '@material-ui/icons/Add';
import React from 'react';
import AirportTransferCardView from './AirportTransferCardView';
import FlightCardView from './FlightCardView';
import BigNotification from '../../../../commons/BigNotification';

export default function VehiclesList({
  classes,
  vehicles,
  transportType,
  openAddCarDialog,
  toggleVehicleDialog,
  openVehicleEditDialog,
  openJourneyDetailsDialog,
  openCancelRegistrationDialog,
  openJourneyRegistrationDialog,
}) {
  const needsClass = transportType === 'flights' || classes.length > 0;

  return (
    <Box
      position='absolute'
      top={0}
      width='100%'
      minHeight='100vh'
      bgcolor='#1D80C3'>
      <Container maxWidth='lg' style={{ paddingTop: 110, marginBottom: 30 }}>
        {needsClass ? (
          vehicles.length === 0 ? (
            <Grid
              container
              justify='center'
              alignItems='center'
              style={{ height: 'calc(100vh - 210px)', gap: 20 }}
              direction='column'>
              <Grid item>
                <Typography variant='h4' style={{ color: 'white' }}>
                  You have not added any vehicles yet! Click a the below button
                  to add vehicle
                </Typography>
              </Grid>
              <Grid item>
                <Button
                  onClick={toggleVehicleDialog}
                  size='large'
                  style={{
                    background: '#FF5E1F',
                    color: 'white',
                    fontWeight: 'bold',
                  }}
                  variant='contained'
                  endIcon={<AddBoxRoundedIcon />}>
                  Add vehicle
                </Button>
              </Grid>
            </Grid>
          ) : (
            <Grid container spacing={2}>
              <Grid item container xs={12} lg={1}>
                <Grid item>
                  <IconButton
                    onClick={toggleVehicleDialog}
                    style={{
                      background: '#FF5E1F',
                      color: 'white',
                      fontWeight: 'bold',
                      position: 'sticky',
                      top: 20,
                    }}
                    variant='contained'>
                    <AddIcon />
                  </IconButton>
                </Grid>
              </Grid>

              <Grid item container xs={12} lg={11} style={{ gap: 15 }}>
                {vehicles.map((vehicle) => (
                  <Grid item key={vehicle.id} style={{ minWidth: '100%' }}>
                    {transportType === 'flights' ? (
                      <FlightCardView
                        vehicle={vehicle}
                        openVehicleEditDialog={openVehicleEditDialog}
                      />
                    ) : (
                      <AirportTransferCardView
                        vehicle={vehicle}
                        transportType={transportType}
                        openAddCarDialog={openAddCarDialog}
                        openVehicleEditDialog={openVehicleEditDialog}
                        openJourneyDetailsDialog={openJourneyDetailsDialog}
                        openCancelRegistrationDialog={
                          openCancelRegistrationDialog
                        }
                        openJourneyRegistrationDialog={
                          openJourneyRegistrationDialog
                        }
                      />
                    )}
                  </Grid>
                ))}
              </Grid>
            </Grid>
          )
        ) : (
          <BigNotification message='Please add at least 1 class before adding vehicles!' />
        )}
      </Container>
    </Box>
  );
}
