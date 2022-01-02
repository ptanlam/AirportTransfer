import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  makeStyles,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  withStyles,
} from '@material-ui/core';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import scheduleActions from '../../../../../redux/actions/scheduleActions';
import BigNotification from '../../../../commons/BigNotification';

const useStyles = makeStyles({
  table: {
    padding: 10,
  },
});

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

function ScheduleTable({
  schedules,
  transportType,
  refundAllTickets,
  cancelScheduleDetail,
  manipulateScheduleDetail,
}) {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [loading, setLoading] = useState(false);
  const [refunding, setRefunding] = useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [chosenScheduleId, setChosenScheduleId] = useState(null);
  const [dialog, setDialog] = useState({
    mode: null,
    open: false,
  });

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const onManipulateClick = async (scheduleDetailId, type) => {
    setChosenScheduleId(scheduleDetailId);
    setLoading(true);
    try {
      await manipulateScheduleDetail(transportType, scheduleDetailId, type);
      toast.success(`${type} ticket successfully!`);
    } catch (error) {
      if (error.response.status === 401) {
        toast.warning('Please login again to continue!');
      } else {
        toast.error(error.response.data.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const onCancelClick = (scheduleDetailId) => {
    setChosenScheduleId(scheduleDetailId);
    setDialog({
      open: true,
      mode: 'cancel',
    });
  };

  const onRefundClick = (scheduleDetailId) => {
    setChosenScheduleId(scheduleDetailId);
    setDialog({
      open: true,
      mode: 'refund',
    });
  };

  const onConfirmCancelSchedule = async () => {
    setLoading(true);
    try {
      await cancelScheduleDetail(transportType, chosenScheduleId);
      setDialog({ open: false, mode: null });
      toast.success('Cancel schedule successfully!');
    } catch (error) {
      if (error.response.status === 401) {
        toast.warning('Please login again to continue!');
      } else {
        toast.error(error.response.data.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const onConfirmRefund = async () => {
    setRefunding(true);
    try {
      setDialog({ open: false, mode: null });
      await refundAllTickets(chosenScheduleId, transportType);
      toast.success('Refund all tickets successfully!');
    } catch (error) {
      if (error.response.status === 401) {
        toast.warning('Please login again to continue!');
      } else {
        toast.error(error.response.data.message);
      }
    } finally {
      setRefunding(false);
    }
  };

  return (
    <>
      {!!schedules.length ? (
        <Paper style={{ minWidth: '800', padding: 10 }}>
          <Grid container direction='column'>
            <Grid item>
              <TableContainer>
                <Table className={classes.table}>
                  <TableHead>
                    <TableRow>
                      <StyledTableCell align='center'>
                        Departure time
                      </StyledTableCell>
                      <StyledTableCell align='center'>
                        Arrival time
                      </StyledTableCell>
                      <StyledTableCell align='center'>
                        {transportType === 'buses'
                          ? 'Remaining tickets'
                          : 'Booked tickets'}
                      </StyledTableCell>
                      <StyledTableCell
                        align='center'
                        colSpan={3}></StyledTableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {schedules
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage,
                      )
                      .map((detail) => {
                        return (
                          <TableRow
                            hover
                            role='checkbox'
                            tabIndex={-1}
                            key={detail.id}>
                            <StyledTableCell align='center'>
                              {detail.departureAt}
                            </StyledTableCell>
                            <StyledTableCell align='center'>
                              {detail.arrivalAt}
                            </StyledTableCell>
                            <StyledTableCell align='center'>
                              {transportType === 'buses'
                                ? detail.remainingTickets
                                : detail.ticketCount}
                            </StyledTableCell>
                            {detail.isActive ? (
                              <StyledTableCell align='center'>
                                {detail.id === chosenScheduleId &&
                                (loading || refunding) ? (
                                  <CircularProgress />
                                ) : (
                                  <Button
                                    disabled={
                                      !detail.canBeManipulated || refunding
                                    }
                                    size='small'
                                    onClick={() =>
                                      onManipulateClick(detail.id, 'Deactivate')
                                    }>
                                    Deactivate
                                  </Button>
                                )}
                              </StyledTableCell>
                            ) : (
                              <StyledTableCell align='center'>
                                {detail.id === chosenScheduleId &&
                                (loading || refunding) ? (
                                  <CircularProgress />
                                ) : (
                                  <Button
                                    disabled={
                                      !detail.canBeManipulated || refunding
                                    }
                                    size='small'
                                    onClick={() =>
                                      onManipulateClick(detail.id, 'Activate')
                                    }>
                                    Activate
                                  </Button>
                                )}
                              </StyledTableCell>
                            )}

                            <StyledTableCell align='center'>
                              <Button
                                size='small'
                                color='primary'
                                onClick={() => onRefundClick(detail.id)}
                                disabled={
                                  detail.isActive ||
                                  detail.isCancellable ||
                                  (chosenScheduleId === detail.id && refunding)
                                }>
                                {chosenScheduleId === detail.id && refunding
                                  ? 'Refunding...'
                                  : 'Refund'}
                              </Button>
                            </StyledTableCell>
                            <StyledTableCell align='center'>
                              <Button
                                size='small'
                                color='secondary'
                                onClick={() => onCancelClick(detail.id)}
                                disabled={
                                  detail.isActive || !detail.isCancellable
                                }>
                                Cancel
                              </Button>
                            </StyledTableCell>
                          </TableRow>
                        );
                      })}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>

            <Grid item>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, 100]}
                component='div'
                count={schedules.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
              />
            </Grid>
          </Grid>
        </Paper>
      ) : (
        <BigNotification message='You have not added any schedule for this date yet!' />
      )}

      <Dialog open={dialog.open}>
        <DialogTitle>Warning</DialogTitle>
        <DialogContent>
          <Typography>
            {dialog.mode === 'cancel'
              ? 'Do you really want to cancel this schedule?'
              : 'Do you really want to refund all the tickets in this schedule?'}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button disabled={loading} onClick={() => setDialog({ open: false })}>
            Back
          </Button>
          {dialog.mode === 'cancel' ? (
            <Button
              disabled={loading}
              onClick={onConfirmCancelSchedule}
              color='secondary'
              variant='contained'>
              {loading ? 'Cancelling...' : 'Confirm'}
            </Button>
          ) : (
            <Button
              onClick={onConfirmRefund}
              color='secondary'
              variant='contained'>
              Confirm
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </>
  );
}

function mapStateToProps(state) {
  return {};
}

const mapDispatchToProps = {
  refundAllTickets: scheduleActions.refundAllTickets,
  cancelScheduleDetail: scheduleActions.cancelScheduleDetail,
  manipulateScheduleDetail: scheduleActions.manipulateScheduleDetail,
};

export default connect(mapStateToProps, mapDispatchToProps)(ScheduleTable);
