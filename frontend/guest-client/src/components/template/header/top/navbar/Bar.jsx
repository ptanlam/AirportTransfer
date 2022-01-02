import React from 'react';
import { NavLink } from 'react-router-dom';
import { makeStyles, Hidden } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const useStyles = makeStyles((theme) => ({
  span: {
    marginLeft: 8,
  },
}));

export default function Bar(props) {
  const classes = useStyles();
  return (
    <NavLink to={props.path}>
      <FontAwesomeIcon
        icon={props.icon}
        className={`navbar__icon-${props.id}`}
      />
      <Hidden smDown>
        <span className={classes.span}>{props.text}</span>
      </Hidden>
    </NavLink>
  );
}
