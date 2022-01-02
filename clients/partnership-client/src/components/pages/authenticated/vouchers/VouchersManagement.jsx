import React, { useEffect } from 'react';
import { useState } from 'react';
import { connect } from 'react-redux';
import VoucherRegistrationForm from './VoucherRegistrationForm';
import Vouchers from './Vouchers';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { VOUCHER_API_URL } from '../../../../constants';
import axios from 'axios';
import { toast } from 'react-toastify';

const voucherRegistrationSchema = yup.object().shape({
  Name: yup.string().required('Voucher name is required!'),
  PointCost: yup
    .number()
    .typeError('Point cost must be a number')
    .required('Point cost is required!'),
  MoneyDiscount: yup
    .number()
    .typeError('Money discount must be a number')
    .required('Money discount is required!'),
  Discount: yup
    .number()
    .min(0, 'Minimum discount percentage is 0')
    .max(100, 'Maximum discount percentage is 100')
    .typeError('Discount must be a number')
    .required('Discount is required!'),
  Quantity: yup
    .number()
    .typeError('Quantity must be a number')
    .required('Quantity is required!'),
  ContentHeader: yup.string().required('Title is required!'),
  PreContent: yup.string().required('Pre content is required!'),
  Contents: yup.string().required('Content is required!'),
  VoucherNote: yup.string().required('Voucher note is required!'),
  CreateDate: yup.string().required('Start date is required!'),
  ExpDate: yup.string().required('Expire date is required!'),
});

function VouchersManagement({ partnerId }) {
  const [loading, setLoading] = useState(false);
  const [adding, setAdding] = useState(false);
  const [photoFile, setPhotoFile] = useState();
  const [vouchers, setVouchers] = useState([]);
  const [registrationDialogOpen, setRegistrationDialogOpen] = useState(false);
  const { register, handleSubmit, errors } = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
    resolver: yupResolver(voucherRegistrationSchema),
  });

  useEffect(() => {
    const source = axios.CancelToken.source();
    let unmounted = false;
    setLoading(true);
    async function fetchVouchers() {
      try {
        const response = await axios.get(
          `${VOUCHER_API_URL}/GetVouchersByPartnerID`,
          {
            params: { PartnerID: partnerId },
            cancelToken: source.token,
            withCredentials: false,
          },
        );
        if (!unmounted) {
          setVouchers([...response.data.recordset]);
        }
      } catch (error) {
        if (!unmounted) {
          console.error(error.message);
        }
      } finally {
        if (!unmounted) {
          setLoading(false);
        }
      }
    }
    fetchVouchers();
    return () => {
      unmounted = true;
      source.cancel();
    };
  }, [partnerId]);

  const toggleRegistrationDialog = () =>
    setRegistrationDialogOpen(!registrationDialogOpen);

  const onPhotoChange = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setPhotoFile(undefined);
      return;
    }
    setPhotoFile(e.target.files[0]);
  };

  const onSubmit = async (data) => {
    const { photo, ...rest } = data;
    const voucher = { ...rest, PartnerID: partnerId };
    let formData = new FormData();
    Object.entries(voucher).forEach((pair) => {
      formData.append(pair[0], pair[1]);
    });
    formData.append('ImageLink', photo[0]);
    setAdding(true);
    try {
      await axios.post(
        `${VOUCHER_API_URL}/createVoucherDuaDonSanBay`,
        formData,
        { withCredentials: false },
      );
      const response = await axios.get(
        `${VOUCHER_API_URL}/GetVouchersByPartnerID`,
        {
          params: { PartnerID: partnerId },
          withCredentials: false,
        },
      );
      setVouchers([...response.data.recordset]);
      setRegistrationDialogOpen(false);
      toast.success('Add voucher successfully!');
    } catch (error) {
      toast.error('Something happens, can not add voucher.');
    } finally {
      setAdding(false);
    }
  };

  const toggleVoucher = async (voucherId, status) => {
    const formData = new FormData();
    formData.append('_id', voucherId);
    try {
      await axios.post(`${VOUCHER_API_URL}/ChangeVoucherStatusByID`, formData, {
        withCredentials: false,
      });
      const voucherIndex = vouchers.findIndex(
        (voucher) => voucher._id === voucherId,
      );
      const updatedVoucher = { ...vouchers[voucherIndex], Status: !status };
      setVouchers([
        ...vouchers.slice(0, voucherIndex),
        ...vouchers.slice(voucherIndex + 1),
        { ...updatedVoucher },
      ]);
      toast.success(`${status ? 'Disable' : 'Enable'} voucher successfully!`);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <Vouchers
        loading={loading}
        vouchers={vouchers}
        toggleVoucher={toggleVoucher}
        openRegistrationDialog={toggleRegistrationDialog}
      />
      <VoucherRegistrationForm
        errors={errors}
        loading={adding}
        register={register}
        photoFile={photoFile}
        onPhotoChange={onPhotoChange}
        onSubmit={handleSubmit(onSubmit)}
        dialogOpen={registrationDialogOpen}
        onClose={toggleRegistrationDialog}
      />
    </>
  );
}

function mapStateToProps(state) {
  return {
    partnerId: state.partner.id,
  };
}

export default connect(mapStateToProps)(VouchersManagement);
