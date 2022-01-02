import { Box, Button, Grid, makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import { useHistory } from 'react-router';

const backgroundUrl =
  'https://www.esa.int/var/esa/storage/images/about_us/business_with_esa/business_opportunities/19716978-3-eng-GB/Business_Opportunities_pillars.jpg';

const useStyles = makeStyles({
  root: {
    height: '100vh',
    backgroundImage: `url('${backgroundUrl}')`,
    backgroundSize: '100% 100%',
    backgroundRepeat: 'no-repeat',
    padding: '0 50',
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
  },
  partnerType: {
    color: '#20BF55',
    background: 'white',
    padding: '5 10',
    borderRadius: 5,
  },
  partnerRegisterBtn: {
    backgroundColor: '#FF5E1F',
    color: '#fff',
    fontWeight: 'bold',
    transition: '0.3s',
    padding: '10 30',
    '&:hover': {
      backgroundColor: '#FF5E1F',
      opacity: '0.9',
    },
  },
});

export default function FlightBanner() {
  const history = useHistory();
  const classes = useStyles();

  return (
    <Box className={classes.root} clone>
      <Grid container justify='center' direction='column' spacing={5}>
        <Grid item>
          <Grid container direction='column' spacing={1}>
            <Grid item>
              <Typography variant='h4' className={classes.text}>
                Grow your <span className={classes.partnerType}>Flights</span>
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant='h4' className={classes.text}>
                Business with Traveloka
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Typography variant='h6' className={classes.text}>
            Become our partner today and get a chance to reach millions of
            customers!
          </Typography>
        </Grid>
        <Grid item>
          <Button
            size='large'
            variant='contained'
            onClick={() => {
              history.push('/registration?transportType=flights');
            }}
            className={classes.partnerRegisterBtn}>
            Register now
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}
