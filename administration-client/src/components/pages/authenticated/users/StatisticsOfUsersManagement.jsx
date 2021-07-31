import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import StatisticsOfUsers from './StatisticsOfUsers';
import { BASE_API_URL } from '../../../../constants';
import { toast } from 'react-toastify';

function StatisticsOfUsersManagement() {
  const [loading, setLoading] = useState(false);
  const [chosenYear, setChosenYear] = useState(new Date());
  const [users, setUsers] = useState([]);

  const handleChosenYear = (date) => {
    setChosenYear(date);
  };

  useEffect(() => {
    (async function fetchReports() {
      setLoading(true);
      try {
        const response = await axios.get(
          `${BASE_API_URL}/auth/users/report?year=${chosenYear.getFullYear()}`
        );
        setUsers([...response.data[0]]);
        setLoading(false);
      } catch (error) {
        toast.error(error.response);
      }
    })();
  }, [chosenYear]);

  return (
    <StatisticsOfUsers
      loading={loading}
      users={users}
      chosenYear={chosenYear}
      handleChosenYear={handleChosenYear}
    />
  );
}

function mapStateToProps(state) {
  return {};
}

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StatisticsOfUsersManagement);
