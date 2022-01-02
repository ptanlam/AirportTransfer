import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import Reports from './Reports';
import { BASE_API_URL } from '../../../../constants';

function ReportsManagement() {
  const [loading, setLoading] = useState(false);
  const [chosenMonth, setChosenMonth] = useState(new Date());
  const [chosenYear, setChosenYear] = useState(new Date());
  const handleChosenMonth = (date) => {
    setChosenMonth(date);
  };
  const handleChosenYear = (date) => {
    setChosenYear(date);
  };

  const [reports, setReports] = useState([]);
  const headers = [
    { id: '1', label: 'No.' },
    { id: '2', label: 'Ticket Id' },
    { id: '3', label: 'Vehicle Type' },
    { id: '5', label: 'Customer Name' },
    { id: '6  ', label: 'Journey' },
    { id: '7', label: 'Schedule' },
    { id: '8', label: 'Ticket Price' },
    { id: '9', label: 'Profit' },
  ];
  useEffect(() => {
    (async function () {
      setLoading(true);
      try {
        const response = await axios.get(
          `${BASE_API_URL}/booking/admin/report?month=${
            chosenMonth.getMonth() + 1
          }&year=${chosenYear.getFullYear()}`
        );
        setReports([...response.data]);
        setLoading(false);
      } catch (error) {
        toast.error(error.message);
      }
    })();
  }, [chosenMonth, chosenYear]);

  return (
    <Reports
      loading={loading}
      reports={reports}
      headers={headers}
      chosenMonth={chosenMonth}
      chosenYear={chosenYear}
      handleChosenMonth={handleChosenMonth}
      handleChosenYear={handleChosenYear}
    />
  );
}

function mapStateToProps(state) {
  return {};
}

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ReportsManagement);
