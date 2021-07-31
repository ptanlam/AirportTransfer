import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import queryString from 'query-string';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import { BASE_API_URL, VOUCHER_API_URL } from '../../../constants';
import bookingActions from '../../../redux/actions/bookingActions';
import BookingForm from './BookingForm';

const bookingSchema = yup.object().shape({
  contactFullName: yup
    .string()
    .matches(
      /^(?=.{2,40}$)[a-zA-Z]+(?:[-'\s][a-zA-Z]+)*$/,
      'Tên của bạn phải dài hơn 2 và ngắn hơn 40 ký tự!',
    ),
  fullName: yup
    .string()
    .matches(
      /^(?=.{2,40}$)[a-zA-Z]+(?:[-'\s][a-zA-Z]+)*$/,
      'Tên của bạn phải dài hơn 2 và ngắn hơn 40 ký tự!',
    ),
  email: yup.string().email('Hãy nhập email thích hợp'),
  phoneNumber: yup
    .string()
    .matches(
      /^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/,
      'Số điện thoại của bạn phải dài hơn 10 và ít hơn 15 ký tự số!',
    ),
  voucherCode: yup.string(),
});

function BookingFormManagement({ email, buses, trains, fillBookingForm }) {
  const history = useHistory();
  const { register, handleSubmit, errors, control } = useForm({
    resolver: yupResolver(bookingSchema),
  });
  const [loading, setLoading] = useState(false);
  const {
    schedule,
    scheduleId,
    id,
    departureAt,
    totalPrice,
    classId,
    partnerId,
  } = history.location.state.value;

  const vehicleType = history.location.pathname.split('/').pop();
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

  const checkVoucherValid = async (voucherCode) => {
    try {
      const formData = new FormData();
      formData.append('TaiKhoan', email);
      formData.append('Code', voucherCode);
      await axios.post(`${VOUCHER_API_URL}/UserUseVoucher`, formData, {
        withCredentials: false,
      });
      const response = await axios.get(`${VOUCHER_API_URL}/GetVoucherByCode`, {
        params: { Code: voucherCode },
        withCredentials: false,
      });
      const { Discount } = response.data.recordset[0];
      return parseInt(Discount) / 100;
    } catch (error) {
      throw new Error('Voucher này không khả dụng!');
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (data) => {
    const { contactFullName, phoneNumber, email, guests, voucherCode } = data;
    let actualPrice = totalPrice;
    try {
      if (voucherCode) {
        const discountPercentage = await checkVoucherValid(
          voucherCode,
          totalPrice,
        );
        actualPrice = actualPrice * (1 - discountPercentage);
      }
      setLoading(true);
      switch (vehicleType) {
        case 'cars':
          const response = await axios.post(
            `${BASE_API_URL}/cars/schedules`,
            schedule,
          );
          const carScheduleId = response.data.details[0].scheduleId;
          fillBookingForm({
            guests,
            contact: { contactFullName, phoneNumber, email },
            totalPrice: actualPrice,
            vehicleType: vehicleType,
            classId: classId,
            scheduleDetailId: [carScheduleId],
            partnerId: partnerId,
          });
          history.push({
            pathname: '/checkout/cars',
            search:
              `?date=${date}&pickUpTime=${pickUpTime}&numberOfPax=${numberOfPax}&${departure}&${destination}` +
              `&distance=${distance}&sec=${sec}&seatType=${seatType}&numberOfPax=${numberOfPax}`,
            state: {
              value: {
                schedule,
                totalPrice,
                carScheduleId,
              },
            },
          });
          setLoading(false);
          break;
        case 'buses':
          fillBookingForm({
            guests,
            classId,
            partnerId,
            vehicleType,
            totalPrice: actualPrice,
            scheduleDetailId: [scheduleId],
            contact: { contactFullName, phoneNumber, email },
          });
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
          history.push({
            pathname: '/checkout/buses',
            search:
              `?date=${date}&pickUpTime=${pickUpTime}&numberOfPax=${numberOfPax}&${departure}&${destination}` +
              `&distance=${distance}&sec=${sec}&seatType=${seatType}&numberOfPax=${numberOfPax}`,
            state: {
              value: { scheduleId, numberOfPax },
            },
          });
          setLoading(false);
          break;
        case 'trains':
          fillBookingForm({
            guests,
            classId,
            partnerId,
            vehicleType,
            totalPrice: actualPrice,
            scheduleDetailId: [scheduleId],
            contact: { contactFullName, phoneNumber, email },
          });
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
          history.push({
            pathname: '/checkout/trains',
            search:
              `?date=${date}&pickUpTime=${pickUpTime}&numberOfPax=${numberOfPax}&${departure}&${destination}` +
              `&distance=${distance}&sec=${sec}&seatType=${seatType}&numberOfPax=${numberOfPax}`,
            state: {
              value: {
                scheduleId: scheduleId,
                numberOfPax: numberOfPax,
              },
            },
          });
          setLoading(false);
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
            guests,
            contact: { contactFullName, phoneNumber, email },
            totalPrice,
            classId: seatType,
            scheduleDetailId: ticketIds,
            vehicleType: vehicleType,
            partnerId: partnerId,
          });
          history.push({
            pathname: '/checkout/flights',
            search:
              `?date=${date}&pickUpTime=${pickUpTime}&numberOfPax=${numberOfPax}&${departure}&${destination}` +
              `&distance=${distance}&sec=${sec}&seatType=${seatType}&numberOfPax=${numberOfPax}`,
            state: {
              value: {
                flightTicketIds: ticketIds,
                numberOfPax: numberOfPax,
              },
            },
          });
          setLoading(false);
          break;
        default:
          break;
      }
    } catch (error) {
      if (error?.response?.status === 400) {
        history.push('/');
        toast.error('Xin lỗi, đã hết vé !');
      } else {
        toast.error(error.message);
      }
    }
  };

  return (
    <>
      {(() => {
        switch (vehicleType) {
          case 'cars':
            return (
              <BookingForm
                vehicleType={vehicleType}
                id={id}
                date={date}
                pickUpTime={pickUpTime}
                errors={errors}
                control={control}
                register={register}
                onSubmit={handleSubmit(onSubmit)}
                numberOfPassengers={numberOfPax}
                totalPrice={totalPrice}
                loading={loading}
              />
            );
          case 'buses':
            return (
              <BookingForm
                vehicleType={vehicleType}
                id={id}
                date={date}
                pickUpTime={pickUpTime}
                errors={errors}
                control={control}
                register={register}
                onSubmit={handleSubmit(onSubmit)}
                numberOfPassengers={numberOfPax}
                firstStation={buses[0].stations[0]?.description}
                lastStation={buses[0].stations.slice(-1)[0]?.description}
                totalPrice={totalPrice}
                option={buses[0].options?.find(
                  (item) => item.departureAt === departureAt,
                )}
                loading={loading}
              />
            );
          case 'trains':
            return (
              <BookingForm
                vehicleType={vehicleType}
                id={id}
                date={date}
                pickUpTime={pickUpTime}
                errors={errors}
                control={control}
                register={register}
                onSubmit={handleSubmit(onSubmit)}
                numberOfPassengers={numberOfPax}
                firstStation={trains[0].stations[0]?.description}
                lastStation={trains[0].stations.slice(-1)[0]?.description}
                totalPrice={totalPrice}
                option={trains[0].options?.find(
                  (item) => item.departureAt === departureAt,
                )}
                loading={loading}
              />
            );
          case 'flights':
            return (
              <BookingForm
                vehicleType={vehicleType}
                date={date}
                pickUpTime={pickUpTime}
                errors={errors}
                control={control}
                register={register}
                onSubmit={handleSubmit(onSubmit)}
                numberOfPassengers={numberOfPax}
                totalPrice={totalPrice}
                loading={loading}
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
  return {
    email: state.user.email,
    buses: state.schedules.buses,
    trains: state.schedules.trains,
  };
}

const mapDispatchToProps = {
  fillBookingForm: bookingActions.fillBookingForm,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(BookingFormManagement);
