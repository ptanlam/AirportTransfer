import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import React from 'react';
import { useForm } from 'react-hook-form';
import { connect } from 'react-redux';
import { useHistory } from 'react-router';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import { BASE_API_URL, VOUCHER_API_URL } from '../../../constants';
import paymentStatusActions from '../../../redux/actions/paymentStatusActions';
import CheckoutForm from './CheckoutForm';

const voucherSchema = yup.object().shape({
  voucherCode: yup.string().required('Vui lòng nhập mã voucher!'),
});

function CheckoutFormManagement({
  email,
  booking,
  vehicleType,
  handleLoading,
  isAuthenticated,
  handleSuccessPayment,
}) {
  const history = useHistory();
  const { register, errors } = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
    resolver: yupResolver(voucherSchema),
  });

  const addPoint = async (formData) => {
    if (!isAuthenticated) return;
    try {
      await axios.post(
        `${VOUCHER_API_URL}/UpdateUserPointByTaiKhoan`,
        formData,
        {
          withCredentials: false,
        },
      );
    } catch (error) {
      throw new Error('Đã xảy ra lỗi khi tích luỹ điểm thưởng!');
    }
  };

  const handlePayment = async (captureId) => {
    handleLoading();
    const point = parseInt((booking.totalPrice / 1000).toFixed(0));
    let addPointFD = new FormData();
    addPointFD.append('TaiKhoan', email);
    addPointFD.append('Diem', point);
    try {
      switch (vehicleType) {
        case 'cars':
          await addPoint(addPointFD);
          await axios.post(`${BASE_API_URL}/booking/checkouts`, {
            ...booking,
            captureId,
          });
          handleLoading();
          handleSuccessPayment();
          history.push('/');
          toast.success('Thanh toán thành công');
          break;
        case 'buses':
          await addPoint(addPointFD);
          await axios.post(`${BASE_API_URL}/booking/checkouts`, {
            ...booking,
            captureId,
          });
          handleLoading();
          handleSuccessPayment();
          history.push(`/`);
          toast.success('Thanh toán thành công');
          break;
        case 'trains':
          await addPoint(addPointFD);
          await axios.post(`${BASE_API_URL}/booking/checkouts`, {
            ...booking,
            captureId,
          });
          handleLoading();
          handleSuccessPayment();
          history.push('/');
          toast.success('Thanh toán thành công');
          break;
        case 'flights':
          await addPoint(addPointFD);
          await axios.post(`${BASE_API_URL}/booking/checkouts`, {
            ...booking,
            captureId,
          });
          handleLoading();
          handleSuccessPayment();
          history.push('/');
          toast.success('Thanh toán thành công');
          break;
        default:
          break;
      }
    } catch (error) {
      handleLoading();
      toast.error('Thanh toán thất bại');
    }
  };

  return (
    <CheckoutForm
      errors={errors}
      register={register}
      handlePayment={handlePayment}
      totalPrice={booking.totalPrice}
      isAuthenticated={isAuthenticated}
    />
  );
}

function mapStateToProps(state) {
  return {
    email: state.user.email,
    isAuthenticated: state.user.isAuthenticated,
    buses: state.schedules.buses,
    booking: state.booking,
  };
}

const mapDispatchToProps = {
  handleSuccessPayment: paymentStatusActions.handleSuccessPayment,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CheckoutFormManagement);
