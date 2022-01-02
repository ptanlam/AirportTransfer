import React from 'react';
import { makeStyles } from '@material-ui/core';
import List from '@material-ui/core/List';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { DrawerData } from './DrawerData';

const useStyles = makeStyles({
  listLeftDrawer: {
    width: 300,
  },
});

export default function DrawerList() {
  const classes = useStyles();
  return (
    <Box component='div' className={classes.listLeftDrawer} role='presentation'>
      <List>
        {DrawerData[0].map((val) => {
          return (
            <ListItem button key={val.iconId}>
              <ListItemIcon>
                <FontAwesomeIcon
                  icon={val.icon}
                  className={`drawer__icon-${val.iconId}`}
                />
              </ListItemIcon>
              <ListItemText>{val.iconText}</ListItemText>
            </ListItem>
          );
        })}
      </List>
      <Divider />
      <List>
        {DrawerData[1].map((val) => {
          return (
            <ListItem button key={val.iconId}>
              <ListItemIcon>
                <FontAwesomeIcon
                  icon={val.icon}
                  className={`drawer__icon-${val.iconId}`}
                />
              </ListItemIcon>
              <ListItemText>{val.iconText}</ListItemText>
            </ListItem>
          );
        })}
      </List>
      <Divider />
      <List>
        {DrawerData[2].map((val) => {
          return (
            <ListItem button key={val.iconId}>
              <ListItemIcon>
                <FontAwesomeIcon
                  icon={val.icon}
                  className={`drawer__icon-${val.iconId}`}
                />
              </ListItemIcon>
              <ListItemText>{val.iconText}</ListItemText>
            </ListItem>
          );
        })}
      </List>
    </Box>
  );
}
