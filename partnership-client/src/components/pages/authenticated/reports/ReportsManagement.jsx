import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import { BASE_API_URL } from '../../../../constants';
import Reports from './Reports';

function ReportsManagement({ partnerId }) {
  const [loading, setLoading] = useState(false);
  const [chosenYear, setChosenYear] = useState(new Date());
  const [reports, setReports] = useState([]);

  useEffect(() => {
    const source = axios.CancelToken.source();
    let unmounted = false;
    setLoading(true);
    async function fetchReports() {
      setLoading(true);
      try {
        const response = await axios.get(`${BASE_API_URL}/booking/report`, {
          params: {
            partnerId,
            year: chosenYear.getFullYear(),
          },
        });
        if (!unmounted) {
          setReports([...response.data.numberOfTickets]);
          setLoading(false);
        }
      } catch (error) {
        if (!unmounted) {
          setLoading(false);
          if (error.response.status === 401) {
            toast.warning('Please login again to continue!');
          } else {
            toast.error(error.response.data.message);
          }
        }
      }
    }
    fetchReports();
    return () => {
      unmounted = true;
      source.cancel();
    };
  }, [chosenYear, partnerId]);

  const handleChosenYearChange = (date) => setChosenYear(date);
  return (
    <Reports
      loading={loading}
      reports={reports}
      chosenYear={chosenYear}
      handleChosenYearChange={handleChosenYearChange}
    />
  );
}

function mapStateToProps(state) {
  return {
    partnerId: state.partner.id,
  };
}

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ReportsManagement);
