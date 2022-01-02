import React from 'react';
import { makeStyles } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import AccessibilityIcon from '@material-ui/icons/Accessibility';
import EmojiPeopleIcon from '@material-ui/icons/EmojiPeople';
import ChildCareIcon from '@material-ui/icons/ChildCare';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles({
  box: {
    minWidth: 450,
    height: 'auto',
    padding: 10,
  },
});

export default function ToggleClick(props) {
  const classes = useStyles();
  const { label, sublabel, number, handleClickIncrease, handleClickDecrease } =
    props;
  return (
    <Box component='div' className={classes.box}>
      <Grid container justify='space-between'>
        <Grid item xs container>
          <Grid item>
            {label === 'Người lớn' ? (
              <AccessibilityIcon />
            ) : label === 'Trẻ em' ? (
              <EmojiPeopleIcon />
            ) : label === 'Em bé' ? (
              <ChildCareIcon />
            ) : null}
          </Grid>
          <Grid item container alignItems='center'>
            <Typography style={{ fontWeight: 'bold' }}>{label}</Typography>
          </Grid>
          <Grid item>
            <Typography variant='body2'>{sublabel}</Typography>
          </Grid>
        </Grid>
        <Grid item xs container alignItems='center'>
          <Paper style={{ width: '100%' }}>
            <Grid container>
              <Grid item xs container justify='center' alignItems='center'>
                <IconButton aria-label='add' onClick={handleClickIncrease}>
                  <AddIcon />
                </IconButton>
              </Grid>
              <Grid item xs container justify='center' alignItems='center'>
                <Typography>{number}</Typography>
              </Grid>
              <Grid item xs container justify='center' alignItems='center'>
                <IconButton aria-label='minus' onClick={handleClickDecrease}>
                  <RemoveIcon />
                </IconButton>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
