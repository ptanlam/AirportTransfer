import {
  Button,
  Chip,
  Grid,
  makeStyles,
  Paper,
  Typography,
} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import RemoveIcon from '@material-ui/icons/Remove';
import React, { Fragment } from 'react';

const useStyles = makeStyles({
  paper: {
    padding: '10 20',
  },
});

const policyFields = [
  {
    label: 'Perform before:',
    inputName: 'condition',
  },
  {
    label: 'Lost percentage:',
    inputName: 'lostPercentage',
  },
];

export default function PolicyCardView({
  policy,
  handleOpenEditDialog,
  handleOpenRemovalDialog,
}) {
  const uiClasses = useStyles();

  return (
    <Paper className={uiClasses.paper}>
      <Grid
        container
        direction='column'
        style={{ gap: 40 }}
        alignItems='center'>
        <Grid item>
          <Chip
            label={<Typography variant='h6'>{policy.className}</Typography>}
            color='primary'
          />
        </Grid>

        <Grid container item spacing={1}>
          {policyFields.map((field, index) => (
            <Fragment key={index}>
              <Grid container item xs={6} justify='flex-end'>
                <Typography
                  variant='subtitle2'
                  color='textSecondary'
                  style={{ fontWeight: 'bold' }}>
                  {field.label}
                </Typography>
              </Grid>
              <Grid container item xs={6} justify='flex-start'>
                <Typography variant='subtitle2' style={{ fontWeight: 'bold' }}>
                  {policy[field.inputName]}
                </Typography>
              </Grid>
            </Fragment>
          ))}

          <Grid container item xs={6} justify='flex-end'>
            <Typography
              variant='subtitle2'
              color='textSecondary'
              style={{ fontWeight: 'bold' }}>
              Created at:
            </Typography>
          </Grid>
          <Grid container item xs={6} justify='flex-start'>
            <Typography variant='subtitle2' style={{ fontWeight: 'bold' }}>
              {new Date(policy.createdAt).toLocaleString()}
            </Typography>
          </Grid>

          <Grid container item xs={6} justify='flex-end'>
            <Typography
              variant='subtitle2'
              color='textSecondary'
              style={{ fontWeight: 'bold' }}>
              Updated at:
            </Typography>
          </Grid>
          <Grid container item xs={6} justify='flex-start'>
            <Typography variant='subtitle2' style={{ fontWeight: 'bold' }}>
              {new Date(policy.updatedAt).toLocaleString()}
            </Typography>
          </Grid>
        </Grid>

        <Grid container item justify='flex-end' spacing={2}>
          <Grid item>
            <Button
              onClick={() => handleOpenEditDialog(policy)}
              size='small'
              variant='contained'
              style={{
                background: 'rgb(10, 95, 105)',
                color: 'white',
                fontWeight: 'bold',
              }}>
              <EditIcon />
            </Button>
          </Grid>
          <Grid item>
            <Button
              onClick={() => handleOpenRemovalDialog(policy.id)}
              size='small'
              variant='contained'
              style={{
                background: 'rgb(223, 71, 89)',
                color: 'white',
                fontWeight: 'bold',
              }}>
              <RemoveIcon />
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
}
