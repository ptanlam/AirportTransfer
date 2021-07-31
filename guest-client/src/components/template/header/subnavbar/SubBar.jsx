import React from 'react';
import { NavLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const useStyles = makeStyles({
  item: {
    display: 'inline-flex',
    alignItems: 'center',
    marginRight: 30,
  },
  span: {
    marginLeft: 7,
  },
});

export default function SubBar(props) {
  const classes = useStyles();
  return (
    <Box component={NavLink} to={props.path} className={classes.item}>
      <FontAwesomeIcon
        className={`sub-navbar__icon-${props.id}`}
        icon={props.icon}
      />
      <Typography className={classes.span}>{props.text}</Typography>
    </Box>
  );
}
