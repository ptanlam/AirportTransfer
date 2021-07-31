import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useForm } from 'react-hook-form';
import { useHistory, useLocation } from 'react-router';
import queryString from 'query-string';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import ReservationForm from './ReservationForm';
import bookingActions from '../../../../redux/actions/bookingActions';
import axios from 'axios';
import { BASE_API_URL } from '../../../../constants';
import { toast } from 'react-toastify';
import paymentStatusActions from '../../../../redux/actions/paymentStatusActions';

const bookingSchema = yup.object().shape({
  contactFullName: yup
    .string()
    .matches(
      /^(?=.{2,40}$)[a-zA-Z]+(?:[-'\s][a-zA-Z]+)*$/,
      'Tên của bạn phải dài hơn 2 và ngắn hơn 40 ký tự!',
    )
    .required('Nội dung bắt buộc'),
  email: yup.string().email('Hãy nhập email thích hợp'),
  phoneNumber: yup
    .string()
    .matches(
      /^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/,
      'Số điện thoại của bạn phải dài hơn 10 và ít hơn 15 ký tự số!',
    ),
  fullName: yup
    .string()
    .matches(
      /^(?=.{2,40}$)[a-zA-Z]+(?:[-'\s][a-zA-Z]+)*$/,
      'Tên của bạn phải dài hơn 2 và ngắn hơn 40 ký tự!',
    ),
});

function ReservationFormManagement({ fillBookingForm, handleSuccessPayment }) {
  const history = useHistory();
  const { register, handleSubmit, errors, control } = useForm({
    resolver: yupResolver(bookingSchema),
  });
  const [loading, setLoading] = useState(false);
  const handleLoading = () => {
    setLoading(true);
  };
  const {
    schedule,
    scheduleId,
    id,
    classId,
    finalPrice,
    newTicketPrice,
    refundAmount,
  } = history.location.state.value;
  const vehicleType = history.location.pathname.split('/').pop();
  const { oldTicketId, ...getPolicy } = JSON.parse(
    localStorage.getItem('refundTicket'),
  );
  const {
    date,
    pickUpTime,
    numberOfPax,
    depPlaceId,
    depDescription,
    depDistrict,
    depCity,
    depCountry,
    desPlaceId,
    desDescription,
    desDistrict,
    desCity,
    desCountry,
    distance,
    seatType,
    sec,
  } = queryString.parse(history.location.search);
  const departure =
    `depPlaceId=${depPlaceId}&depDescription=${depDescription}&depDistrict=${depDistrict}` +
    `&depCity=${depCity}&depCountry=${depCountry}`;
  const destination =
    `desPlaceId=${desPlaceId}&desDescription=${desDescription}&desDistrict=${desDistrict}` +
    `&desCity=${desCity}&desCountry=${desCountry}`;

  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const onSubmit = async (data) => {
    const { contactFullName, phoneNumber, email, guests } = data;
    handleLoading();
    try {
      switch (vehicleType) {
        case 'cars':
          const response = await axios.post(
            `${BASE_API_URL}/cars/schedules`,
            history.location.state.value.schedule,
          );
          const carScheduleId = response.data.details[0].scheduleId;
          fillBookingForm({
            createTicketDto: {
              guests,
              contact: { contactFullName, phoneNumber, email },
              scheduleDetailId: [carScheduleId],
              totalPrice: newTicketPrice,
              vehicleType: vehicleType,
              classId: classId,
            },
            partnerId: getPolicy.partnerId,
            getPolicy,
            oldTicketId: oldTicketId,
          });
          if (parseInt(finalPrice) > 0) {
            history.push({
              pathname: '/exchange-ticket/checkout/cars',
              search:
                `?date=${date}&pickUpTime=${pickUpTime}&numberOfPax=${numberOfPax}&${departure}&${destination}` +
                `&distance=${distance}&sec=${sec}&seatType=${seatType}&numberOfPax=${numberOfPax}`,
              state: {
                carScheduleId: carScheduleId,
                schedule: schedule,
                finalPrice: finalPrice,
              },
            });
          } else {
            await axios.post(`${BASE_API_URL}/booking/exchange/refund`, {
              createTicketDto: {
                guests,
                contact: { contactFullName, phoneNumber, email },
                scheduleDetailId: [carScheduleId],
                totalPrice: newTicketPrice,
                vehicleType: vehicleType,
                classId: classId,
                partnerId: getPolicy.partnerId,
              },
              schedulesDTO: schedule,
              getPolicy,
              oldTicketId,
            });
            handleSuccessPayment();
            history.push('/');
            toast.success('Đổi vé thành công');
          }
          break;
        case 'buses':
          fillBookingForm({
            createTicketDto: {
              guests,
              contact: { contactFullName, phoneNumber, email },
              scheduleDetailId: [scheduleId],
              totalPrice: newTicketPrice,
              vehicleType: vehicleType,
              classId: classId,
            },
            partnerId: getPolicy.partnerId,
            getPolicy,
            oldTicketId: oldTicketId,
          });
          try {
            await axios.patch(
              `${BASE_API_URL}/buses/booking`,
              {},
              {
                params: {
                  scheduleDetailId: scheduleId,
                  numberOfTickets: guests.length,
                },
              },
            );
          } catch (error) {
            toast.error('Xin lỗi, đã hết vé !');
            history.push('/profile');
          }
          if (parseInt(finalPrice) > 0) {
            history.push({
              pathname: '/exchange-ticket/checkout/buses',
              search:
                `?date=${date}&pickUpTime=${pickUpTime}&numberOfPax=${numberOfPax}&${departure}&${destination}` +
                `&distance=${distance}&sec=${sec}&seatType=${seatType}&numberOfPax=${numberOfPax}`,
              state: {
                finalPrice,
                numberOfPax,
              },
            });
          } else {
            await axios.post(`${BASE_API_URL}/booking/exchange/refund`, {
              createTicketDto: {
                guests,
                contact: { contactFullName, phoneNumber, email },
                scheduleDetailId: [scheduleId],
                totalPrice: newTicketPrice,
                vehicleType: vehicleType,
                classId: classId,
                partnerId: getPolicy.partnerId,
              },
              getPolicy,
              oldTicketId: oldTicketId,
            });
            history.push('/');
            handleSuccessPayment();
            toast.success('Đổi vé thành công');
          }
          break;
        case 'trains':
          fillBookingForm({
            createTicketDto: {
              guests,
              contact: { contactFullName, phoneNumber, email },
              scheduleDetailId: [scheduleId],
              totalPrice: newTicketPrice,
              vehicleType: vehicleType,
              classId: classId,
            },
            partnerId: getPolicy.partnerId,
            getPolicy,
            oldTicketId: oldTicketId,
          });
          try {
            await axios.patch(
              `${BASE_API_URL}/trains/booking`,
              {},
              {
                params: {
                  scheduleDetailId: scheduleId,
                  numberOfTickets: guests.length,
                },
              },
            );
          } catch (error) {
            toast.error('Xin lỗi, đã hết vé !');
            history.push('/airport-transfer');
          }
          if (parseInt(finalPrice) > 0) {
            history.push({
              pathname: '/exchange-ticket/checkout/trains',
              search:
                `?date=${date}&pickUpTime=${pickUpTime}&numberOfPax=${numberOfPax}&${departure}&${destination}` +
                `&distance=${distance}&sec=${sec}&seatType=${seatType}&numberOfPax=${numberOfPax}`,
              state: {
                finalPrice,
                numberOfPax,
              },
            });
          } else {
            await axios.post(`${BASE_API_URL}/booking/exchange/refund`, {
              createTicketDto: {
                guests,
                contact: { contactFullName, phoneNumber, email },
                scheduleDetailId: [scheduleId],
                totalPrice: newTicketPrice,
                vehicleType: vehicleType,
                classId: classId,
              },
              partnerId: getPolicy.partnerId,
              getPolicy,
              oldTicketId: oldTicketId,
            });
            history.push('/');
            handleSuccessPayment();
            toast.success('Đổi vé thành công');
          }
          break;
        case 'flights':
          const flightResponse = await axios.patch(
            `${BASE_API_URL}/flights/booking`,
            {
              bookingDetails: {
                numberOfTickets: numberOfPax,
                seatType: seatType,
              },
              scheduleId,
            },
          );
          const ticketIds = flightResponse.data.tickets.map(
            (ticket) => ticket.id,
          );
          fillBookingForm({
            createTicketDto: {
              guests,
              contact: { contactFullName, phoneNumber, email },
              totalPrice: newTicketPrice,
              vehicleType: vehicleType,
              classId: seatType,
              scheduleId: scheduleId,
              bookingDetails: {
                numberOfTickets: numberOfPax,
                seatType: seatType,
              },
              scheduleDetailId: ticketIds,
            },
            partnerId: getPolicy.partnerId,
            getPolicy,
            oldTicketId: oldTicketId,
          });
          if (parseInt(finalPrice) > 0) {
            history.push({
              pathname: '/exchange-ticket/checkout/flights',
              search:
                `?date=${date}&pickUpTime=${pickUpTime}&numberOfPax=${numberOfPax}&${departure}&${destination}` +
                `&distance=${distance}&sec=${sec}&seatType=${seatType}&numberOfPax=${numberOfPax}`,
              state: {
                finalPrice: finalPrice,
                flightTicketIds: ticketIds,
              },
            });
          } else {
            await axios.post(`${BASE_API_URL}/booking/exchange/refund`, {
              createTicketDto: {
                guests,
                contact: { contactFullName, phoneNumber, email },
                totalPrice: newTicketPrice,
                vehicleType: vehicleType,
                classId: seatType,
                scheduleDetailId: ticketIds,
                partnerId: getPolicy.partnerId,
              },
              bookingDetails: {
                seatType: seatType,
                numberOfTickets: numberOfPax,
              },
              scheduleId: ticketIds,
              getPolicy,
              oldTicketId: oldTicketId,
            });
            history.push('/');
            handleSuccessPayment();
            toast.success('Đổi vé thành công');
          }
          break;
        default:
          break;
      }
    } catch (error) {
      if (error.response.status === 401) {
        toast.warning('Vui lòng đăng nhập để tiếp tục!');
      } else {
        toast.error(error.response.data.message);
      }
    }
  };

  return (
    <>
      {(() => {
        switch (vehicleType) {
          case 'cars':
            return (
              <ReservationForm
                vehicleType={vehicleType}
                id={id}
                date={date}
                pickUpTime={pickUpTime}
                loading={loading}
                errors={errors}
                control={control}
                register={register}
                onSubmit={handleSubmit(onSubmit)}
                numberOfPassengers={numberOfPax}
                newTicketPrice={newTicketPrice}
                refundAmount={refundAmount}
                finalPrice={finalPrice}
              />
            );
          case 'buses':
            return (
              <ReservationForm
                vehicleType={vehicleType}
                id={id}
                date={date}
                pickUpTime={pickUpTime}
                loading={loading}
                errors={errors}
                control={control}
                register={register}
                onSubmit={handleSubmit(onSubmit)}
                numberOfPassengers={numberOfPax}
                newTicketPrice={newTicketPrice}
                refundAmount={refundAmount}
                finalPrice={finalPrice}
              />
            );
          case 'trains':
            return (
              <ReservationForm
                vehicleType={vehicleType}
                id={id}
                date={date}
                pickUpTime={pickUpTime}
                loading={loading}
                errors={errors}
                control={control}
                register={register}
                onSubmit={handleSubmit(onSubmit)}
                numberOfPassengers={numberOfPax}
                newTicketPrice={newTicketPrice}
                refundAmount={refundAmount}
                finalPrice={finalPrice}
              />
            );
          case 'flights':
            return (
              <ReservationForm
                vehicleType={vehicleType}
                date={date}
                pickUpTime={pickUpTime}
                loading={loading}
                errors={errors}
                control={control}
                register={register}
                onSubmit={handleSubmit(onSubmit)}
                numberOfPassengers={numberOfPax}
                newTicketPrice={newTicketPrice}
                refundAmount={refundAmount}
                finalPrice={finalPrice}
              />
            );
          default:
            break;
        }
      })()}
    </>
  );
}

function mapStateToProps(state) {
  return {};
}

const mapDispatchToProps = {
  fillBookingForm: bookingActions.fillBookingForm,
  handleSuccessPayment: paymentStatusActions.handleSuccessPayment,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ReservationFormManagement);
