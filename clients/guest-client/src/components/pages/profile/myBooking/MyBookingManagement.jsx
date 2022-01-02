import { Button, Grid, Typography } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Pagination from '@material-ui/lab/Pagination';
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router';
import { toast } from 'react-toastify';
import { BASE_API_URL } from '../../../../constants';
import MyBooking from './MyBooking';

function MyBookingManagement({ email }) {
  const history = useHistory();
  const [loading, setLoading] = useState(false);

  const [tickets, setTickets] = useState([]);
  const [totalNumberOfTickets, setTotalNumberTickets] = useState(0);
  const [pagination, setPagination] = useState({
    limit: 4,
    offset: 0,
  });
  const handlePaginationChangeTimeoutRef = useRef(null);

  const [loadingButtonCancel, setLoadingButtonCancel] = useState(false);

  const [loadingPolicyToCancel, setLoadingPolicyToCancel] = useState(false);
  const [loadingPolicyToChange, setLoadingPolicyToChange] = useState(false);

  const [getScheduleDetailId, setGetScheduleDetailId] = useState('');
  const [refundTicket, setRefundTicket] = useState({});
  const [hasPolicy, setHasPolicy] = useState({ hasPolicy: false, title: '' });
  const [openOrderForm, setOpenOrderForm] = useState(false);
  const {
    vehicleType,
    lostPercentage,
    partnerId,
    oldTicketId,
    detailId,
    oldTicketPrice,
    scheduleId,
    ...getPolicy
  } = refundTicket;

  const handleOpenOrderForm = () => {
    setOpenOrderForm(true);
  };

  const handleCloseOrderForm = () => {
    setOpenOrderForm(false);
    setLoadingPolicyToChange(false);
    setLoadingPolicyToCancel(false);
  };

  const handleGetScheduleDetailId = (scheduleDetailId) => {
    setGetScheduleDetailId(scheduleDetailId);
  };

  useEffect(() => {
    const source = axios.CancelToken.source();
    let unmounted = false;
    async function fetchUserTickets() {
      const { limit, offset } = pagination;
      try {
        if (unmounted) return;
        setLoading(true);
        const response = await axios.get(
          `${BASE_API_URL}/booking/tickets/guest`,
          {
            params: {
              email,
              limit,
              offset,
            },
            cancelToken: source.token,
          },
        );
        const { ticketsFullInformation, total } = response.data;
        setTotalNumberTickets(Math.ceil(total / limit));
        setTickets([...ticketsFullInformation]);
      } catch (error) {
        if (unmounted) return;
        if (error.response.status === 401) {
          toast.warning('Vui lòng đăng nhập lại để tiếp tục!');
        } else {
          toast.error(error.response.data.message);
        }
      } finally {
        if (unmounted) return;
        setLoading(false);
      }
    }
    fetchUserTickets();
    return () => {
      unmounted = true;
      source.cancel();
    };
  }, [email, pagination]);

  const handleCancelTicket = async (data) => {
    const { vehicleType } = data;
    setLoadingButtonCancel(true);
    try {
      await axios.patch(`${BASE_API_URL}/booking/refund/guest`, {
        oldTicketId,
        getPolicy: getPolicy,
      });
      switch (vehicleType) {
        case 'cars':
          await axios.patch(
            `${BASE_API_URL}/cars/schedules/${getScheduleDetailId}/cancel`,
          );
          const indexCarScheduleDetailId = tickets.findIndex(
            (ticket) => ticket.ticket.scheduleDetailId === getScheduleDetailId,
          );
          setTickets([
            ...tickets.slice(0, indexCarScheduleDetailId),
            ...tickets.slice(indexCarScheduleDetailId + 1),
          ]);
          setLoadingButtonCancel(false);
          break;
        case 'buses':
          await axios.patch(
            `${BASE_API_URL}/buses/schedules/details/${getScheduleDetailId}/revoke`,
            {},
            {
              params: {
                numberOfTickets: 1,
              },
            },
          );
          const indexBusScheduleDetailId = tickets.findIndex(
            (ticket) => ticket.ticket.scheduleDetailId === getScheduleDetailId,
          );
          setTickets([
            ...tickets.slice(0, indexBusScheduleDetailId),
            ...tickets.slice(indexBusScheduleDetailId + 1),
          ]);
          setLoadingButtonCancel(false);
          break;
        case 'trains':
          await axios.patch(
            `${BASE_API_URL}/trains/schedules/details/${getScheduleDetailId}/revoke`,
            {},
            {
              params: {
                numberOfTickets: 1,
              },
            },
          );
          const indexTrainScheduleDetailId = tickets.findIndex(
            (ticket) => ticket.ticket.scheduleDetailId === getScheduleDetailId,
          );
          setTickets([
            ...tickets.slice(0, indexTrainScheduleDetailId),
            ...tickets.slice(indexTrainScheduleDetailId + 1),
          ]);
          setLoadingButtonCancel(false);
          break;
        case 'flights':
          await axios.patch(
            `${BASE_API_URL}/flights/tickets/${getScheduleDetailId}/revoke`,
          );
          const indexFlightScheduleDetailId = tickets.findIndex(
            (ticket) => ticket.ticket.scheduleDetailId === getScheduleDetailId,
          );
          setTickets([
            ...tickets.slice(0, indexFlightScheduleDetailId),
            ...tickets.slice(indexFlightScheduleDetailId + 1),
          ]);
          setLoadingButtonCancel(false);
          break;
        default:
          break;
      }
      toast.success('Hủy vé thành công');
      handleCloseOrderForm();
    } catch (error) {
      if (error.response.status === 401) {
        toast.warning('Vui lòng đăng nhập lại để tiếp tục!');
      } else {
        toast.error('Hủy vé thất bại');
      }
    }
  };

  const handleChangeTicket = () => {
    localStorage.setItem('refundTicket', JSON.stringify(refundTicket));
    if (vehicleType === 'flights') {
      history.push({
        pathname: '/exchange-ticket/flights',
        state: {
          partnerId,
          vehicleType,
        },
      });
      return;
    }
    history.push({
      pathname: '/exchange-ticket',
      state: {
        partnerId,
        vehicleType,
      },
    });
  };

  const handleCheckPolicyToCancelTicket = async (data) => {
    const { vehicleType, partnerId, ...refund } = data;
    setHasPolicy({ hasPolicy: false, title: 'cancel' });
    try {
      setLoadingPolicyToCancel(true);
      const response = await axios.post(
        `${BASE_API_URL}/booking/checkPolicy`,
        refund,
      );
      setRefundTicket({
        ...data,
        lostPercentage: response.data.lostPercentage,
      });
      handleOpenOrderForm();
    } catch (error) {
      if (error.response.status === 400) {
        setHasPolicy({ hasPolicy: true, title: 'cancel' });
        handleOpenOrderForm();
      }
    } finally {
      setLoadingPolicyToCancel(false);
    }
  };

  const handleChangePage = (chosenPage) => {
    if (handlePaginationChangeTimeoutRef.current) {
      clearTimeout(handlePaginationChangeTimeoutRef.current);
    }

    handlePaginationChangeTimeoutRef.current = setTimeout(() => {
      setPagination({ ...pagination, offset: chosenPage - 1 });
    }, 500);
  };

  const handleCheckPolicyToChangeTicket = async (data) => {
    setHasPolicy({ hasPolicy: false, title: 'exchange' });
    try {
      setLoadingPolicyToChange(true);
      const response = await axios.post(
        `${BASE_API_URL}/booking/checkPolicy`,
        data,
      );
      setRefundTicket({
        ...data,
        lostPercentage: response.data.lostPercentage,
      });
      handleOpenOrderForm();
    } catch (error) {
      if (error.response.status === 400) {
        setHasPolicy({ hasPolicy: true, title: 'exchange' });
        handleOpenOrderForm();
      }
    } finally {
      setLoadingPolicyToChange(false);
    }
  };

  return (
    <Grid container direction='column' style={{ gap: 20 }}>
      <Grid item>
        <Typography variant='h4'>Những vé đã đặt</Typography>
      </Grid>
      <Grid container item justify='flex-end'>
        <Pagination
          count={totalNumberOfTickets}
          showFirstButton
          showLastButton
          onChange={(e, value) => handleChangePage(value)}
        />
      </Grid>
      <Grid item>
        <MyBooking
          tickets={tickets}
          loadingTickets={loading}
          loadingPolicyToCancel={loadingPolicyToCancel}
          loadingPolicyToChange={loadingPolicyToChange}
          handleGetScheduleDetailId={handleGetScheduleDetailId}
          handleCheckPolicyToCancelTicket={handleCheckPolicyToCancelTicket}
          handleCheckPolicyToChangeTicket={handleCheckPolicyToChangeTicket}
        />
      </Grid>

      {hasPolicy.hasPolicy === true ? (
        <Dialog open={openOrderForm} onClose={handleCloseOrderForm}>
          <DialogContent>
            <Typography variant='h6'>
              Không có chính sách cho vé này. Bạn không thể thực hiện thao tác
              trên vé
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button
              variant='contained'
              onClick={() => {
                setHasPolicy({ hasPolicy: false, title: '' });
                handleCloseOrderForm();
              }}>
              Đóng
            </Button>
          </DialogActions>
        </Dialog>
      ) : hasPolicy.title === 'cancel' ? (
        <Dialog open={openOrderForm} onClose={handleCloseOrderForm}>
          <DialogContent style={{ background: '#e6eaed' }}>
            <Typography variant='h6'>
              Chính sách của vé này là {lostPercentage}%. Nếu tiếp tục bạn sẽ
              mất {lostPercentage}% giá trị của vé
            </Typography>
            <Typography>Bạn có muốn hủy vé này không ?</Typography>
          </DialogContent>
          <DialogActions>
            <Button
              variant='contained'
              color='secondary'
              onClick={() => {
                handleCancelTicket({ oldTicketId, getPolicy, vehicleType });
              }}
              disabled={loadingButtonCancel ? true : false}>
              {loadingButtonCancel ? 'Đang thực hiện' : 'Đồng ý'}
            </Button>
            <Button
              variant='contained'
              onClick={() => {
                setHasPolicy({ hasPolicy: false, title: '' });
                handleCloseOrderForm();
              }}
              disabled={loadingButtonCancel ? true : false}>
              Không
            </Button>
          </DialogActions>
        </Dialog>
      ) : (
        <Dialog open={openOrderForm} onClose={handleCloseOrderForm}>
          <DialogContent style={{ background: '#e6eaed' }}>
            <Typography variant='h6'>
              Chính sách của vé này là {lostPercentage}%. Nếu tiếp tục bạn sẽ
              mất {lostPercentage}% giá trị của vé
            </Typography>
            <Typography>Bạn có muốn đổi vé này không ?</Typography>
          </DialogContent>
          <DialogActions>
            <Button
              variant='contained'
              color='secondary'
              onClick={() => {
                handleChangeTicket();
              }}
              disabled={loading ? true : false}>
              {loading ? 'Đang thực hiện' : 'Đồng ý'}
            </Button>
            <Button
              variant='contained'
              onClick={() => {
                setHasPolicy({ hasPolicy: false, title: '' });
                handleCloseOrderForm();
              }}>
              Không
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </Grid>
  );
}

function mapStateToProps(state) {
  return {
    email: state.user.email,
  };
}

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MyBookingManagement);
