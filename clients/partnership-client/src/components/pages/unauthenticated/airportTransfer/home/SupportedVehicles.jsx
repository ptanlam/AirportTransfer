import {
  ButtonBase,
  Container,
  Grid,
  makeStyles,
  Typography,
} from '@material-ui/core';
import React from 'react';
import { useHistory } from 'react-router';

const useStyles = makeStyles((theme) => ({
  title: {
    fontWeight: 'bold',
  },
  body: {
    fontWeight: '300px',
  },
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    minWidth: 300,
    width: '100%',
  },
  image: {
    position: 'relative',
    height: 200,
    [theme.breakpoints.down('xs')]: {
      width: '100% !important', // Overrides inline-style
      height: 100,
    },
    '&:hover, &$focusVisible': {
      zIndex: 1,
      '& $imageBackdrop': {
        opacity: 0.15,
      },
      '& $imageMarked': {
        opacity: 0,
      },
      '& $imageTitle': {
        border: '4px solid currentColor',
      },
    },
  },
  focusVisible: {},
  imageButton: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.palette.common.white,
  },
  imageSrc: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: 'cover',
    backgroundPosition: 'center 40%',
  },
  imageBackdrop: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: theme.palette.common.black,
    opacity: 0.4,
    transition: theme.transitions.create('opacity'),
  },
  imageTitle: {
    position: 'relative',
    padding: `${theme.spacing(2)}px ${theme.spacing(4)}px ${
      theme.spacing(1) + 6
    }px`,
  },
  imageMarked: {
    height: 3,
    width: 18,
    backgroundColor: theme.palette.common.white,
    position: 'absolute',
    bottom: -2,
    left: 'calc(50% - 9px)',
    transition: theme.transitions.create('opacity'),
  },
}));

const vehicles = [
  {
    url: 'https://assetsw.bus.com/content/uploads/2020/02/14170850/Charter-Bus-Rentals-Photo.jpg',
    title: 'Bus',
    type: 'buses',
    width: `${(1 / 3) * 100}%`,
  },
  {
    url: 'https://pininfarina.it/wp-content/uploads/2019/09/MOB-TRAIN-BY-PININFARINA.jpg',
    title: 'Train',
    type: 'trains',
    width: `${(1 / 3) * 100}%`,
  },
  {
    url: 'https://www.hyundai.com/content/hyundai/ww/data/news/data/2021/0000016609/image/newsroom-0112-photo-1-2021elantranline-1120x745.jpg',
    title: 'Car',
    type: 'cars',
    width: `${(1 / 3) * 100}%`,
  },
];

export default function SupportedVehicles() {
  const history = useHistory();
  const classes = useStyles();

  return (
    <Container maxWidth='lg'>
      <Grid container direction='column' style={{ gap: 10 }}>
        <Grid item>
          <Grid container justify='center'>
            <Grid item>
              <Typography variant='h5' className={classes.title}>
                Vehicles We Support
              </Typography>
            </Grid>
          </Grid>
        </Grid>

        <Grid item>
          {vehicles.map((vehicle, index) => (
            <ButtonBase
              focusRipple
              key={vehicle.title}
              className={classes.image}
              onClick={() => {
                history.push(`/registration?transportType=${vehicle.type}`);
              }}
              focusVisibleClassName={classes.focusVisible}
              style={{
                width: vehicle.width,
              }}>
              <span
                className={classes.imageSrc}
                style={{
                  backgroundImage: `url(${vehicle.url})`,
                }}
              />
              <span className={classes.imageBackdrop} />
              <span className={classes.imageButton}>
                <Typography
                  component='span'
                  variant='subtitle1'
                  color='inherit'
                  className={classes.imageTitle}>
                  {vehicle.title}
                  <span className={classes.imageMarked} />
                </Typography>
              </span>
            </ButtonBase>
          ))}
        </Grid>
      </Grid>
    </Container>
  );
}
