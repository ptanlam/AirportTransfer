import {
  Box,
  Button,
  Container,
  Grid,
  IconButton,
  Paper,
  Tooltip,
  Typography,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import RemoveIcon from '@material-ui/icons/Remove';
import BigNotification from '../../../commons/BigNotification';
import React from 'react';

export default function Classes({
  classes,
  handleOpenEditDialog,
  handleOpenRemovalDialog,
  handleOpenRegistrationDialog,
}) {
  const hasClass = !!classes.length;

  return (
    <Box
      position='absolute'
      top={0}
      width='100%'
      minHeight='100vh'
      bgcolor='#1D80C3'>
      <Container style={{ paddingTop: 110, marginBottom: 30 }} maxWidth='md'>
        <Grid container direction='column' style={{ gap: 20 }}>
          {hasClass ? (
            <>
              {classes.map((eachClass) => (
                <Grid
                  container
                  item
                  alignItems='center'
                  key={eachClass.id}
                  spacing={1}>
                  <Grid item xs={12} sm={8}>
                    <Paper style={{ padding: '5 20' }}>
                      <Typography variant='h5' align='center' noWrap>
                        {eachClass.name}
                      </Typography>
                    </Paper>
                  </Grid>
                  <Grid container item xs={12} sm={4} spacing={1}>
                    <Grid item xs={6}>
                      <Button
                        onClick={() => handleOpenEditDialog(eachClass)}
                        fullWidth
                        variant='contained'
                        size='small'
                        style={{
                          background: 'rgb(10, 95, 105)',
                          color: 'white',
                        }}>
                        <EditIcon />
                      </Button>
                    </Grid>
                    <Grid container item xs={6} justify='flex-end'>
                      <Tooltip
                        disableFocusListener
                        title={
                          <Typography
                            align='center'
                            variant='subtitle2'
                            style={{ fontWeight: 'bold' }}>
                            {eachClass.canBeRemoved
                              ? 'Cannot remove this class due to it still ' +
                                'has vehicle or policy referencing to this class!'
                              : 'Remove this class!'}
                          </Typography>
                        }>
                        <span style={{ width: '100%' }}>
                          <Button
                            fullWidth
                            size='small'
                            color='secondary'
                            variant='contained'
                            disabled={eachClass.canBeRemoved}
                            onClick={() =>
                              handleOpenRemovalDialog(eachClass.id)
                            }>
                            <RemoveIcon />
                          </Button>
                        </span>
                      </Tooltip>
                    </Grid>
                  </Grid>
                </Grid>
              ))}
            </>
          ) : (
            <Grid item>
              <BigNotification message='Please add at least 1 class before adding policies and vehicles!' />
            </Grid>
          )}
          <Grid container item justify='center'>
            <IconButton
              onClick={handleOpenRegistrationDialog}
              style={{
                background: '#FF5E1F',
                color: 'white',
                fontWeight: 'bold',
              }}>
              <AddIcon />
            </IconButton>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
