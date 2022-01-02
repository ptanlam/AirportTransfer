import { Container, Grid, makeStyles, Typography } from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles({
  title: {
    fontWeight: 'bold',
  },
  body: {
    color: 'grey',
  },
});

const steps = [
  {
    title: 'Register your business through the form',
    description:
      'Submit your transportation business info so we can make sure that your business is what we’re looking for.',
    url:
      'https://ik.imagekit.io/tvlk/image/imageResource/2019/08/28/1566978467611-955c590b6092814b5bdb1aab9e863be4.svg',
  },
  {
    title: 'Wait for our email or phone call',
    description:
      'If selected, we will contact you via email or phone call to discuss further about your business details.',
    url:
      'https://ik.imagekit.io/tvlk/image/imageResource/2019/08/28/1566978474833-7795b7f7f0035f962ac82c8cef2f87e4.svg',
  },
  {
    title: 'Enjoy the advantage of being our partner!',
    description:
      'Once the agreement is finalized, you can start getting more bookings and see your business grow!',
    url:
      'https://ik.imagekit.io/tvlk/image/imageResource/2019/08/28/1566978478505-2f6283d8b3e28de9fe5cf36fdd910613.svg',
  },
];

export default function RegistrationGuidance() {
  const classes = useStyles();

  return (
    <Container maxWidth='md'>
      <Grid container direction='column' spacing={10}>
        <Grid item>
          <Grid container justify='center'>
            <Typography className={classes.title} variant='h5'>
              How to Become Our Partner?
            </Typography>
          </Grid>
        </Grid>
        <Grid item>
          <Container maxWidth='md'>
            <Grid container spacing={5}>
              {steps.map((step, index) => (
                <Grid item key={index} xs={4}>
                  <Grid
                    container
                    alignItems='center'
                    direction='column'
                    spacing={2}>
                    <Grid item>
                      <img src={step.url} alt='' />
                    </Grid>
                    <Grid item>
                      <Typography className={classes.title} variant='subtitle1'>
                        {index + 1}. {step.title}
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography className={classes.body} variant='body2'>
                        {step.description}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Grid>
      </Grid>
    </Container>
  );
}
