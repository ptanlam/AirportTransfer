import React, { useState } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { BASE_API_URL } from '../../../../constants';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import Account from './Account';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import userActions from '../../../../redux/actions/userActions';

const accountSchema = yup.object().shape({
  firstName: yup
    .string()
    .matches(
      /^(?=.{2,40}$)[a-zA-Z]+(?:[-'\s][a-zA-Z]+)*$/,
      'Họ của bạn phải dài hơn 2 và hạ thấp hơn 40 ký tự!'
    )
    .required('Nội dung bắt buộc'),
  lastName: yup
    .string()
    .matches(
      /^(?=.{2,40}$)[a-zA-Z]+(?:[-'\s][a-zA-Z]+)*$/,
      'Tên của bạn phải dài hơn 2 và hạ thấp hơn 40 ký tự!'
    )
    .required('Nội dung bắt buộc'),
  phoneNumber: yup
    .string()
    .matches(
      /^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/,
      'Số điện thoại của bạn phải dài hơn 10 và ít hơn 15 ký tự số!'
    )
    .required('Nội dung bắt buộc')
    .test(
      'checkPhoneNumberExists',
      'Số điện thoại đã được đăng ký!',
      async (phoneNumber) => {
        if (phoneNumber === '') return false;
        try {
          const response = await axios.get(
            `${BASE_API_URL}/auth/phoneNumbers/${phoneNumber}`
          );
          return !response.data.doesExist;
        } catch (error) {
          toast.error(error.response.data.message);
        }
      }
    ),
});

function AccountManagement({ user, updateProfile }) {
  const { firstName, lastName, phoneNumber, email } = user;
  const [loading, setLoading] = useState(false);
  const [account, setAccount] = useState({
    firstName: firstName,
    lastName: lastName,
    phoneNumber: phoneNumber,
    email: email,
  });

  const [openOrderForm, setOpenOrderForm] = useState(false);
  const handleOpenOrderForm = () => {
    setOpenOrderForm(!openOrderForm);
  };
  const handleCloseOrderForm = () => {
    setOpenOrderForm(false);
  };
  const { register, handleSubmit, errors } = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
    resolver: yupResolver(accountSchema),
  });

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await updateProfile(data, user.id);
      setAccount({
        firstName: data.firstName,
        lastName: data.lastName,
        phoneNumber: data.phoneNumber,
        email: email,
      });
      handleCloseOrderForm();
      setLoading(false);
      toast.success('Cập nhật thành công');
    } catch (error) {
      console.log(error.message);
      toast.success('Cập nhật thất bại');
    }
  };

  return (
    <Account
      loading={loading}
      account={account}
      register={register}
      onSubmit={handleSubmit(onSubmit)}
      errors={errors}
      openOrderForm={openOrderForm}
      handleOpenOrderForm={handleOpenOrderForm}
      handleCloseOrderForm={handleCloseOrderForm}
    />
  );
}

function mapStateToProps(state) {
  return {
    user: state.user,
  };
}

const mapDispatchToProps = {
  updateProfile: userActions.updateProfile,
};

export default connect(mapStateToProps, mapDispatchToProps)(AccountManagement);
