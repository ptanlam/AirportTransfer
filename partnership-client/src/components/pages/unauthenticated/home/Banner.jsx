import {
  Box,
  Container,
  Grid,
  makeStyles,
  Typography,
} from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles({
  root: {
    background: '#1D80C3',
    height: 'auto',
    paddingTop: 50,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  title: {
    color: 'white',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  subtitle: {
    color: 'white',
  },
  bannerContainer: {
    padding: '100 10',
  },
});

export default function Banner() {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Container maxWidth='md'>
        <Grid className={classes.bannerContainer} container spacing={2}>
          <Grid item xs={12} lg={6}>
            <Grid container direction='column'>
              <Typography className={classes.title} variant='h3'>
                Partner with us
              </Typography>
              <Typography className={classes.subtitle} variant='body1'>
                Arranging corporate travel is now easier, more reliable, and
                secure. Traveloka is here to provide you with the best travel
                services.
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={12} lg={6}>
            <img
              width='100%'
              src='https://ik.imagekit.io/tvlk/image/imageResource/2019/02/12/1549956337023-f0b8867a5f6c1211cc78074c04fbb5d8.svg'
              alt=''
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
