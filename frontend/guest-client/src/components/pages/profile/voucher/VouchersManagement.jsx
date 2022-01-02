import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import { VOUCHER_API_URL } from '../../../../constants';
import VouchersList from './VouchersList';

function VouchersManagement({ email }) {
  const [loading, setLoading] = useState(false);
  const [vouchers, setVouchers] = useState([]);

  useEffect(() => {
    const source = axios.CancelToken.source();
    let unmounted = false;
    async function fetchUserVouchers() {
      try {
        if (unmounted) return;
        setLoading(true);
        const response = await axios.get(
          `${VOUCHER_API_URL}/GetVouchersByTaiKhoan`,
          {
            params: { TaiKhoan: email },
            cancelToken: source.token,
            withCredentials: false,
          },
        );
        setVouchers([...response.data.recordset]);
      } catch (error) {
        if (unmounted) return;
        toast.error('Đã xảy ra lỗi, vui lòng thủ lại sau!');
      } finally {
        if (unmounted) return;
        setLoading(false);
      }
    }

    fetchUserVouchers();

    return () => {
      unmounted = true;
      source.cancel();
    };
  }, [email]);

  const onBuyVoucherClick = () => {
    window.open('http://52.36.113.238:3000/');
  };

  return (
    <VouchersList
      loading={loading}
      vouchers={vouchers}
      onBuyVoucherClick={onBuyVoucherClick}
    />
  );
}

function mapStateToProps(state) {
  return {
    email: state.user.email,
  };
}

export default connect(mapStateToProps)(VouchersManagement);
