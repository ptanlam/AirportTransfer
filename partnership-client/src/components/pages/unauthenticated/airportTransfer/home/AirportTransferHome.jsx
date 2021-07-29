import { Grid, makeStyles } from '@material-ui/core';
import React from 'react';
import AirportTransferBanner from './AirportTransferBanner';
import BenefitsSection from './BenefitsSection';
import RegistrationGuidance from './RegistrationGuidance';
import SupportedVehicles from './SupportedVehicles';

const useStyles = makeStyles({
  root: {
    position: 'absolute',
    top: 0,
    gap: 100,
  },
});

export default function AirportTransferHome() {
  const classes = useStyles();

  return (
    <Grid className={classes.root} container direction='column'>
      <Grid item>
        <AirportTransferBanner />;
      </Grid>
      <Grid item>
        <BenefitsSection />
      </Grid>
      <Grid item>
        <SupportedVehicles />
      </Grid>
      <Grid item>
        <RegistrationGuidance />
      </Grid>
    </Grid>
  );
}
