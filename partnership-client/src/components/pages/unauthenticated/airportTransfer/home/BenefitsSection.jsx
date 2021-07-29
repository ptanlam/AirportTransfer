import { Container, Grid, makeStyles, Typography } from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles({
  title: {
    fontWeight: 'bold',
  },
  body: {
    fontWeight: '300px',
  },
});

const benefits = [
  '✔ No registration fee',
  '✔ Easy-to-use-platform',
  '✔ Business-insight sharing for business growth',
  '✔ Varied marketing channels',
  '✔ 24/7 partner support',
];

export default function BenefitsSection() {
  const classes = useStyles();

  return (
    <Container maxWidth='lg'>
      <Grid container direction='column' spacing={10}>
        <Grid item>
          <Grid container justify='center'>
            <Grid item>
              <Typography className={classes.title} variant='h5'>
                Why Partner with Us?
              </Typography>
            </Grid>
          </Grid>
        </Grid>

        <Grid item>
          <Grid container spacing={5}>
            <Grid item xs={6}>
              <Typography className={classes.body} variant='body1'>
                Until today, we’ve been trusted by more than 500 partners from
                24 countries, together serving more than 130 countries around
                the globe. By partnering with Traveloka—a leading tech company
                with more than 25 million users—you will get technology-based
                business solutions and opportunities to reach new market shares
                in Indonesia, Thailand, Malaysia, Singapore, Vietnam, and the
                Philippines.
              </Typography>
            </Grid>

            <Grid item xs={6}>
              <Grid container direction='column'>
                {benefits.map((benefit, index) => (
                  <Grid item key={index}>
                    <Typography className={classes.body} variant='body1'>
                      {benefit}
                    </Typography>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}
