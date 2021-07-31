import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { NavLink } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
//import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles({
  root: {
    padding: 20,
    margin: 15,
    borderRadius: 10,
    border: 10,
    boxShadow: '5px 5px 10px #888888',
    fontWeight: 600,
    color: 'white',
  },
  box: {
    margin: 5,
    padding: 7,
    color: 'white',
    border: '1px solid white',
    transition: '0.3s ease',
    '&:hover': {
      outline: 'none',
      border: '1px solid white',
      textDecoration: 'none',
      background: 'white',
      color: 'black',
      transition: '0.3s ease',
    },
  },
});

export default function CardView({ title, subtitle, background, path, value }) {
  const classes = useStyles();
  return (
    <Card
      className={classes.root}
      style={{ background: background }}
      variant='elevation'
    >
      <CardContent>
        <Typography variant='h5'>{title}</Typography>
        <Typography color='textSecondary'>{subtitle}</Typography>
        <Typography variant='h4'>{value}</Typography>
      </CardContent>
      <CardActions>
        <Box className={classes.box} component={NavLink} to={path}>
          <Typography>More Details</Typography>
        </Box>
      </CardActions>
    </Card>
  );
}
